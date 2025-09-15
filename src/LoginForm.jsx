import React, { useEffect, useRef, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

import Illustration from "./assets/Mobile login-pana.svg";
import Slide1 from "./assets/Queue-amico.svg";
import Slide2 from "./assets/Sign up-bro.svg";
import Analytics from "./assets/Filing system-bro.svg";

export default function LoginForm() {
  const navigate = useNavigate();

  // Change state from email to username
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send username and password as credentials
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("Login response:", res.status, data);

      if (res.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        navigate("/dashboard");
      } else {
        setErr(data.detail || data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setErr("Something went wrong");
    }
  };

  // Slides unchanged
  const slides = [
    { title: "Distance Learning Programs", text: "Attend live and recorded classes at your own convenience.", img: Illustration },
    { title: "Adaptive Learning Paths", text: "Personalized recommendations based on progress, strengths, and pace.", img: Slide1 },
    { title: "Real-time Analytics", text: "Track performance with insightful dashboards and weekly reports.", img: Slide2 },
    { title: "Peer Collaboration", text: "Discuss, share notes, and learn together with built‑in rooms.", img: Analytics },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const intervalMs = 4000;

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, intervalMs);
    return () => clearTimeout(timerRef.current);
  }, [currentSlide, paused, slides.length]);

  const goto = (i) => {
    clearTimeout(timerRef.current);
    setCurrentSlide(i);
  };

  const touchStartX = useRef(null);
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx > threshold) goto((currentSlide - 1 + slides.length) % slides.length);
    else if (dx < -threshold) goto((currentSlide + 1) % slides.length);
    setPaused(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Left half (slider) */}
        <aside
          className="auth-side left"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="left-inner">
            <img
              src={slides[currentSlide].img}
              alt={slides[currentSlide].title}
              className="hero-ill fade-in"
              key={currentSlide}
            />
            <h3 className="slide-title">{slides[currentSlide].title}</h3>
            <p className="slide-text">{slides[currentSlide].text}</p>

            <div className="pager" role="tablist" aria-label="Feature slides">
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={currentSlide === i}
                  aria-label={`Slide ${i + 1}`}
                  className={`dot ${currentSlide === i ? "active" : ""}`}
                  onClick={() => goto(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") goto(i);
                  }}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Right half (form) */}
        <main className="auth-side right">
          <div className="right-inner">
            <div className="brand">LEARNIFY</div>
            <h2 className="welcome">Welcome to Learnify</h2>

            <form className="form" onSubmit={submit} noValidate>
              <label className="label" htmlFor="username">Username</label> {/* Changed to username */}
              <input
                id="username"
                className="input underline"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Enter your username"
                required
              />

              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                className="input underline"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />

              <div className="row between">
                <span />
                <button type="button" className="link subtle">Forgot password?</button>
              </div>

              {err && <div className="form-error">{err}</div>}

              <button type="submit" className="btn primary">Sign In</button>
            </form>

            <p className="signup">
              Are you new?{" "}
              <button
                className="link"
                type="button"
                onClick={() => navigate("/signup")}
              >
                Create an Account
              </button>
            </p>
            <p className="signup">
              Are you an admin?{" "}
              <button
                className="link"
                type="button"
                onClick={() => navigate("/admin-login")}
              >
                Admin Login
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
