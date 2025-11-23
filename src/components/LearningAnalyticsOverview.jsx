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

const pillStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.75rem',
  padding: '0.25rem 0.75rem',
  borderRadius: '999px',
  background: 'rgba(34, 197, 94, 0.08)',
  color: '#15803d',
  fontWeight: 500,
};

const metricBox = {
  background: 'linear-gradient(135deg, #eff6ff 0%, #ecfeff 50%, #eef2ff 100%)',
  borderRadius: '18px',
  padding: '0.9rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
};

const labelStyle = {
  fontSize: '0.8rem',
  color: '#64748b',
};

const valueStyle = {
  fontSize: '1.4rem',
  fontWeight: 700,
  color: '#0f172a',
};

const trendPositive = {
  fontSize: '0.75rem',
  fontWeight: 500,
  color: '#16a34a',
};

const LearningAnalyticsOverview = () => {
  const metrics = [
    { label: 'Overall mastery', value: '78%', trend: '+6% vs last week' },
    { label: 'Active learning streak', value: '5 days', trend: 'On track' },
    { label: 'Avg. session length', value: '32 mins', trend: '+8 mins' },
  ];

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
            Learning Analytics Overview
          </h3>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Snapshot of how you&apos;re performing across all enrolled courses.
          </p>
        </div>
        <span style={pillStyle}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '999px',
              background:
                'radial-gradient(circle at 30% 30%, #22c55e 0%, #16a34a 60%, #15803d 100%)',
            }}
          />
          Real-time (dummy)
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.8rem',
          marginTop: '0.25rem',
        }}
      >
        {metrics.map((m) => (
          <div key={m.label} style={metricBox}>
            <span style={labelStyle}>{m.label}</span>
            <span style={valueStyle}>{m.value}</span>
            <span style={trendPositive}>{m.trend}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningAnalyticsOverview;
