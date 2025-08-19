// src/components/Header.jsx
import React from 'react';

const Header = () => (
  <header style={{
    height: 64,
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px'
  }}>
    <div style={{ fontSize: 22, fontWeight: 'bold', color: '#212a33' }}>
      Learning Platform Dashboard
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
    
      <button title="Notifications">🔔</button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="/avatar.png" alt="profile" style={{ width: 32, borderRadius: '50%' }} />
        <span>John Doe</span>
      </div>
    </div>
  </header>
);

export default Header;
