package http

import (
	"encoding/json"
	"net/http"

	"bytespace-backend/internal/domain/common"
	"bytespace-backend/internal/usecase/auth"
)

type AuthHandler struct {
	authService auth.AuthUseCase
}

func NewAuthHandler(authService auth.AuthUseCase) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (h *AuthHandler) SignUp(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	var req auth.SignUpRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	resp, err := h.authService.SignUp(r.Context(), req)
	if err != nil {
		RespondError(w, err)
		return
	}

	RespondJSON(w, http.StatusCreated, resp, resp.Message)
}

func (h *AuthHandler) SignIn(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	var req auth.SignInRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	resp, err := h.authService.SignIn(r.Context(), req)
	if err != nil {
		RespondError(w, err)
		return
	}

	RespondJSON(w, http.StatusOK, resp, resp.Message)
}

func (h *AuthHandler) VerifyOTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	var req auth.VerifyOTPRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	resp, err := h.authService.VerifyOTP(r.Context(), req)
	if err != nil {
		RespondError(w, err)
		return
	}

	RespondJSON(w, http.StatusOK, resp, resp.Message)
}

func (h *AuthHandler) ForgotPassword(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	var req auth.ForgotPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	if err := h.authService.ForgotPassword(r.Context(), req); err != nil {
		RespondError(w, err)
		return
	}

	RespondJSON(w, http.StatusOK, nil, "If an account exists with this email, a verification code has been dispatched.")
}
