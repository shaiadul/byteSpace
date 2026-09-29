package course

import "bytespace-backend/internal/domain/course"

type CreateCourseRequest struct {
	Title         string                      `json:"title"`
	Category      course.Category             `json:"category"`
	Level         course.Level                `json:"level"`
	Duration      string                      `json:"duration"`
	Price         float64                     `json:"price"`
	OriginalPrice float64                     `json:"original_price"`
	Instructor    course.Instructor           `json:"instructor"`
	Thumbnail     string                      `json:"thumbnail"`
	Description   string                      `json:"description"`
	Curriculum    []course.CurriculumSection  `json:"curriculum,omitempty"`
}

type UpdateCourseRequest struct {
	Title         *string                     `json:"title,omitempty"`
	Category      *course.Category            `json:"category,omitempty"`
	Level         *course.Level               `json:"level,omitempty"`
	Duration      *string                     `json:"duration,omitempty"`
	Price         *float64                    `json:"price,omitempty"`
	OriginalPrice *float64                    `json:"original_price,omitempty"`
	Thumbnail     *string                     `json:"thumbnail,omitempty"`
	Description   *string                     `json:"description,omitempty"`
	Curriculum    []course.CurriculumSection  `json:"curriculum,omitempty"`
}

type CourseListResponse struct {
	Data       []course.Course `json:"data"`
	Total      int             `json:"total"`
	Page       int             `json:"page"`
	PageSize   int             `json:"page_size"`
	TotalPages int             `json:"total_pages"`
}
