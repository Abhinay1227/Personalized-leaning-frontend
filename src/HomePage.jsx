import React, { useEffect, useState, useRef } from 'react';
import './HomePage.css';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from "react-router-dom";

// SVG Imports
import LearningAmio from './assets/Learning-amico.svg';
import { ReactComponent as HappyStudentBro } from './assets/Happy student-bro.svg';
import { ReactComponent as CustomerFeedbackSVG } from './assets/Customer feedback-amico (1).svg';

function HomePage() {
  const bgColors = [
    "#fff7b2",
    "#aeefff",
    "#ffb4e6",
    "#bcffb2"
  ];

  const navigate = useNavigate();

  const feedbacks = [
    { quote: "This platform helped me improve my coding skills!", author: "John D.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { quote: "The real-time analysis feature is a game changer.", author: "Sarah W.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { quote: "Easy to use and very effective for learning.", author: "Alex T.", avatar: "https://randomuser.me/api/portraits/men/65.jpg" },
    { quote: "Learnify adapts perfectly to my pace.", author: "Priya S.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
  ];

  const [current, setCurrent] = useState(0);
  const [darkTheme, setDarkTheme] = useState(false);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { ref: textRef, inView: textInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  // Real counts from API
  const [counts, setCounts] = useState({ students: 0, quizzes: 85, modules: 25 });
  // Animated counts for display
  const [animatedCounts, setAnimatedCounts] = useState({ students: 0, quizzes: 85, modules: 25 });
  // Ref to ensure animation runs once
  const hasAnimated = useRef(false);

  // Fetch real student count on mount
  useEffect(() => {
    async function fetchStudentCount() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/analytics/students/', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch student count');
        const data = await res.json();
        console.log("Student count API response:", data);
        setCounts(prev => ({
          students: data.students,
          quizzes: prev.quizzes,
          modules: prev.modules,
        }));
      } catch (error) {
        console.error('Error fetching student count:', error);
      }
    }
    fetchStudentCount();
  }, []);

  useEffect(() => {
  // If not animating, sync immediately
  if (!inView) {
    setAnimatedCounts(counts);
  }
}, [counts, inView]);


  // Animate counters when in view or counts change
  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2500; // animation duration in ms
    const frameRate = 60;  // frames per second
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const { students, quizzes, modules } = counts;

    function step() {
      frame++;
      setAnimatedCounts({
        students: Math.min(Math.round((students / totalFrames) * frame), students),
        quizzes: Math.min(Math.round((quizzes / totalFrames) * frame), quizzes),
        modules: Math.min(Math.round((modules / totalFrames) * frame), modules),
      });
      if (frame < totalFrames) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [inView, counts]);
  // Fallback: If not animating, always sync animatedCounts to real counts
useEffect(() => {
  if (!inView) {
    setAnimatedCounts(counts);
  }
}, [counts, inView]);


  // Slider autoplay effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % feedbacks.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [current, feedbacks.length]);

  return (
    <div className={`homepage-illustration${darkTheme ? ' dark-theme' : ''}`}>
      <nav className="main-nav">
        <div className="logo">Learnify</div>
        <ul className="nav-links">
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#feature3" className="nav-link">Testimonials</a></li>
          <li><button className="contact-btn">Contact Us</button></li>
          <li>
            <button
              className="theme-toggle-btn"
              onClick={() => setDarkTheme(d => !d)}
              title={darkTheme ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 22,
                cursor: 'pointer',
                marginLeft: 14,
                color: darkTheme ? '#5ac3fa' : '#2263b3'
              }}
            >
              {darkTheme ? "🌙" : "☀️"}
            </button>
          </li>
        </ul>
      </nav>

      <section id="hero" className="hero-illustration">
        <div className="hero-text">
          <h1>
            <span className="focus">Personalized</span> Learning <br />
            <span style={{ color: '#2263b3' }}>For Every Student</span>
          </h1>
          <p>
            Discover interactive quizzes, assignments,
            <br />
            Personalized Dashboard and real-time analytics – all at your fingertips.
          </p>
          <button className="explore-cta" onClick={() => navigate("/login")}>Explore Now</button>
        </div>
        <div className="hero-img-area">
          <img src={LearningAmio} alt="Education illustration" style={{ width: 420, height: 'auto', maxWidth: '100%' }} />
        </div>
      </section>

      <section id="features">
        <div className="feature-row left-img">
          <div className="feature-img">
            <HappyStudentBro className="feature-svg" />
          </div>
          <div className="feature-context" ref={ref}>
            <h3>Adaptive Learning Paths</h3>
            <p>Personalized lessons and quizzes based on your progress.</p>
            <div className="counters-premium">
              <div className="premium-counter-card accent-blue">
                <div className="premium-counter-icon">
                  <svg width="36" height="36" fill="none">
                    <path
                      d="M18 20c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm0 2c-5.523 0-10 4.477-10 10h2a8 8 0 0116 0h2c0-5.523-4.477-10-10-10z"
                      fill="#2263b3"
                    />
                  </svg>
                </div>
                <div className="premium-counter-number">{animatedCounts.students}</div>
                <div className="premium-counter-label">Students</div>
              </div>
              <div className="premium-counter-card accent-green">
                <div className="premium-counter-icon">
                  <svg width="36" height="36" fill="none">
                    <path
                      d="M2 17.25V21h3.75l11.06-11.06-3.75-3.75L2 17.25zM21.41 6.34a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                      fill="#23b370"
                    />
                  </svg>
                </div>
                <div className="premium-counter-number">{animatedCounts.quizzes}</div>
                <div className="premium-counter-label">Quizzes</div>
              </div>
              <div className="premium-counter-card accent-yellow">
                <div className="premium-counter-icon">
                  <svg width="36" height="36" fill="none">
                    <path
                      d="M4 6a2 2 0 012-2h14a2 2 0 012 2v16a1 1 0 01-1.447.894L16 21.118l-4.553 1.776A1 1 0 0110 22V6z"
                      fill="#d6ab0f"
                    />
                  </svg>
                </div>
                <div className="premium-counter-number">{animatedCounts.modules}</div>
                <div className="premium-counter-label">Modules</div>
              </div>
            </div>

            <p ref={textRef} className={`below-counters-text ${textInView ? 'visible' : ''}`}>
              Our intelligent system analyzes your progress and performance to recommend lessons and quizzes that match your unique needs and learning pace.
            </p>
          </div>
        </div>
      </section>

      <section id="feature3">
        <div className="feature-row right-img">
          <div className="feature-context">
            <h3>Customer Feedback</h3>
            <p>Hear directly from our learners about how Learnify transforms their experience.</p>
            <div className="feedback-slider">
              <div className="feedback-card" style={{ background: bgColors[current] }}>
                <img src={feedbacks[current].avatar} alt={feedbacks[current].author} className="feedback-avatar" />
                <p>"{feedbacks[current].quote}"</p>
                <span>- {feedbacks[current].author}</span>
              </div>
              <div className="slider-dots">
                {feedbacks.map((_, idx) => (
                  <span key={idx} className={`dot ${current === idx ? 'active' : ''}`} onClick={() => setCurrent(idx)} />
                ))}
              </div>
            </div>
          </div>
          <div className="feature-img">
            <CustomerFeedbackSVG className="feature-svg" />
          </div>
        </div>
      </section>

      <section id="about" style={{ background: '#f8fbff', padding: 40, textAlign: 'center' }}>
        <h2>About Learnify</h2>
        <p style={{ maxWidth: 480, margin: '0 auto', color: '#375576' }}>
          Learnify is dedicated to making education engaging and effective, offering personalized paths and collaborative tools to learners everywhere.
        </p>
      </section>

      <footer className="homepage-footer">
        <div>&copy; 2025 Learnify | Built with ❤️</div>
      </footer>
    </div>
  );
}

export default HomePage;
