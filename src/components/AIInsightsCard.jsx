import React from 'react';

const cardStyle = {
  background: 'linear-gradient(135deg, #0f172a 0%, #020617 45%, #1e293b 100%)',
  borderRadius: '24px',
  boxShadow: '0 18px 45px rgba(15, 23, 42, 0.6)',
  padding: '1.5rem 1.75rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.9rem',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
};

const AIInsightsCard = () => {
  const insights = [
    'You learn fastest in 20–30 minute sessions. Try to keep sessions short but frequent.',
    'Accuracy in &quot;Algorithms&quot; drops when you attempt more than 8 questions in a row.',
    'You retain more when you revise within 24 hours of finishing a topic.',
  ];

  const actions = [
    'Schedule 2 short revision sessions for “Data Structures” today.',
    'Attempt 5 mixed-difficulty questions in “Algorithms”.',
    'Review your summary notes from yesterday’s Python session.',
  ];

  return (
    <div style={cardStyle}>
      {/* glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-40%',
          background:
            'radial-gradient(circle at 10% 0%, rgba(59,130,246,0.35) 0, transparent 55%), radial-gradient(circle at 90% 90%, rgba(52,211,153,0.35) 0, transparent 55%)',
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            padding: '0.2rem 0.65rem',
            borderRadius: 999,
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(148, 163, 184, 0.35)',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '999px',
              background:
                'radial-gradient(circle at 30% 30%, #22c55e 0%, #22c55e 40%, transparent 100%)',
              boxShadow: '0 0 12px rgba(34,197,94,0.9)',
            }}
          />
          AI-generated insights (demo)
        </div>

        <h3
          style={{
            margin: '0.5rem 0 0.35rem',
            fontSize: '1.05rem',
            fontWeight: 700,
            letterSpacing: '0.01em',
          }}
        >
          How the AI thinks you learn best
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: '0.8rem',
            color: 'rgba(226,232,240,0.85)',
          }}
        >
          These insights are generated from dummy data now, but in production they&apos;ll update in
          real time as the student interacts with the platform.
        </p>

        <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {insights.map((text, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '0.5rem',
                fontSize: '0.78rem',
                color: 'rgba(226,232,240,0.95)',
              }}
            >
              <span
                style={{
                  marginTop: 3,
                  width: 4,
                  height: 4,
                  borderRadius: 999,
                  background: 'rgba(148, 163, 184, 0.9)',
                  flexShrink: 0,
                }}
              />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '1rem',
            paddingTop: '0.8rem',
            borderTop: '1px dashed rgba(148, 163, 184, 0.45)',
          }}
        >
          <span
            style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(148, 163, 184, 0.95)',
              fontWeight: 600,
            }}
          >
            Suggested next actions
          </span>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0.45rem 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              fontSize: '0.78rem',
            }}
          >
            {actions.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.4rem' }}>
                <span>•</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsCard;
