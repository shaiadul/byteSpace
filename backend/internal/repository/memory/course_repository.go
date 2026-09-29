package memory

import (
	"context"
	"fmt"
	"strings"
	"sync"
	"time"

	"bytespace-backend/internal/domain/common"
	"bytespace-backend/internal/domain/course"
)

type InMemoryCourseRepository struct {
	mu      sync.RWMutex
	courses map[string]*course.Course
	order   []string // Preserve insertion order for stable listing
}

func NewInMemoryCourseRepository() *InMemoryCourseRepository {
	repo := &InMemoryCourseRepository{
		courses: make(map[string]*course.Course),
		order:   make([]string, 0),
	}
	repo.seedInitialData()
	return repo
}

func (r *InMemoryCourseRepository) seedInitialData() {
	now := time.Now().UTC()
	initialCourses := []*course.Course{
		{
			ID:            "1",
			Title:         "Learn Figma from Basic",
			Category:      course.CategoryDesign,
			Rating:        4.5,
			ReviewsCount:  980,
			CommentsCount: 59,
			StudentsCount: 26,
			Duration:      "2 hours 16 mins",
			LessonsCount:  17,
			Level:         course.LevelBeginner,
			Price:         25.0,
			OriginalPrice: 49.99,
			Instructor: course.Instructor{
				Name:   "purepearl studio",
				Role:   "Digital Design Studio",
				Avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
			},
			Thumbnail:   "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
			Description: "Learn UX research, wireframing, typography, color harmony, auto-layout mastery, interactive prototyping, and design system creation in Figma.",
			Curriculum: []course.CurriculumSection{
				{
					Title: "Section 1: Design Thinking & Wireframing",
					Lessons: []course.Lesson{
						{ID: "1-1", Title: "Introduction to Design Systems", Duration: "14:20", IsFree: true},
						{ID: "1-2", Title: "User Flows and Information Architecture", Duration: "22:10"},
					},
				},
				{
					Title: "Section 2: Figma Mastery & Auto-Layout 5.0",
					Lessons: []course.Lesson{
						{ID: "2-1", Title: "Advanced Auto-Layout & Constraints", Duration: "29:45", IsFree: true},
						{ID: "2-2", Title: "Variables, Color Modes & Tokens", Duration: "35:10"},
					},
				},
			},
			CreatedAt: now,
			UpdatedAt: now,
		},
		{
			ID:            "2",
			Title:         "Build Digital Asset",
			Category:      course.CategoryDesign,
			Rating:        4.5,
			ReviewsCount:  840,
			CommentsCount: 59,
			StudentsCount: 26,
			Duration:      "2 hours 16 mins",
			LessonsCount:  17,
			Level:         course.LevelBeginner,
			Price:         25.0,
			OriginalPrice: 49.99,
			Instructor: course.Instructor{
				Name:   "purepearl studio",
				Role:   "Digital Design Studio",
				Avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
			},
			Thumbnail:   "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
			Description: "Build robust digital assets, scale design systems, manage reusable token libraries, and publish digital asset packs.",
			Curriculum: []course.CurriculumSection{
				{
					Title: "Section 1: Component Architecture",
					Lessons: []course.Lesson{
						{ID: "1-1", Title: "Scalable Asset Structure", Duration: "18:00", IsFree: true},
						{ID: "1-2", Title: "Export Pipelines for Production", Duration: "21:30"},
					},
				},
			},
			CreatedAt: now,
			UpdatedAt: now,
		},
		{
			ID:            "3",
			Title:         "the Power of Big Data",
			Category:      course.CategoryDataAI,
			Rating:        4.5,
			ReviewsCount:  1250,
			CommentsCount: 78,
			StudentsCount: 34,
			Duration:      "3 hours 45 mins",
			LessonsCount:  24,
			Level:         course.LevelIntermediate,
			Price:         35.0,
			OriginalPrice: 69.99,
			Instructor: course.Instructor{
				Name:   "Elena Rostova",
				Role:   "Principal Data Architect",
				Avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
			},
			Thumbnail:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
			Description: "Harness the power of data visualization, exploratory analytics, metric dashboards, and data-driven insights.",
			Curriculum: []course.CurriculumSection{
				{
					Title: "Section 1: Foundations of Big Data",
					Lessons: []course.Lesson{
						{ID: "1-1", Title: "Distributed Storage & Pipelines", Duration: "25:00", IsFree: true},
					},
				},
			},
			CreatedAt: now,
			UpdatedAt: now,
		},
		{
			ID:            "4",
			Title:         "Balancing Productivity and Life",
			Category:      course.CategoryBusiness,
			Rating:        4.8,
			ReviewsCount:  620,
			CommentsCount: 34,
			StudentsCount: 19,
			Duration:      "1 hour 45 mins",
			LessonsCount:  12,
			Level:         course.LevelAllLevels,
			Price:         20.0,
			OriginalPrice: 39.99,
			Instructor: course.Instructor{
				Name:   "Marcus Vance",
				Role:   "Executive Coach & Author",
				Avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
			},
			Thumbnail:   "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
			Description: "Develop intentional daily routines, manage deep work schedules, prevent creative burnout, and boost sustained output.",
			Curriculum: []course.CurriculumSection{
				{
					Title: "Section 1: Focus Systems",
					Lessons: []course.Lesson{
						{ID: "1-1", Title: "Deep Work Protocols", Duration: "15:20", IsFree: true},
					},
				},
			},
			CreatedAt: now,
			UpdatedAt: now,
		},
		{
			ID:            "5",
			Title:         "Mastering Money Management",
			Category:      course.CategoryBusiness,
			Rating:        4.9,
			ReviewsCount:  1100,
			CommentsCount: 92,
			StudentsCount: 45,
			Duration:      "4 hours 10 mins",
			LessonsCount:  28,
			Level:         course.LevelBeginner,
			Price:         30.0,
			OriginalPrice: 59.99,
			Instructor: course.Instructor{
				Name:   "David Sterling",
				Role:   "Chartered Financial Analyst",
				Avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
			},
			Thumbnail:   "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80",
			Description: "Master personal finance, investment fundamentals, cash flow management, budgeting strategies, and long-term wealth building.",
			Curriculum: []course.CurriculumSection{
				{
					Title: "Section 1: Cash Flow Systems",
					Lessons: []course.Lesson{
						{ID: "1-1", Title: "Automated Budgeting", Duration: "22:15", IsFree: true},
					},
				},
			},
			CreatedAt: now,
			UpdatedAt: now,
		},
		{
			ID:            "6",
			Title:         "From Idea to Startup Success",
			Category:      course.CategoryBusiness,
			Rating:        4.7,
			ReviewsCount:  750,
			CommentsCount: 45,
			StudentsCount: 22,
			Duration:      "3 hours 30 mins",
			LessonsCount:  20,
			Level:         course.LevelIntermediate,
			Price:         28.0,
			OriginalPrice: 55.0,
			Instructor: course.Instructor{
				Name:   "Aria Chen",
				Role:   "Venture Partner & Founder",
				Avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
			},
			Thumbnail:   "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80",
			Description: "Validate startup concepts, conduct customer discovery interviews, build minimum viable products, and execute go-to-market strategies.",
			Curriculum: []course.CurriculumSection{
				{
					Title: "Section 1: Problem Validation",
					Lessons: []course.Lesson{
						{ID: "1-1", Title: "Customer Discovery Interviews", Duration: "20:00", IsFree: true},
					},
				},
			},
			CreatedAt: now,
			UpdatedAt: now,
		},
	}

	for _, c := range initialCourses {
		r.courses[c.ID] = c
		r.order = append(r.order, c.ID)
	}
}

