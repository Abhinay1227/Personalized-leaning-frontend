import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import AdminIllustration from "./assets/Sign up-bro.svg"; // Use any admin/relevant SVG

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!username) {
      setErr("Please enter your username");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/accounts/admin/login-api/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), // changed to username
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/admin-dashboard"); // redirect to admin dashboard
      } else {
        setErr(data.error || "Login failed. Please check your credentials.");
      }
    } catch (e) {
      setErr("Network error, please try again later.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Left Panel */}
        <aside className="auth-side left">
          <div className="left-inner">
            <img src={AdminIllustration} alt="Admin Login" className="hero-ill fade-in" />
            <h3 className="slide-title">Admin Portal</h3>
            <p className="slide-text">Only authorized administrators may access this dashboard.</p>
          </div>
        </aside>

        {/* Right Panel */}
        <main className="auth-side right">
          <div className="right-inner">
            <div className="brand">LEARNIFY ADMIN</div>
            <h2 className="welcome">Admin Sign In</h2>

            <form className="form" onSubmit={submit} noValidate>
              <label className="label">Admin Username</label>
              <input
                className="input underline"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Enter admin username"
                required
              />

              <label className="label">Password</label>
              <input
                className="input underline"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter password"
                required
              />

              <div className="row between">
                <span />
                <button type="button" className="link subtle">
                  Forgot password?
                </button>
              </div>

              {err && <div className="form-error">{err}</div>}

              <button type="submit" className="btn primary">Sign In</button>
            </form>

            <p className="signup">
              Not an admin?{" "}
              <button
                className="link"
                type="button"
                onClick={() => navigate("/login")}
              >
                User Login
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
