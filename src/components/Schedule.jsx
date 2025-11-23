import React from 'react';

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '24px',
  boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
  padding: '1.5rem 1.75rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  border: '1px solid rgba(148, 163, 184, 0.25)',
  minHeight: '380px',
};

const badgeStyle = {
  fontSize: '0.75rem',
  padding: '0.2rem 0.55rem',
  borderRadius: 999,
  background: 'rgba(59,130,246,0.06)',
  color: '#1d4ed8',
  fontWeight: 500,
};

const Schedule = () => {
  const today = 'Thursday';

  const sessions = [
    {
      time: '07:30 – 08:00 PM',
      title: 'DSA • Recursion Revision',
      type: 'Practice set',
      tag: 'High priority',
    },
    {
      time: '08:15 – 09:00 PM',
      title: 'Machine Learning • Linear Regression',
      type: 'Video + quiz',
      tag: 'Concept building',
    },
    {
      time: 'Tomorrow • 06:30 PM',
      title: 'Mentor Check-in • Sprint Review',
      type: '1:1 Call',
      tag: 'Review',
    },
    {
      time: 'Saturday • 10:00 AM',
      title: 'Weekly Progress Summary',
      type: 'AI generated report',
      tag: 'Analytics',
    },
  ];

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '0.75rem',
          alignItems: 'center',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            Learning Schedule
          </h3>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Your upcoming sessions are generated from dummy data for the demo.
          </p>
        </div>
        <span style={badgeStyle}>Today: {today}</span>
      </div>

      <div
        style={{
          marginTop: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
        }}
      >
        {sessions.map((s, i) => (
          <div
            key={i}
            style={{
              borderRadius: '18px',
              padding: '0.75rem 0.9rem',
              background:
                i === 0
                  ? 'linear-gradient(135deg, #ecfeff 0%, #eff6ff 50%, #eef2ff 100%)'
                  : 'rgba(248, 250, 252, 0.95)',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                color: '#64748b',
                fontWeight: 500,
              }}
            >
              {s.time}
            </span>
            <span
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#0f172a',
              }}
            >
              {s.title}
            </span>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
              <span
                style={{
                  fontSize: '0.78rem',
                  color: '#6b7280',
                }}
              >
                {s.type}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.55rem',
                  borderRadius: 999,
                  background: 'rgba(34,197,94,0.08)',
                  color: '#15803d',
                  fontWeight: 500,
                }}
              >
                {s.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '0.9rem',
          fontSize: '0.78rem',
          color: '#6b7280',
          borderTop: '1px dashed rgba(226, 232, 240, 0.9)',
          paddingTop: '0.6rem',
        }}
      >
        In production, this will sync with calendar events, deadlines, and AI-generated study slots.
      </div>
    </div>
  );
};

export default Schedule;
