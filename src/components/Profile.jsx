import React from 'react';

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '24px',
  boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
  padding: '1.5rem 1.75rem',
  display: 'grid',
  gridTemplateColumns: 'minmax(260px, 320px) 1fr',
  gap: '1.5rem',
  border: '1px solid rgba(148, 163, 184, 0.25)',
};

const Profile = () => {
  return (
    <div style={cardStyle}>
      {/* Left: basic info */}
      <div
        style={{
          borderRight: '1px solid rgba(226, 232, 240, 0.9)',
          paddingRight: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '0.9rem',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '999px',
              background:
                'linear-gradient(135deg, #3b82f6 0%, #22c55e 50%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.2rem',
              boxShadow: '0 10px 25px rgba(37, 99, 235, 0.5)',
            }}
          >
            A
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
              Demo Student
            </h3>
            <p style={{ margin: '0.15rem 0', fontSize: '0.8rem', color: '#6b7280' }}>
              B.Tech CSE • 3rd Year
            </p>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 999,
                background: 'rgba(34,197,94,0.08)',
                color: '#15803d',
                fontWeight: 500,
              }}
            >
              Personalised track active
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '0.6rem',
          }}
        >
          {[
            { label: 'Courses enrolled', value: 6 },
            { label: 'Average score', value: '82%' },
            { label: 'Learning streak', value: '5 days' },
            { label: 'Total study time', value: '18.4 hrs' },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                borderRadius: '16px',
                padding: '0.55rem 0.7rem',
                background: 'rgba(248, 250, 252, 0.9)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#0f172a',
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div
            style={{
              fontSize: '0.8rem',
              color: '#6b7280',
              marginBottom: 4,
            }}
          >
            Interests
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['Machine Learning', 'Backend Dev', 'Competitive Programming', 'System Design'].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 999,
                    background: 'rgba(239,246,255,1)',
                    color: '#1d4ed8',
                    border: '1px solid rgba(191, 219, 254, 1)',
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right: editable-looking fields (dummy) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 700, color: '#0f172a' }}>
          Profile Details
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.8rem',
          }}
        >
          {[
            { label: 'Full name', value: 'Demo Student' },
            { label: 'Email', value: 'demo.student@example.com' },
            { label: 'University ID', value: 'CSE-2023-001' },
            { label: 'Preferred study time', value: '7:00 PM – 10:00 PM' },
          ].map((f) => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>{f.label}</span>
              <input
                value={f.value}
                readOnly
                style={{
                  borderRadius: '999px',
                  border: '1px solid rgba(148,163,184,0.6)',
                  padding: '0.5rem 0.8rem',
                  fontSize: '0.82rem',
                  background: 'rgba(248,250,252,0.8)',
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '0.4rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>Learning goal</span>
          <textarea
            value="Crack product-based company interviews with strong foundations in DSA, System Design, and Machine Learning."
            readOnly
            rows={3}
            style={{
              marginTop: '0.25rem',
              width: '100%',
              borderRadius: '18px',
              border: '1px solid rgba(148,163,184,0.6)',
              padding: '0.6rem 0.8rem',
              fontSize: '0.82rem',
              resize: 'none',
              background: 'rgba(248,250,252,0.8)',
            }}
          />
        </div>

        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '0.78rem',
            color: '#6b7280',
          }}
        >
          In the actual system, this section will be editable and synced with the student profile API.
        </div>
      </div>
    </div>
  );
};

export default Profile;
