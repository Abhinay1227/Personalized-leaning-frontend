// utils/auth.js

const API_BASE = "http://localhost:8000"; // unify host

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE}/api/accounts/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (!res.ok) throw new Error("Failed to refresh token");
    const data = await res.json();
    if (!data?.access) throw new Error("No access token returned");
    localStorage.setItem("accessToken", data.access);
    return data.access;
  } catch (error) {
    console.error("Token refresh failed", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
}

export async function fetchWithAuth(url, options = {}) {
  const opts = { ...options, headers: { Accept: "application/json", ...(options.headers || {}) } };
  let token = localStorage.getItem("accessToken");
  if (token) {
    opts.headers["Authorization"] = `Bearer ${token}`;
  }

  let res = await fetch(url, opts);
  if (res.status !== 401) return res;

  // Attempt refresh if 401
  token = await refreshAccessToken();
  if (!token) {
    // propagate 401 to caller with a friendly message
    const err = new Error("User must login again");
    err.status = 401;
    throw err;
  }
  const retryOpts = { ...opts, headers: { ...opts.headers, Authorization: `Bearer ${token}` } };
  res = await fetch(url, retryOpts);
  return res;
}
