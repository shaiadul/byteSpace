package http

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"bytespace-backend/internal/domain/common"
	domainCourse "bytespace-backend/internal/domain/course"
	usecaseCourse "bytespace-backend/internal/usecase/course"
)

type CourseHandler struct {
	courseService usecaseCourse.CourseUseCase
}

func NewCourseHandler(courseService usecaseCourse.CourseUseCase) *CourseHandler {
	return &CourseHandler{courseService: courseService}
}

func (h *CourseHandler) HandleCourses(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		h.List(w, r)
	case http.MethodPost:
		h.Create(w, r)
	default:
		RespondError(w, common.ErrInvalidInput)
	}
}

func (h *CourseHandler) HandleCourseByID(w http.ResponseWriter, r *http.Request) {
	// Extract ID from URL path: /api/v1/courses/{id}
	pathParts := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
	if len(pathParts) < 4 {
		RespondError(w, common.ErrInvalidInput)
		return
	}
	id := pathParts[3]

	switch r.Method {
	case http.MethodGet:
		h.GetByID(w, r, id)
	case http.MethodPut, http.MethodPatch:
		h.Update(w, r, id)
	case http.MethodDelete:
		h.Delete(w, r, id)
	default:
		RespondError(w, common.ErrInvalidInput)
	}
}

func (h *CourseHandler) List(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query().Get("q")
	category := r.URL.Query().Get("category")
	level := r.URL.Query().Get("level")
	sortBy := r.URL.Query().Get("sort")

	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}
	pageSize, _ := strconv.Atoi(r.URL.Query().Get("page_size"))
	if pageSize < 1 {
		pageSize = 12
	}

	filter := domainCourse.Filter{
		Query:    q,
		Category: category,
		Level:    level,
		SortBy:   sortBy,
		Page:     page,
		PageSize: pageSize,
	}

	resp, err := h.courseService.ListCourses(r.Context(), filter)
	if err != nil {
		RespondError(w, err)
		return
	}

	RespondJSON(w, http.StatusOK, resp, "Courses retrieved successfully")
}

func (h *CourseHandler) GetByID(w http.ResponseWriter, r *http.Request, id string) {
	c, err := h.courseService.GetCourseByID(r.Context(), id)
	if err != nil {
		RespondError(w, err)
		return
	}

	RespondJSON(w, http.StatusOK, c, "Course retrieved successfully")
}

func (h *CourseHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req usecaseCourse.CreateCourseRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	created, err := h.courseService.CreateCourse(r.Context(), req)
	if err != nil {
		RespondError(w, err)
		return
	}

	RespondJSON(w, http.StatusCreated, created, "Course created successfully")
}

func (h *CourseHandler) Update(w http.ResponseWriter, r *http.Request, id string) {
	var req usecaseCourse.UpdateCourseRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		RespondError(w, common.ErrInvalidInput)
		return
	}

	updated, err := h.courseService.UpdateCourse(r.Context(), id, req)
	if err != nil {
		RespondError(w, err)
		return
	}

	RespondJSON(w, http.StatusOK, updated, "Course updated successfully")
}

func (h *CourseHandler) Delete(w http.ResponseWriter, r *http.Request, id string) {
	if err := h.courseService.DeleteCourse(r.Context(), id); err != nil {
		RespondError(w, err)
		return
	}

	RespondJSON(w, http.StatusOK, map[string]string{"id": id}, "Course deleted successfully")
}
