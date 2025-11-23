import React from 'react';

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '24px',
  boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
  padding: '1.5rem 1.75rem',
  display: 'grid',
  gridTemplateColumns: 'minmax(260px, 1fr) minmax(260px, 1fr)',
  gap: '1.25rem',
  border: '1px solid rgba(148, 163, 184, 0.25)',
};

const toggleRow = (label, desc, checked = true) => (
  <div
    key={label}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: '0.75rem',
      alignItems: 'center',
    }}
  >
    <div>
      <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0f172a' }}>{label}</div>
      <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{desc}</div>
    </div>
    <div
      style={{
        width: 40,
        height: 22,
        borderRadius: 999,
        background: checked ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'rgba(148,163,184,0.6)',
        padding: 2,
        display: 'flex',
        justifyContent: checked ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        cursor: 'not-allowed',
        opacity: 0.9,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: '999px',
          background: 'white',
          boxShadow: '0 4px 8px rgba(15,23,42,0.25)',
        }}
      />
    </div>
  </div>
);

const Settings = () => {
  return (
    <div style={cardStyle}>
      {/* Left: general settings */}
      <div
        style={{
          borderRight: '1px solid rgba(226, 232, 240, 0.9)',
          paddingRight: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            General Settings
          </h3>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            These toggles are static for the demo, but show how personalisation will work.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {toggleRow('Email notifications', 'Receive progress reports and reminders in your inbox.')}
          {toggleRow(
            'Push notifications',
            'Get notified about upcoming sessions and deadlines.',
            true
          )}
          {toggleRow(
            'Weekly summary',
            'Every Sunday, get a summary of your learning analytics.',
            true
          )}
          {toggleRow('Dark mode', 'Sync with system theme preferences.', false)}
        </div>

        <div
          style={{
            marginTop: '0.6rem',
            fontSize: '0.78rem',
            color: '#6b7280',
          }}
        >
          In production, these settings will update user preferences in the backend.
        </div>
      </div>

      {/* Right: AI preferences */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
          AI Personalisation
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {toggleRow(
            'Use behaviour data',
            'Allow the AI to use your activity to optimise recommendations.',
            true
          )}
          {toggleRow(
            'Difficulty auto-adjust',
            'Automatically adapt question difficulty based on your performance.',
            true
          )}
          {toggleRow(
            'Explain reasoning',
            'Ask the AI tutor to show steps instead of just final answers.',
            true
          )}
        </div>

        <div style={{ marginTop: '0.4rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 4 }}>
            Preferred explanation style
          </div>
          <select
            value="detailed"
            readOnly
            style={{
              borderRadius: '999px',
              border: '1px solid rgba(148,163,184,0.6)',
              padding: '0.45rem 0.8rem',
              fontSize: '0.82rem',
              background: 'rgba(248,250,252,0.8)',
            }}
          >
            <option value="detailed">Detailed (step-by-step)</option>
            <option value="balanced">Balanced</option>
            <option value="concise">Concise</option>
          </select>
        </div>

        <div
          style={{
            marginTop: '0.7rem',
            fontSize: '0.78rem',
            color: '#6b7280',
            borderTop: '1px dashed rgba(226,232,240,0.9)',
            paddingTop: '0.6rem',
          }}
        >
          For the review you can mention: “These settings will control how our AI adapts to each
          learner: difficulty, notification frequency, and explanation style.”
        </div>
      </div>
    </div>
  );
};

export default Settings;
