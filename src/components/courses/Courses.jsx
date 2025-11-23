import React from "react";
import {
  Box, Typography, Card, CardContent, CardActions, Button,
  Grid, Chip, Stack, Avatar, LinearProgress, Tooltip, CircularProgress,
  Alert, TextField, InputAdornment, ToggleButton, ToggleButtonGroup,
  Snackbar
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

// ---------- Config ----------
const API_BASE = "http://localhost:8000/api"; // unify with backend host used during login

// ---------- Auth helpers (JWT with auto-refresh) ----------
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;
  try {
    const res = await fetch("http://localhost:8000/api/accounts/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (!res.ok) throw new Error("Failed to refresh token");
    const data = await res.json();
    if (!data?.access) throw new Error("No access token returned");
    localStorage.setItem("accessToken", data.access);
    return data.access;
  } catch (err) {
    console.error("Token refresh failed", err);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
}

async function fetchWithAuth(url, options = {}) {
  const opts = {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };
  let token = localStorage.getItem("accessToken");
  if (token) opts.headers["Authorization"] = `Bearer ${token}`;

  let res = await fetch(url, opts);
  if (res.status !== 401) return res;

  // auto refresh on 401
  token = await refreshAccessToken();
  if (!token) {
    const err = new Error("User must login again");
    err.status = 401;
    throw err;
  }
  const retryOpts = { ...opts, headers: { ...opts.headers, Authorization: `Bearer ${token}` } };
  res = await fetch(url, retryOpts);
  return res;
}

// ---------- Demo data ----------
const demoCourses = [
  { id: 1, title: "Introduction to Python", description: "Hands-on Python from zero to writing clean, maintainable scripts.", instructor: "Jane Doe", duration_hours: 12, level: "Beginner", rating: 4.8, progress: 35, color: "#6EE7F9" },
  { id: 2, title: "React Fundamentals", description: "Modern React with hooks, state, routing and best practices.", instructor: "John Smith", duration_hours: 10, level: "Intermediate", rating: 4.7, progress: 60, color: "#A7F3D0" },
  { id: 3, title: "Data Structures & Algorithms", description: "Master core DSA patterns to crack coding interviews.", instructor: "Alice Johnson", duration_hours: 18, level: "Advanced", rating: 4.9, progress: 10, color: "#FDE68A" },
];

const gradientBg = `radial-gradient(80% 120% at 20% 0%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.15) 100%)`;

export default function Courses() {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [q, setQ] = React.useState("");
  const [level, setLevel] = React.useState("All");
  const [enrolling, setEnrolling] = React.useState({});
  const [enrolledIds, setEnrolledIds] = React.useState(new Set());
  const [toast, setToast] = React.useState({ open: false, type: "success", msg: "" });

  const notify = (type, msg) => setToast({ open: true, type, msg });
  const closeToast = (_, reason) => {
    if (reason === "clickaway") return;
    setToast((t) => ({ ...t, open: false }));
  };

  // Load courses
  React.useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/courses/`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setCourses(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  // Load my enrollments to hydrate button state
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // If your backend filters enrollments by request.user automatically, a simple GET works.
        // If not, expose an endpoint like /api/enrollments/?me=1 or /api/accounts/me/enrollments/
        const res = await fetchWithAuth(`${API_BASE}/enrollments/`, { method: "GET" });
        if (!res.ok) return;
        const data = await res.json();
        const set = new Set((Array.isArray(data) ? data : []).map((e) => e.course));
        if (mounted) setEnrolledIds(set);
      } catch {
        // ignore; user might not be logged in yet
      }
    })();
    return () => { mounted = false; };
  }, []);

  const source = (courses?.length ? courses : demoCourses).map((c, i) => ({
    ...c,
    color: c.color || ["#6EE7F9", "#A7F3D0", "#FDE68A", "#FCA5A5", "#C7D2FE"][i % 5],
    durationLabel: typeof c.duration_hours === "number" ? `${c.duration_hours}h` : (c.duration || "—"),
    rating: Number(c.rating ?? 0),
    progress: Number(c.progress ?? 0),
    level: c.level || "Beginner",
    instructor: c.instructor || "Instructor",
    title: c.title || "Untitled",
    description: c.description || "",
  }));

  const filtered = source.filter((c) => {
    const text = `${c.title} ${c.description} ${c.instructor}`.toLowerCase();
    const matchQ = q.trim() ? text.includes(q.trim().toLowerCase()) : true;
    const matchLevel = level === "All" ? true : c.level === level;
    return matchQ && matchLevel;
  });

  const enroll = async (courseId) => {
    setEnrolling((s) => ({ ...s, [courseId]: true }));
    // optimistic update
    setEnrolledIds((prev) => new Set([...prev, courseId]));
    try {
      const res = await fetchWithAuth(`${API_BASE}/enrollments/`, {
        method: "POST",
        body: JSON.stringify({ course: courseId }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${res.status}`);
      }
      notify("success", "Enrolled successfully");
    } catch (err) {
      // rollback optimistic change
      setEnrolledIds((prev) => {
        const n = new Set(prev);
        n.delete(courseId);
        return n;
      });
      notify("error", err.message || "Enrollment failed");
    } finally {
      setEnrolling((s) => ({ ...s, [courseId]: false }));
    }
  };

  return (
    <Box sx={{ maxWidth: 1240, mx: "auto", px: 2, py: 2 }}>
      <Box
        sx={{
          mb: 3,
          p: 2.25,
          borderRadius: 3,
          background: gradientBg,
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(16, 24, 40, 0.08)",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #5b9dfc 0%, #8b5cf6 60%, #ec4899 100%)",
            boxShadow: "0 10px 25px rgba(91, 157, 252, 0.35)",
            display: "grid",
            placeItems: "center",
            color: "#fff",
          }}
        >
          <SchoolTwoToneIcon fontSize="small" />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
            Discover Courses
          </Typography>
          <Typography sx={{ color: "#475467", fontSize: 13 }}>
            Curated tracks designed for growth, mastery, and delightful learning.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 320 }}>
          <TextField
            size="small"
            placeholder="Search courses"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 2, background: "rgba(255,255,255,0.9)" },
              minWidth: 200,
            }}
          />
          <ToggleButtonGroup
            size="small"
            exclusive
            value={level}
            onChange={(_, v) => v && setLevel(v)}
            sx={{
              "& .MuiToggleButton-root": { textTransform: "none", borderRadius: 2, px: 1.25 },
            }}
          >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Beginner">Beginner</ToggleButton>
            <ToggleButton value="Intermediate">Intermediate</ToggleButton>
            <ToggleButton value="Advanced">Advanced</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>

      {loading && (
        <Box sx={{ display: "grid", placeItems: "center", height: 240 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && error && <Alert severity="error">Failed to load courses: {error}</Alert>}

      {!loading && (
        <Grid container spacing={2.25}>
          {filtered.map((c) => {
            const isEnrolled = enrolledIds.has(c.id);
            return (
              <Grid item key={c.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 3,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.84) 100%)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 12px 26px rgba(17, 24, 39, 0.12), inset 0 0 0 1px rgba(255,255,255,0.4)",
                    transition: "transform 300ms cubic-bezier(.2,.8,.2,1), box-shadow 300ms",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 18px 36px rgba(17, 24, 39, 0.16), inset 0 0 0 1px rgba(255,255,255,0.6)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -36,
                      right: -36,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: c.color,
                      filter: "blur(32px)",
                      opacity: 0.6,
                    }}
                  />
                  <CardContent sx={{ pt: 2, pb: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Chip
                        size="small"
                        label={c.level}
                        sx={{
                          bgcolor: "rgba(17,24,39,.06)",
                          color: "#111827",
                          fontWeight: 600,
                          borderRadius: "10px",
                          height: 22,
                        }}
                      />
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <StarRoundedIcon sx={{ color: "#f59e0b" }} fontSize="small" />
                        <Typography variant="body2" sx={{ color: "#166534", fontWeight: 700, fontSize: 13 }}>
                          {Number(c.rating || 0).toFixed(1)}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2, color: "#0f172a", mb: 0.75 }}>
                      {c.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#475467", mb: 1.5 }}>
                      {c.description}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 1.5 }}>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <AccessTimeRoundedIcon sx={{ color: "#64748b" }} fontSize="small" />
                        <Typography variant="caption" sx={{ color: "#475467" }}>
                          {c.durationLabel}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <TrendingUpRoundedIcon sx={{ color: "#64748b" }} fontSize="small" />
                        <Typography variant="caption" sx={{ color: "#475467" }}>
                          {c.progress}% complete
                        </Typography>
                      </Stack>
                    </Stack>

                    <Tooltip title={`${c.progress}%`}>
                      <LinearProgress
                        variant="determinate"
                        value={Math.max(0, Math.min(100, c.progress))}
                        sx={{
                          height: 7,
                          borderRadius: 999,
                          bgcolor: "rgba(15,23,42,0.06)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 999,
                            background: "linear-gradient(90deg, #5b9dfc 0%, #8b5cf6 60%, #ec4899 100%)",
                          },
                        }}
                      />
                    </Tooltip>

                    <Stack direction="row" alignItems="center" spacing={1.1} sx={{ mt: 1.5 }}>
                      <Avatar sx={{ bgcolor: "#1e293b", width: 30, height: 30, fontSize: 12, color: "#fff" }}>
                        {String(c.instructor).split(" ").map((n) => n[0]).join("").slice(0, 2) || "I"}
                      </Avatar>
                      <Typography variant="caption" sx={{ color: "#334155", fontWeight: 600 }}>
                        {c.instructor}
                      </Typography>
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2, pt: 0.5, justifyContent: "space-between" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        borderColor: "rgba(15,23,42,0.15)",
                        color: "#0f172a",
                        "&:hover": { borderColor: "#0f172a", background: "rgba(15,23,42,0.04)" },
                      }}
                    >
                      Preview
                    </Button>

                    <Button
                      size="small"
                      variant={isEnrolled ? "outlined" : "contained"}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 1.5,
                        background: isEnrolled ? "transparent" : "linear-gradient(90deg, #5b9dfc 0%, #8b5cf6 60%, #ec4899 100%)",
                        boxShadow: isEnrolled ? "none" : "0 6px 18px rgba(91, 157, 252, 0.35)",
                        "&:hover": isEnrolled
                          ? { background: "rgba(15,23,42,0.04)" }
                          : { boxShadow: "0 10px 24px rgba(91, 157, 252, 0.45)" },
                      }}
                      disabled={isEnrolled || Boolean(enrolling[c.id])}
                      onClick={() => enroll(c.id)}
                    >
                      {isEnrolled ? "Enrolled" : (enrolling[c.id] ? "Enrolling…" : "Enroll")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          {!filtered.length && (
            <Grid item xs={12}>
              <Alert severity="info">No courses match the filters.</Alert>
            </Grid>
          )}
        </Grid>
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={closeToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert onClose={closeToast} elevation={6} variant="filled" severity={toast.type}>
          {toast.msg}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
