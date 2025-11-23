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
};

const WeeklyActivityCard = () => {
  const activity = [
    { day: 'Mon', minutes: 42 },
    { day: 'Tue', minutes: 15 },
    { day: 'Wed', minutes: 55 },
    { day: 'Thu', minutes: 30 },
    { day: 'Fri', minutes: 70 },
    { day: 'Sat', minutes: 24 },
    { day: 'Sun', minutes: 0 },
  ];

  const maxMins = Math.max(...activity.map((a) => a.minutes), 1);

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            Weekly Activity
          </h3>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Time spent learning this week across all courses.
          </p>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.6rem',
            borderRadius: 999,
            background: 'rgba(248, 250, 252, 1)',
            color: '#475569',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start',
          }}
        >
          Total: 236 mins
        </span>
      </div>

      {/* Mini bar chart */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '0.6rem',
          marginTop: '0.8rem',
          minHeight: 120,
        }}
      >
        {activity.map((a) => (
          <div
            key={a.day}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              gap: '0.35rem',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 20,
                borderRadius: 999,
                background: 'rgba(226, 232, 240, 0.9)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: 90,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${(a.minutes / maxMins) * 100}%`,
                  borderRadius: 999,
                  background:
                    'linear-gradient(180deg, #3b82f6 0%, #6366f1 60%, #22c55e 100%)',
                  transition: 'height 0.3s ease',
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{a.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyActivityCard;
