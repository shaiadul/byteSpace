package http

import (
	"encoding/json"
	"net/http"

	"bytespace-backend/internal/domain/common"
)

type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
	Message string      `json:"message,omitempty"`
}

func RespondJSON(w http.ResponseWriter, status int, data interface{}, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(APIResponse{
		Success: true,
		Data:    data,
		Message: message,
	})
}

func RespondError(w http.ResponseWriter, err error) {
	w.Header().Set("Content-Type", "application/json")

	status := http.StatusInternalServerError
	switch err {
	case common.ErrCourseNotFound, common.ErrUserNotFound, common.ErrNotFound:
		status = http.StatusNotFound
	case common.ErrInvalidCredentials, common.ErrUnauthorized:
		status = http.StatusUnauthorized
	case common.ErrEmailAlreadyExists:
		status = http.StatusConflict
	case common.ErrInvalidOTP, common.ErrOTPExpired, common.ErrInvalidInput:
		status = http.StatusBadRequest
	}

	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(APIResponse{
		Success: false,
		Error:   err.Error(),
	})
}
