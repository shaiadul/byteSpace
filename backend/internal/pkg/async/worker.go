package async

import (
	"context"
	"log"
	"sync"
	"time"
)

type Job func(ctx context.Context) error

type WorkerPool struct {
	workersCount int
	jobQueue     chan Job
	wg           sync.WaitGroup
	mu           sync.Mutex
	isClosed     bool
	stopChan     chan struct{}
}

func NewWorkerPool(workersCount, queueSize int) *WorkerPool {
	pool := &WorkerPool{
		workersCount: workersCount,
		jobQueue:     make(chan Job, queueSize),
		stopChan:     make(chan struct{}),
	}
	pool.start()
	return pool
}

func (p *WorkerPool) start() {
	for i := 1; i <= p.workersCount; i++ {
		p.wg.Add(1)
		go func(workerID int) {
			defer p.wg.Done()
			for {
				select {
				case <-p.stopChan:
					for job := range p.jobQueue {
						ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
						if err := job(ctx); err != nil {
							log.Printf("[Worker-%d] Error executing job: %v", workerID, err)
						}
						cancel()
					}
					return
				case job, ok := <-p.jobQueue:
					if !ok {
						return
					}
					ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
					if err := job(ctx); err != nil {
						log.Printf("[Worker-%d] Error executing job: %v", workerID, err)
					}
					cancel()
				}
			}
		}(i)
	}
}

func (p *WorkerPool) Submit(job Job) bool {
	p.mu.Lock()
	defer p.mu.Unlock()

	if p.isClosed {
		return false
	}

	select {
	case p.jobQueue <- job:
		return true
	default:
		p.wg.Add(1)
		go func() {
			defer p.wg.Done()
			ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
			defer cancel()
			_ = job(ctx)
		}()
		return true
	}
}

func (p *WorkerPool) Shutdown() {
	p.mu.Lock()
	if p.isClosed {
		p.mu.Unlock()
		return
	}
	p.isClosed = true
	close(p.jobQueue)
	close(p.stopChan)
	p.mu.Unlock()

	p.wg.Wait()
}
