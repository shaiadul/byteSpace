package user

import (
	"context"
	"time"
)

type Role string

const (
	RoleStudent    Role = "Student"
	RoleCreator    Role = "Creator"
	RoleInstructor Role = "Instructor"
	RoleAdmin      Role = "Admin"
)

type User struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	Role         Role      `json:"role"`
	Avatar       string    `json:"avatar,omitempty"`
	IsVerified   bool      `json:"is_verified"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type OTPCode struct {
	Email     string    `json:"email"`
	Code      string    `json:"code"`
	ExpiresAt time.Time `json:"expires_at"`
	Attempts  int       `json:"attempts"`
	Verified  bool      `json:"verified"`
}

type UserRepository interface {
	Create(ctx context.Context, u *User) error
	GetByID(ctx context.Context, id string) (*User, error)
	GetByEmail(ctx context.Context, email string) (*User, error)
	Update(ctx context.Context, u *User) error
	SaveOTP(ctx context.Context, otp *OTPCode) error
	GetOTP(ctx context.Context, email string) (*OTPCode, error)
	DeleteOTP(ctx context.Context, email string) error
}
