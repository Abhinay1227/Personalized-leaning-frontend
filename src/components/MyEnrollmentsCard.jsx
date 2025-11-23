import React from "react";
import {
  Card, CardHeader, CardContent, Typography, Chip, Stack, Divider, List, ListItem, ListItemText, Box,
} from "@mui/material";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";

// Match backend base
const API_BASE = "http://localhost:8000/api";

// Auth helpers (inline for self-containment)
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
  } catch {
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

  token = await refreshAccessToken();
  if (!token) throw new Error("User must login again");
  const retryOpts = { ...opts, headers: { ...opts.headers, Authorization: `Bearer ${token}` } };
  res = await fetch(url, retryOpts);
  return res;
}

export default function MyEnrollmentsCard() {
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // EnrollmentViewSet returns nested course if you applied the serializer update
        const res = await fetchWithAuth(`${API_BASE}/enrollments/`, { method: "GET" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // normalize into { id, title, level, duration_hours }
        const normalized = (Array.isArray(data) ? data : []).map((e) => {
          const c = e.course || {};
          return {
            id: e.id,
            title: c.title || `Course #${c.id ?? "—"}`,
            level: c.level || "—",
            duration_hours: typeof c.duration_hours === "number" ? c.duration_hours : null,
          };
        });
        if (mounted) setItems(normalized);
      } catch (err) {
        if (mounted) setError(err.message);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const total = items.length;

  return (
    <Card
      sx={{
        borderRadius: 3,
        background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.84) 100%)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 12px 26px rgba(17, 24, 39, 0.12), inset 0 0 0 1px rgba(255,255,255,0.4)",
      }}
    >
      <CardHeader
        avatar={<SchoolTwoToneIcon color="primary" />}
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>My Enrollments</Typography>
            <Chip size="small" color="primary" label={total} />
          </Stack>
        }
        subheader="Your registered courses"
      />
      <Divider />
      <CardContent sx={{ pt: 1 }}>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}
        {!error && total === 0 && (
          <Typography variant="body2" sx={{ color: "#475467" }}>
            No enrollments yet.
          </Typography>
        )}
        {!error && total > 0 && (
          <Box sx={{ maxHeight: 260, overflowY: "auto", pr: 1 }}>
            <List dense disablePadding>
              {items.map((it) => (
                <ListItem key={it.id} sx={{ py: 0.6 }}>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                        {it.title}
                      </Typography>
                    }
                    secondary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip size="small" label={it.level} />
                        {typeof it.duration_hours === "number" && (
                          <Typography variant="caption" sx={{ color: "#475467" }}>
                            {it.duration_hours}h
                          </Typography>
                        )}
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
