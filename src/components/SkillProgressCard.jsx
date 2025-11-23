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

const barTrack = {
  width: '100%',
  height: 8,
  borderRadius: 999,
  background: 'rgba(226, 232, 240, 0.8)',
  overflow: 'hidden',
};

const SkillProgressCard = () => {
  const skills = [
    { name: 'Data Structures', level: 64, tag: 'Core subject' },
    { name: 'Algorithms', level: 52, tag: 'Needs more practice' },
    { name: 'Machine Learning Basics', level: 38, tag: 'Recently started' },
    { name: 'Python Programming', level: 81, tag: 'Strong' },
  ];

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            Skill-wise Progress
          </h3>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            AI groups your courses into skill buckets and tracks your mastery level.
          </p>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.6rem',
            borderRadius: 999,
            background: 'rgba(59, 130, 246, 0.08)',
            color: '#1d4ed8',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start',
          }}
        >
          Adaptive difficulty
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {skills.map((s) => (
          <div key={s.name}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                marginBottom: 4,
              }}
            >
              <span style={{ fontWeight: 500, color: '#0f172a' }}>{s.name}</span>
              <span style={{ color: '#64748b', fontWeight: 500 }}>{s.level}%</span>
            </div>
            <div style={barTrack}>
              <div
                style={{
                  width: `${s.level}%`,
                  height: '100%',
                  borderRadius: 999,
                  background:
                    'linear-gradient(90deg, #22c55e 0%, #22c55e 40%, #3b82f6 100%)',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{s.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProgressCard;
