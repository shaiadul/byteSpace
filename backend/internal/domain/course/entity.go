package course

import (
	"context"
	"time"
)

type Category string

const (
	CategoryDesign      Category = "Design"
	CategoryDevelopment Category = "Development"
	CategoryMarketing   Category = "Marketing"
	CategoryBusiness    Category = "Business"
	CategoryDataAI      Category = "Data & AI"
)

type Level string

const (
	LevelAllLevels    Level = "All Levels"
	LevelBeginner     Level = "Beginner"
	LevelIntermediate Level = "Intermediate"
	LevelAdvanced     Level = "Advanced"
)

type Instructor struct {
	Name   string `json:"name"`
	Role   string `json:"role"`
	Avatar string `json:"avatar"`
}

type Lesson struct {
	ID       string `json:"id,omitempty"`
	Title    string `json:"title"`
	Duration string `json:"duration"`
	IsFree   bool   `json:"is_free,omitempty"`
}

type CurriculumSection struct {
	Title   string   `json:"title"`
	Lessons []Lesson `json:"lessons"`
}

type Course struct {
	ID            string              `json:"id"`
	Title         string              `json:"title"`
	Category      Category            `json:"category"`
	Rating        float64             `json:"rating"`
	ReviewsCount  int                 `json:"reviews_count"`
	StudentsCount int                 `json:"students_count"`
	Duration      string              `json:"duration"`
	LessonsCount  int                 `json:"lessons_count"`
	CommentsCount int                 `json:"comments_count,omitempty"`
	Level         Level               `json:"level"`
	Price         float64             `json:"price"`
	OriginalPrice float64             `json:"original_price"`
	Instructor    Instructor          `json:"instructor"`
	Thumbnail     string              `json:"thumbnail"`
	Description   string              `json:"description"`
	Curriculum    []CurriculumSection `json:"curriculum"`
	CreatedAt     time.Time           `json:"created_at"`
	UpdatedAt     time.Time           `json:"updated_at"`
}

type Filter struct {
	Query    string
	Category string
	Level    string
	SortBy   string
	Page     int
	PageSize int
}

type CourseRepository interface {
	List(ctx context.Context, filter Filter) ([]Course, int, error)
	GetByID(ctx context.Context, id string) (*Course, error)
	Create(ctx context.Context, c *Course) error
	Update(ctx context.Context, c *Course) error
	Delete(ctx context.Context, id string) error
}
