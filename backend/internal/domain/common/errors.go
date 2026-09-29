package common

import "errors"

var (
	ErrNotFound           = errors.New("requested resource was not found")
	ErrCourseNotFound     = errors.New("course not found")
	ErrUserNotFound       = errors.New("user not found")
	ErrEmailAlreadyExists = errors.New("email is already registered")
	ErrInvalidCredentials = errors.New("invalid email or password")
	ErrInvalidOTP         = errors.New("invalid or expired verification code")
	ErrOTPExpired         = errors.New("verification code has expired")
	ErrInvalidInput       = errors.New("invalid input provided")
	ErrUnauthorized       = errors.New("unauthorized request")
)
