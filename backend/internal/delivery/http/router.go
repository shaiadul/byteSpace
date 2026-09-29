package http

import (
	"log"
	"net/http"
	"strings"
	"time"
)

type RouterConfig struct {
	AuthHandler   *AuthHandler
	CourseHandler *CourseHandler
}

func SetupRouter(cfg RouterConfig) http.Handler {
	mux := http.NewServeMux()

	// 1. Health checks
	healthHandler := func(w http.ResponseWriter, r *http.Request) {
		RespondJSON(w, http.StatusOK, map[string]interface{}{
			"status":    "ok",
			"service":   "bytespace-backend",
			"version":   "1.0.0",
			"timestamp": time.Now().UTC(),
		}, "Service is healthy")
	}
	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/api/health", healthHandler)

	// 2. Auth Endpoints
	mux.HandleFunc("/api/v1/auth/signup", cfg.AuthHandler.SignUp)
	mux.HandleFunc("/api/v1/auth/signin", cfg.AuthHandler.SignIn)
	mux.HandleFunc("/api/v1/auth/verify-otp", cfg.AuthHandler.VerifyOTP)
	mux.HandleFunc("/api/v1/auth/forgot-password", cfg.AuthHandler.ForgotPassword)

	// 3. Course Endpoints
	mux.HandleFunc("/api/v1/courses", cfg.CourseHandler.HandleCourses)
	mux.HandleFunc("/api/v1/courses/", func(w http.ResponseWriter, r *http.Request) {
		// Route `/api/v1/courses` without trailing slash to collection handler
		if r.URL.Path == "/api/v1/courses" || r.URL.Path == "/api/v1/courses/" {
			cfg.CourseHandler.HandleCourses(w, r)
			return
		}
		cfg.CourseHandler.HandleCourseByID(w, r)
	})

	// Wrap in global middlewares
	return withCORS(withLogger(withRecovery(mux)))
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		w.Header().Set("Access-Control-Max-Age", "86400")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func withLogger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		// Ignore health check logging to keep logs clean
		if !strings.Contains(r.URL.Path, "health") {
			log.Printf("[%s] %s %s - %v", r.Method, r.URL.Path, r.RemoteAddr, time.Since(start))
		}
	})
}

func withRecovery(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				log.Printf("[PANIC RECOVERED] %v", rec)
				http.Error(w, `{"success":false,"error":"internal server error"}`, http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}
