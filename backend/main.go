package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	deliveryHTTP "bytespace-backend/internal/delivery/http"
	"bytespace-backend/internal/pkg/async"
	"bytespace-backend/internal/repository/memory"
	authUseCase "bytespace-backend/internal/usecase/auth"
	courseUseCase "bytespace-backend/internal/usecase/course"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("==================================================")
	log.Println(" Starting ByteSpace DDD Backend Microservice...   ")
	log.Println("==================================================")

	// 1. Initialize Concurrency Worker Pool (channels, mutex, sync.WaitGroup)
	workerPool := async.NewWorkerPool(4, 256)
	log.Println("[Init] Async worker pool initialized with 4 concurrent workers")

	// 2. Initialize Repositories (Domain Layer Implementations using sync.RWMutex)
	userRepo := memory.NewInMemoryUserRepository()
	courseRepo := memory.NewInMemoryCourseRepository()
	log.Println("[Init] Thread-safe in-memory repositories initialized and pre-seeded")

	// 3. Initialize Application Use Cases (Decoupled Business Logic)
	authService := authUseCase.NewAuthService(userRepo, workerPool)
	courseService := courseUseCase.NewCourseService(courseRepo, workerPool)
	log.Println("[Init] Domain use-case services initialized")

	// 4. Initialize Delivery / HTTP Layer
	authHandler := deliveryHTTP.NewAuthHandler(authService)
	courseHandler := deliveryHTTP.NewCourseHandler(courseService)

	router := deliveryHTTP.SetupRouter(deliveryHTTP.RouterConfig{
		AuthHandler:   authHandler,
		CourseHandler: courseHandler,
	})

	server := &http.Server{
		Addr:         ":" + port,
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// 5. Start Server in separate goroutine
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	go func() {
		log.Printf("ByteSpace Backend successfully listening on http://0.0.0.0:%s", port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Fatal: server terminated unexpectedly: %v", err)
		}
	}()

	// 6. Graceful Shutdown
	<-stop
	log.Println("Received termination signal. Shutting down gracefully...")

	// 6a. Shutdown HTTP server
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		log.Printf("Warning: server forced to shutdown: %v", err)
	} else {
		log.Println("[Shutdown] HTTP server closed")
	}

	// 6b. Shutdown WorkerPool (drains channels and waits on sync.WaitGroup)
	log.Println("[Shutdown] Waiting for async background workers to complete...")
	workerPool.Shutdown()

	log.Println("ByteSpace Backend shutdown complete. Goodbye!")
}
