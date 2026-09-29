package memory

import (
	"context"
	"strings"
	"sync"
	"time"

	"bytespace-backend/internal/domain/common"
	"bytespace-backend/internal/domain/user"
)

type InMemoryUserRepository struct {
	mu     sync.RWMutex
	users  map[string]*user.User
	emails map[string]string // email -> user ID
	otps   map[string]*user.OTPCode
}

func NewInMemoryUserRepository() *InMemoryUserRepository {
	repo := &InMemoryUserRepository{
		users:  make(map[string]*user.User),
		emails: make(map[string]string),
		otps:   make(map[string]*user.OTPCode),
	}

	// Seed default demo user for testing
	demoUser := &user.User{
		ID:           "user-demo-1",
		Name:         "Sarah Connor",
		Email:        "designer@example.com",
		PasswordHash: "secret123", // In production hashed with bcrypt
		Role:         user.RoleStudent,
		Avatar:       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
		IsVerified:   true,
		CreatedAt:    time.Now().UTC(),
		UpdatedAt:    time.Now().UTC(),
	}
	repo.users[demoUser.ID] = demoUser
	repo.emails[strings.ToLower(demoUser.Email)] = demoUser.ID

	return repo
}

func (r *InMemoryUserRepository) Create(ctx context.Context, u *user.User) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	normalizedEmail := strings.ToLower(u.Email)
	if _, exists := r.emails[normalizedEmail]; exists {
		return common.ErrEmailAlreadyExists
	}

	r.users[u.ID] = u
	r.emails[normalizedEmail] = u.ID
	return nil
}

func (r *InMemoryUserRepository) GetByID(ctx context.Context, id string) (*user.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	u, exists := r.users[id]
	if !exists {
		return nil, common.ErrUserNotFound
	}
	// Return copy
	clone := *u
	return &clone, nil
}

func (r *InMemoryUserRepository) GetByEmail(ctx context.Context, email string) (*user.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	id, exists := r.emails[strings.ToLower(email)]
	if !exists {
		return nil, common.ErrUserNotFound
	}
	u := r.users[id]
	clone := *u
	return &clone, nil
}

func (r *InMemoryUserRepository) Update(ctx context.Context, u *user.User) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.users[u.ID]; !exists {
		return common.ErrUserNotFound
	}
	u.UpdatedAt = time.Now().UTC()
	r.users[u.ID] = u
	return nil
}

func (r *InMemoryUserRepository) SaveOTP(ctx context.Context, otp *user.OTPCode) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.otps[strings.ToLower(otp.Email)] = otp
	return nil
}

func (r *InMemoryUserRepository) GetOTP(ctx context.Context, email string) (*user.OTPCode, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	otp, exists := r.otps[strings.ToLower(email)]
	if !exists {
		return nil, common.ErrInvalidOTP
	}
	clone := *otp
	return &clone, nil
}

func (r *InMemoryUserRepository) DeleteOTP(ctx context.Context, email string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	delete(r.otps, strings.ToLower(email))
	return nil
}
