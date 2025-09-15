import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'Courses', icon: <SchoolIcon /> },
  { label: 'Chat', icon: <ChatIcon /> },
  { label: 'Schedule', icon: <EventIcon /> },
  { label: 'Profile', icon: <PersonIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

const activeNav = 'Dashboard';

const Sidebar = ({ mode }) => {
  const isMini = mode === 'mini';

  // All icons and text set to white for visibility
  const iconColor = '#ffffff';
  const textColor = '#ffffff';

  return (
    <aside
      style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #1b408bff 0%, #b93d3d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMini ? 'center' : 'flex-start',
        padding: isMini ? '1rem 0.25rem' : '1rem',
        boxShadow: '2px 0 12px rgba(135, 0, 0, 0.08)',
        borderTopRightRadius: '32px',
        borderBottomRightRadius: '32px',
      }}
    >
      {/* Logo & App Name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMini ? 'center' : 'flex-start',
          gap: isMini ? '0' : '0.5rem',
          fontWeight: 'bold',
          fontSize: isMini ? '1.2rem' : '1.5rem',
          marginBottom: '2rem',
          color: textColor,
          letterSpacing: '1px',
          width: '100%',
          textAlign: isMini ? 'center' : 'left',
        }}
      >
        <img
          src="/logo192.png"
          alt="Learnify Logo"
          style={{ width: isMini ? '32px' : '36px', height: isMini ? '32px' : '36px' }}
        />
        {!isMini && <span>Learnify</span>}
      </div>

      {/* Navigation */}
      <nav style={{ flexGrow: 1, width: '100%' }}>
        {navItems.map(({ label, icon }) => {
          const isActive = activeNav === label;
          return (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMini ? 'center' : 'flex-start',
                padding: isMini ? '0.65rem 0' : '0.75rem 1rem',
                cursor: 'pointer',
                fontWeight: isActive ? 700 : 600,
                borderTopRightRadius: '16px',
                borderBottomRightRadius: '16px',
                borderTopLeftRadius: '0px',
                borderBottomLeftRadius: '0px',
                marginBottom: '0.5rem',
                color: textColor,
                background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                boxShadow: isActive ? '0 2px 8px rgba(255, 255, 255, 0.25)' : 'none',
                transition: 'all 0.2s linear',
                width: '100%',
              }}
            >
              <span
                style={{
                  marginRight: isMini ? '0' : '1rem',
                  color: iconColor,
                  fontSize: isMini ? '1.6rem' : '1.4rem',
                  display: 'flex',
                }}
              >
                {React.cloneElement(icon, {
                  style: { color: iconColor },
                })}
              </span>
              {!isMini && <span style={{ color: textColor }}>{label}</span>}
            </div>
          );
        })}
      </nav>

      {/* Upgrade button removed */}
    </aside>
  );
};

export default Sidebar;
