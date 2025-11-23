// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dashboard from "./pages/Dashboard";
import AdminLoginForm from "./AdminLoginForm";

import AdminDashboard from "./Admin/AdminDashboard";
import AdminCourses from "./Admin/AdminCourses";
import AdminUsers from "./Admin/AdminUsers";

import Courses from "./components/courses/Courses";
import CourseDetail from "./components/courses/CourseDetail"; // ✅ NEW

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-login" element={<AdminLoginForm />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<Navigate to="courses" replace />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} /> {/* ✅ NEW */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
