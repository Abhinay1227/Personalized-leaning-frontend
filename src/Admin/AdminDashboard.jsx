// src/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Menu,
  X,
  Sun,
  Moon,
  Settings,
  LogOut,
  Users,
  BarChart2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // initialize from localStorage so mode persists
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);


  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const toggleDarkMode = () => setDarkMode((d) => !d);

  const handleLogout = () => {
    // replace with your real logout logic
    console.log("logout clicked");
    // Example: navigate('/login') or clear auth tokens etc.
  };

  const navLinks = [
    { to: "/admin-dashboard/courses", label: "Courses", icon: <BookOpen size={18} /> },
    { to: "/admin-dashboard/users", label: "Users", icon: <Users size={18} /> },
    { to: "/admin-dashboard/analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
    { to: "/admin-dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ===== Sidebar (Desktop) ===== */}
      <aside
        className={`hidden md:flex flex-col w-64 shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
          <LayoutDashboard className="text-blue-600" />
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>

        <nav className="mt-4 space-y-1 flex-1">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900/50 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm">{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg mt-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* ===== Sidebar (Mobile) ===== */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.22 }}
            className={`fixed inset-y-0 left-0 w-64 z-40 p-4 shadow-lg md:hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <LayoutDashboard className="text-blue-600" />
                Admin Panel
              </h2>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close menu" className="text-gray-600 dark:text-gray-300">
                <X />
              </button>
            </div>

            <nav className="space-y-1">
              {navLinks.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900/50 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                    }`
                  }
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ===== Main Content Area ===== */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar - placed above mobile sidebar (z-50) so buttons remain visible */}
        <header className={`flex items-center justify-between px-6 py-4 shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"} z-50 relative`}>
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu />
            </button>
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>

          {/* Right Section (Dark Mode + Logout + Profile) */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className={`px-3 py-1.5 rounded-lg text-sm outline-none border ${darkMode ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100" : "bg-gray-100 border-gray-300 text-gray-900"}`}
            />

            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="p-2 rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition"
            >
              <LogOut size={18} />
            </button>

            <img src="https://i.pravatar.cc/40" alt="Profile" className="w-8 h-8 rounded-full" />
          </div>
        </header>

        {/* Page Outlet */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
