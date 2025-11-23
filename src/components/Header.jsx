import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header = ({ onToggleSidebar }) => {
  const location = useLocation();

  const pageNames = {
    '/': 'Dashboard',
    '/courses': 'Courses',
    '/chat': 'Chat',
    '/schedule': 'Schedule',
    '/profile': 'Profile',
    '/settings': 'Settings',
  };

  const currentPage = pageNames[location.pathname] || '';

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      {/* Left: Page title with icon */}
      <div
        onClick={onToggleSidebar}
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '2rem',
          fontWeight: '700',
          color: '#2d3748',
          gap: '0.8rem',
          cursor: 'pointer',
          userSelect: 'none',
          marginLeft: '-2rem',
          marginTop: '-0.3rem',
        }}
      >
        <DashboardIcon fontSize="large" style={{ color: '#ec1b29ff' }} />
        {currentPage}
      </div>
    </header>
  );
};

export default Header;