func (r *InMemoryCourseRepository) List(ctx context.Context, f course.Filter) ([]course.Course, int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	matched := make([]course.Course, 0)
	query := strings.ToLower(strings.TrimSpace(f.Query))
	category := strings.ToLower(strings.TrimSpace(f.Category))
	level := strings.ToLower(strings.TrimSpace(f.Level))

	for _, id := range r.order {
		c := r.courses[id]

		// Filter by search query
		if query != "" {
			titleMatch := strings.Contains(strings.ToLower(c.Title), query)
			descMatch := strings.Contains(strings.ToLower(c.Description), query)
			instructorMatch := strings.Contains(strings.ToLower(c.Instructor.Name), query)
			if !titleMatch && !descMatch && !instructorMatch {
				continue
			}
		}

		// Filter by category
		if category != "" && category != "all" && category != "all courses" {
			if strings.ToLower(string(c.Category)) != category {
				continue
			}
		}

		// Filter by level
		if level != "" && level != "all" && level != "all levels" {
			if strings.ToLower(string(c.Level)) != level {
				continue
			}
		}

		matched = append(matched, *c)
	}

	total := len(matched)

	// Pagination
	page := f.Page
	if page < 1 {
		page = 1
	}
	pageSize := f.PageSize
	if pageSize < 1 {
		pageSize = 12
	}

	start := (page - 1) * pageSize
	if start >= total {
		return []course.Course{}, total, nil
	}
	end := start + pageSize
	if end > total {
		end = total
	}

	return matched[start:end], total, nil
}

func (r *InMemoryCourseRepository) GetByID(ctx context.Context, id string) (*course.Course, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	c, exists := r.courses[id]
	if !exists {
		return nil, common.ErrCourseNotFound
	}
	clone := *c
	return &clone, nil
}

func (r *InMemoryCourseRepository) Create(ctx context.Context, c *course.Course) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if c.ID == "" {
		c.ID = fmt.Sprintf("course-%d", len(r.courses)+1)
	}
	now := time.Now().UTC()
	c.CreatedAt = now
	c.UpdatedAt = now

	r.courses[c.ID] = c
	r.order = append(r.order, c.ID)
	return nil
}

func (r *InMemoryCourseRepository) Update(ctx context.Context, c *course.Course) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	existing, exists := r.courses[c.ID]
	if !exists {
		return common.ErrCourseNotFound
	}
	c.CreatedAt = existing.CreatedAt
	c.UpdatedAt = time.Now().UTC()
	r.courses[c.ID] = c
	return nil
}

func (r *InMemoryCourseRepository) Delete(ctx context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.courses[id]; !exists {
		return common.ErrCourseNotFound
	}
	delete(r.courses, id)

	newOrder := make([]string, 0, len(r.order)-1)
	for _, item := range r.order {
		if item != id {
			newOrder = append(newOrder, item)
		}
	}
	r.order = newOrder
	return nil
}
