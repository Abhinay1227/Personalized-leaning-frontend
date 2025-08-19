// src/components/DashboardLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => (
  <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
    <Header />
    <div style={{ display: 'flex', flex: 1 }}>
      <Sidebar />
      <main style={{ flex: 1, background: '#f9fafb', padding: '32px' }}>
        {children}
      </main>
    </div>
  </div>
);

export default DashboardLayout;
