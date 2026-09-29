package auth

import (
	"context"
	"crypto/rand"
	"fmt"
	"log"
	"math/big"
	"strings"
	"time"

	"bytespace-backend/internal/domain/common"
	"bytespace-backend/internal/domain/user"
	"bytespace-backend/internal/pkg/async"
)

type AuthUseCase interface {
	SignUp(ctx context.Context, req SignUpRequest) (*AuthResponse, error)
	SignIn(ctx context.Context, req SignInRequest) (*AuthResponse, error)
	VerifyOTP(ctx context.Context, req VerifyOTPRequest) (*AuthResponse, error)
	ForgotPassword(ctx context.Context, req ForgotPasswordRequest) error
}

type authService struct {
	userRepo   user.UserRepository
	workerPool *async.WorkerPool
}

func NewAuthService(userRepo user.UserRepository, workerPool *async.WorkerPool) AuthUseCase {
	return &authService{
		userRepo:   userRepo,
		workerPool: workerPool,
	}
}

func generateOTP() string {
	n, _ := rand.Int(rand.Reader, big.NewInt(900000))
	return fmt.Sprintf("%06d", n.Int64()+100000)
}

func (s *authService) SignUp(ctx context.Context, req SignUpRequest) (*AuthResponse, error) {
	if strings.TrimSpace(req.Email) == "" || strings.TrimSpace(req.Password) == "" {
		return nil, common.ErrInvalidInput
	}

	_, err := s.userRepo.GetByEmail(ctx, req.Email)
	if err == nil {
		return nil, common.ErrEmailAlreadyExists
	}

	now := time.Now().UTC()
	u := &user.User{
		ID:           fmt.Sprintf("user-%d", time.Now().UnixNano()),
		Name:         req.Name,
		Email:        strings.ToLower(req.Email),
		PasswordHash: req.Password,
		Role:         user.RoleStudent,
		IsVerified:   false,
		CreatedAt:    now,
		UpdatedAt:    now,
	}

	if err := s.userRepo.Create(ctx, u); err != nil {
		return nil, err
	}

	otpCode := generateOTP()
	otp := &user.OTPCode{
		Email:     u.Email,
		Code:      otpCode,
		ExpiresAt: now.Add(10 * time.Minute),
		Attempts:  0,
		Verified:  false,
	}
	_ = s.userRepo.SaveOTP(ctx, otp)

	s.workerPool.Submit(func(c context.Context) error {
		log.Printf("[Async Notification] Sent 6-digit verification code %s to email %s", otpCode, u.Email)
		return nil
	})

	return &AuthResponse{
		Token: fmt.Sprintf("jwt-mock-token-%s", u.ID),
		User: UserDTO{
			ID:         u.ID,
			Name:       u.Name,
			Email:      u.Email,
			Role:       string(u.Role),
			IsVerified: u.IsVerified,
		},
		Message: "Account created successfully. Verification code dispatched to your email.",
	}, nil
}

func (s *authService) SignIn(ctx context.Context, req SignInRequest) (*AuthResponse, error) {
	if strings.TrimSpace(req.Email) == "" || strings.TrimSpace(req.Password) == "" {
		return nil, common.ErrInvalidInput
	}

	u, err := s.userRepo.GetByEmail(ctx, req.Email)
	if err != nil {
		return nil, common.ErrInvalidCredentials
	}

	if u.PasswordHash != req.Password {
		return nil, common.ErrInvalidCredentials
	}

	s.workerPool.Submit(func(c context.Context) error {
		log.Printf("[Audit Event] User %s (%s) signed in successfully at %s", u.Name, u.Email, time.Now().UTC().Format(time.RFC3339))
		return nil
	})

	return &AuthResponse{
		Token:        fmt.Sprintf("jwt-mock-token-%s", u.ID),
		RefreshToken: fmt.Sprintf("jwt-refresh-token-%s", u.ID),
		User: UserDTO{
			ID:         u.ID,
			Name:       u.Name,
			Email:      u.Email,
			Role:       string(u.Role),
			Avatar:     u.Avatar,
			IsVerified: u.IsVerified,
		},
		Message: "Signed in successfully",
	}, nil
}

func (s *authService) VerifyOTP(ctx context.Context, req VerifyOTPRequest) (*AuthResponse, error) {
	otp, err := s.userRepo.GetOTP(ctx, req.Email)
	if err != nil {
		return nil, common.ErrInvalidOTP
	}

	if time.Now().UTC().After(otp.ExpiresAt) {
		_ = s.userRepo.DeleteOTP(ctx, req.Email)
		return nil, common.ErrOTPExpired
	}

	if otp.Code != req.Code {
		otp.Attempts++
		_ = s.userRepo.SaveOTP(ctx, otp)
		return nil, common.ErrInvalidOTP
	}

	u, err := s.userRepo.GetByEmail(ctx, req.Email)
	if err != nil {
		return nil, err
	}
	u.IsVerified = true
	_ = s.userRepo.Update(ctx, u)
	_ = s.userRepo.DeleteOTP(ctx, req.Email)

	return &AuthResponse{
		Token: fmt.Sprintf("jwt-mock-token-%s", u.ID),
		User: UserDTO{
			ID:         u.ID,
			Name:       u.Name,
			Email:      u.Email,
			Role:       string(u.Role),
			Avatar:     u.Avatar,
			IsVerified: true,
		},
		Message: "Email verified successfully.",
	}, nil
}

func (s *authService) ForgotPassword(ctx context.Context, req ForgotPasswordRequest) error {
	u, err := s.userRepo.GetByEmail(ctx, req.Email)
	if err != nil {
		return nil
	}

	otpCode := generateOTP()
	otp := &user.OTPCode{
		Email:     u.Email,
		Code:      otpCode,
		ExpiresAt: time.Now().UTC().Add(15 * time.Minute),
	}
	_ = s.userRepo.SaveOTP(ctx, otp)

	s.workerPool.Submit(func(c context.Context) error {
		log.Printf("[Async Notification] Password reset OTP %s dispatched to %s", otpCode, u.Email)
		return nil
	})

	return nil
}
