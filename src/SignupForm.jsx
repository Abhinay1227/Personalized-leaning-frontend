import React, { useEffect, useRef, useState } from "react";
import "./SignupForm.css";
import { Link } from "react-router-dom";

import Illustration from "./assets/Mobile login-pana.svg";
import Slide1 from "./assets/Queue-amico.svg";
import Slide2 from "./assets/Sign up-bro.svg";
import Analytics from "./assets/Filing system-bro.svg";

export default function SignupForm() {
  // Form states
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [err, setErr] = useState("");

  const validateEmail = (v) => /\S+@\S+\.\S+/.test(v);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!username.trim()) return setErr("Please enter your username.");
    if (!firstName.trim()) return setErr("Please enter your first name.");
    if (!lastName.trim()) return setErr("Please enter your last name.");
    if (!validateEmail(email)) return setErr("Enter a valid email.");
    if (password.length < 6) return setErr("Password must be at least 6 characters.");
    if (password !== confirm) return setErr("Passwords do not match.");
    if (!agree) return setErr("Please accept the Terms & Privacy Policy.");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          password2: confirm,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        window.location.href = "/login";
      } else {
        setErr(JSON.stringify(data));
      }
    } catch (error) {
      setErr("Something went wrong. Try again.");
      console.error(error);
    }
  };

  // Left slider (same UX as before)
  const slides = [
    {
      title: "Create Your Account",
      text: "Start learning with personalized recommendations.",
      img: Slide2,
    },
    {
      title: "Distance Learning Programs",
      text: "Attend live and recorded classes at your convenience.",
      img: Illustration,
    },
    {
      title: "Real-time Analytics",
      text: "Track your progress and stay motivated with insights.",
      img: Analytics,
    },
    {
      title: "Adaptive Paths",
      text: "Dynamic plans adjust to your goals and pace.",
      img: Slide1,
    },
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
    <div className="auth-page signup-bg">
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

        {/* Right half (signup form) */}
        <main className="auth-side right">
          <div className="right-inner">
            <div className="brand">LEARNIFY</div>
            <h2 className="welcome">Create your account</h2>

            <form className="form" onSubmit={submit} noValidate>
              <label className="label">Username</label>
              <input
                className="input underline"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                required
              />

              <label className="label">First Name</label>
              <input
                className="input underline"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                autoComplete="given-name"
                required
              />

              <label className="label">Last Name</label>
              <input
                className="input underline"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                autoComplete="family-name"
                required
              />

              <label className="label">Email</label>
              <input
                className="input underline"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />

              <label className="label">Password</label>
              <div className="input-wrap">
                <input
                  className="input underline"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="eye"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  onClick={() => setShowPwd((v) => !v)}
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>

              <label className="label">Confirm password</label>
              <div className="input-wrap">
                <input
                  className="input underline"
                  type={showCPwd ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="eye"
                  aria-label={showCPwd ? "Hide password" : "Show password"}
                  onClick={() => setShowCPwd((v) => !v)}
                >
                  {showCPwd ? "🙈" : "👁️"}
                </button>
              </div>

              <label className="agree">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>
                  I agree to the <button type="button" className="link">Terms</button> and{" "}
                  <button type="button" className="link">Privacy Policy</button>.
                </span>
              </label>

              {err && <div className="form-error">{err}</div>}

              <button type="submit" className="btn primary">Create Account</button>
            </form>

            <p className="signup">
              Already have an account? <Link className="link" to="/login">Sign In</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
