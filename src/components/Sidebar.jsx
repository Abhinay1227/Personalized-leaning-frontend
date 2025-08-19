// src/components/Sidebar.jsx
import React from 'react';

const navItems = [
  { label: 'Overview', route: '/overview', icon: '🏠' },
  { label: 'Progress', route: '/progress', icon: '📈' },
  { label: 'Recommendations', route: '/recommend', icon: '💡' },
  { label: 'Analytics', route: '/analytics', icon: '🔬' },
  { label: 'Performance', route: '/performance', icon: '🥇' },
  { label: 'Collaboration', route: '/collab', icon: '👥' },
  { label: 'Notifications', route: '/notify', icon: '🔔' },
  { label: 'Settings', route: '/settings', icon: '⚙️' },
];

const Sidebar = () => (
  <nav style={{
    width: 220,
    background: '#212a33',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0'
  }}>
    {navItems.map(item => (
      <a
        key={item.label}
        href={item.route}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 32px',
          fontWeight: '500',
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <span style={{ marginRight: 12 }}>{item.icon}</span>
        {item.label}
      </a>
    ))}
  </nav>
);

export default Sidebar;
