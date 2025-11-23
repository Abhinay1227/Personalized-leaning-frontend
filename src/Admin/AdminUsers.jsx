// AdminUsers.jsx
import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(0);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  const COUNT_ENDPOINT = `${BASE_URL}/api/analytics/students/`;

  useEffect(() => {
    let alive = true;

    async function fetchCount() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(COUNT_ENDPOINT, {
          method: "GET",
          headers: { Accept: "application/json" }, // force JSON
        });

        const contentType = res.headers.get("content-type") || "";

        if (!res.ok) {
          const body = await res.text();
          throw new Error(`HTTP ${res.status} ${res.statusText} | CT=${contentType} | Body=${body.slice(0,200)}`);
        }
        if (!contentType.includes("application/json")) {
          const body = await res.text();
          throw new Error(`Unexpected content-type: ${contentType} | Body=${body.slice(0,200)}`);
        }

        const data = await res.json();
        const raw = data && data.students;
        const parsed = typeof raw === "number" ? raw : Number(raw);

        if (alive) {
          setStudentCount(Number.isFinite(parsed) ? parsed : 0);
          setLoading(false);
        }
      } catch (e) {
        if (alive) {
          setError(e?.message ?? "Failed to load users");
          setStudentCount(0);
          setLoading(false);
        }
      }
    }

    fetchCount();
    return () => { alive = false; };
  }, [COUNT_ENDPOINT]);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Users</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Students</p>
              <p className="text-2xl font-semibold mt-1">
                {loading ? "…" : String(studentCount)}
              </p>
            </div>
            <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              <Users size={20} />
            </div>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400" style={{ whiteSpace: "pre-line" }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
