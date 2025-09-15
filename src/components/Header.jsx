import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onToggleSidebar }) => {
  const location = useLocation();

  const pageNames = {
    '/dashboard': 'Dashboard',
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
        background: 'transparent', // 🚀 No white box
        boxShadow: 'none', // 🚀 No shadow
      }}
    >
      {/* Left: Dashboard title with icon */}
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
        }}
      >
        <MenuIcon fontSize="large" style={{ color: '#1976d2' }} />
        {currentPage}
      </div>

      {/* Right: (Optional) Search + Profile Avatar */}
      {/* You can add later if you want */}
    </header>
  );
};

export default Header;
