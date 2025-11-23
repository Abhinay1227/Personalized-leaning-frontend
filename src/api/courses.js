// src/api/courses.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:8000/api/',
  withCredentials: true, // if you use session auth; remove if not required
});

// list of courses
export const fetchCourses = (params = {}) => api.get('courses/', { params }).then(r => r.data);

// single course by slug
export const fetchCourse = (slugOrId) => api.get(`courses/${slugOrId}/`).then(r => r.data);

// enroll (expects course id)
export const enrollCourse = (id) => api.post(`courses/${id}/enroll/`).then(r => r.data);

// mark lesson complete - recommended endpoint: POST /api/courses/{course_id}/lessons/{lesson_id}/complete/
export const markLessonComplete = (courseId, lessonId) =>
  api.post(`courses/${courseId}/lessons/${lessonId}/complete/`).then(r => r.data);

// quiz submit (if/when you implement)
export const submitQuiz = (quizId, answers) => api.post(`quizzes/${quizId}/submit/`, { answers }).then(r => r.data);

export default api;
