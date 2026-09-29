package course

import (
	"context"
	"fmt"
	"log"
	"math"
	"strings"
	"time"

	"bytespace-backend/internal/domain/common"
	"bytespace-backend/internal/domain/course"
	"bytespace-backend/internal/pkg/async"
)

type CourseUseCase interface {
	ListCourses(ctx context.Context, filter course.Filter) (*CourseListResponse, error)
	GetCourseByID(ctx context.Context, id string) (*course.Course, error)
	CreateCourse(ctx context.Context, req CreateCourseRequest) (*course.Course, error)
	UpdateCourse(ctx context.Context, id string, req UpdateCourseRequest) (*course.Course, error)
	DeleteCourse(ctx context.Context, id string) error
}

type courseService struct {
	repo       course.CourseRepository
	workerPool *async.WorkerPool
}

func NewCourseService(repo course.CourseRepository, workerPool *async.WorkerPool) CourseUseCase {
	return &courseService{
		repo:       repo,
		workerPool: workerPool,
	}
}

func (s *courseService) ListCourses(ctx context.Context, filter course.Filter) (*CourseListResponse, error) {
	if filter.Page < 1 {
		filter.Page = 1
	}
	if filter.PageSize < 1 || filter.PageSize > 100 {
		filter.PageSize = 12
	}

	items, total, err := s.repo.List(ctx, filter)
	if err != nil {
		return nil, err
	}

	totalPages := int(math.Ceil(float64(total) / float64(filter.PageSize)))
	if totalPages == 0 {
		totalPages = 1
	}

	return &CourseListResponse{
		Data:       items,
		Total:      total,
		Page:       filter.Page,
		PageSize:   filter.PageSize,
		TotalPages: totalPages,
	}, nil
}

func (s *courseService) GetCourseByID(ctx context.Context, id string) (*course.Course, error) {
	if strings.TrimSpace(id) == "" {
		return nil, common.ErrInvalidInput
	}
	return s.repo.GetByID(ctx, id)
}

func (s *courseService) CreateCourse(ctx context.Context, req CreateCourseRequest) (*course.Course, error) {
	if strings.TrimSpace(req.Title) == "" {
		return nil, common.ErrInvalidInput
	}

	totalLessons := 0
	for _, sec := range req.Curriculum {
		totalLessons += len(sec.Lessons)
	}

	now := time.Now().UTC()
	c := &course.Course{
		ID:            fmt.Sprintf("course-%d", time.Now().UnixNano()),
		Title:         req.Title,
		Category:      req.Category,
		Rating:        5.0,
		ReviewsCount:  0,
		StudentsCount: 0,
		Duration:      req.Duration,
		LessonsCount:  totalLessons,
		Level:         req.Level,
		Price:         req.Price,
		OriginalPrice: req.OriginalPrice,
		Instructor:    req.Instructor,
		Thumbnail:     req.Thumbnail,
		Description:   req.Description,
		Curriculum:    req.Curriculum,
		CreatedAt:     now,
		UpdatedAt:     now,
	}

	if err := s.repo.Create(ctx, c); err != nil {
		return nil, err
	}

	// Trigger async event via worker pool
	s.workerPool.Submit(func(ctx context.Context) error {
		log.Printf("[Course Event] New course published: ID=%s, Title='%s'", c.ID, c.Title)
		return nil
	})

	return c, nil
}

func (s *courseService) UpdateCourse(ctx context.Context, id string, req UpdateCourseRequest) (*course.Course, error) {
	existing, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if req.Title != nil {
		existing.Title = *req.Title
	}
	if req.Category != nil {
		existing.Category = *req.Category
	}
	if req.Level != nil {
		existing.Level = *req.Level
	}
	if req.Duration != nil {
		existing.Duration = *req.Duration
	}
	if req.Price != nil {
		existing.Price = *req.Price
	}
	if req.OriginalPrice != nil {
		existing.OriginalPrice = *req.OriginalPrice
	}
	if req.Thumbnail != nil {
		existing.Thumbnail = *req.Thumbnail
	}
	if req.Description != nil {
		existing.Description = *req.Description
	}
	if req.Curriculum != nil {
		existing.Curriculum = req.Curriculum
		totalLessons := 0
		for _, sec := range req.Curriculum {
			totalLessons += len(sec.Lessons)
		}
		existing.LessonsCount = totalLessons
	}

	if err := s.repo.Update(ctx, existing); err != nil {
		return nil, err
	}

	return existing, nil
}

func (s *courseService) DeleteCourse(ctx context.Context, id string) error {
	if strings.TrimSpace(id) == "" {
		return common.ErrInvalidInput
	}
	return s.repo.Delete(ctx, id)
}
