// src/Admin/AdminCourses.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PlusCircle, Edit, Trash2, X } from "lucide-react";

/* ============================
   In-file hook: useAdminCourses
   ============================ */
function useAdminCourses() {
  const API_BASE = "http://127.0.0.1:8000/api/courses/";
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = useCallback((msg, type = "success") => {
    setMessage({ msg, type });
    const t = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(t);
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      showToast("Error fetching courses ❌", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const addCourse = useCallback(
    async (payload) => {
      try {
        const res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to add course");
        const data = await res.json();
        setCourses((prev) => [data, ...prev]);
        showToast("Course added successfully ✅");
      } catch (err) {
        console.error(err);
        showToast("Error adding course ❌", "error");
      }
    },
    [showToast]
  );

  const updateCourse = useCallback(
    async (id, payload) => {
      try {
        const res = await fetch(`${API_BASE}${id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update");
        const data = await res.json();
        setCourses((prev) => prev.map((c) => (c.id === data.id ? data : c)));
        showToast("Course updated ✏️");
      } catch (err) {
        console.error(err);
        showToast("Error updating course ❌", "error");
      }
    },
    [showToast]
  );

  const deleteCourse = useCallback(
    async (id) => {
      try {
        const res = await fetch(`${API_BASE}${id}/`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete");
        setCourses((prev) => prev.filter((c) => c.id !== id));
        showToast("Course deleted 🗑️");
      } catch (err) {
        console.error(err);
        showToast("Error deleting course ❌", "error");
      }
    },
    [showToast]
  );

  const defaultCourse = useMemo(
    () => ({
      title: "",
      description: "",
      instructor: "",
      duration_hours: "",
      level: "Beginner",
      rating: "",
      progress: 0,
    }),
    []
  );

  return {
    courses,
    loading,
    message,
    showToast,
    addCourse,
    updateCourse,
    deleteCourse,
    defaultCourse,
  };
}

/* ============================
   Course Table
   ============================ */
function CourseTable({ courses, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-x-auto transition-colors duration-300">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Instructor</th>
            <th className="p-3 text-left">Level</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-left">Created</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr
                key={course.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-3">{course.title}</td>
                <td className="p-3">{course.instructor}</td>
                <td className="p-3">{course.level}</td>
                <td className="p-3">{course.rating}</td>
                <td className="p-3">
                  {course.created_at
                    ? new Date(course.created_at).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => onEdit(course)}
                    className="text-blue-600 hover:text-blue-400"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(course.id)}
                    className="text-red-600 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3 text-gray-500 dark:text-gray-400" colSpan="6">
                No courses available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ============================
   Course Form Modal
   ============================ */
function CourseFormModal({ open, mode, values, onChange, onClose, onSubmit }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded-lg shadow-lg relative transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold mb-4">
          {mode === "add" ? "Add New Course" : "Edit Course"}
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={onChange}
            placeholder="Title"
            required
            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          <input
            type="text"
            name="instructor"
            value={values.instructor}
            onChange={onChange}
            placeholder="Instructor"
            required
            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          <textarea
            name="description"
            value={values.description}
            onChange={onChange}
            placeholder="Description"
            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="duration_hours"
              value={values.duration_hours}
              onChange={onChange}
              placeholder="Duration (hours)"
              className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            <input
              type="number"
              name="rating"
              step="0.1"
              value={values.rating}
              onChange={onChange}
              placeholder="Rating"
              className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <select
            name="level"
            value={values.level}
            onChange={onChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 rounded-lg transition"
          >
            {mode === "add" ? "Add Course" : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============================
   AdminCourses Page
   ============================ */
export default function AdminCourses() {
  const {
    courses,
    loading,
    message,
    addCourse,
    updateCourse,
    deleteCourse,
    defaultCourse,
  } = useAdminCourses();

  const [formOpen, setFormOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(defaultCourse);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const openAdd = useCallback(() => {
    setMode("add");
    setSelected(null);
    setForm(defaultCourse);
    setFormOpen(true);
  }, [defaultCourse]);

  const openEdit = useCallback((course) => {
    setMode("edit");
    setSelected(course);
    setForm({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration_hours: course.duration_hours,
      level: course.level,
      rating: course.rating,
      progress: course.progress ?? 0,
    });
    setFormOpen(true);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (mode === "add") {
        await addCourse(form);
      } else if (selected) {
        await updateCourse(selected.id, form);
      }
      setFormOpen(false);
    },
    [mode, addCourse, updateCourse, selected, form]
  );

  const onDelete = useCallback(
    async (id) => {
      if (!window.confirm("Are you sure you want to delete this course?")) return;
      await deleteCourse(id);
    },
    [deleteCourse]
  );

  return (
    <div className="relative dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
            message.type === "error"
              ? "bg-red-500"
              : "bg-green-600 dark:bg-green-700"
          }`}
        >
          {message.msg}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Courses Management</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all available courses here.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          <PlusCircle size={18} />
          Add Course
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading courses...
        </div>
      ) : (
        <CourseTable courses={courses} onEdit={openEdit} onDelete={onDelete} />
      )}

      <CourseFormModal
        open={formOpen}
        mode={mode}
        values={form}
        onChange={handleChange}
        onClose={() => setFormOpen(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
}
