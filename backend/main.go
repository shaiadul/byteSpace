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

	workerPool := async.NewWorkerPool(4, 256)
	userRepo := memory.NewInMemoryUserRepository()
	courseRepo := memory.NewInMemoryCourseRepository()

	authService := authUseCase.NewAuthService(userRepo, workerPool)
	courseService := courseUseCase.NewCourseService(courseRepo, workerPool)

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

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	go func() {
		log.Printf("ByteSpace Backend listening on http://0.0.0.0:%s", port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server terminated: %v", err)
		}
	}()

	<-stop
	log.Println("Shutting down ByteSpace Backend gracefully...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Printf("Server shutdown error: %v", err)
	}

	workerPool.Shutdown()
	log.Println("ByteSpace Backend shutdown complete")
}
