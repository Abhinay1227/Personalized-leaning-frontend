import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CalendarCard from '../components/CalendarCard';
import StudentGreetingCard from '../components/StudentGreetingCard'; // Import your greeting card
import { IconButton } from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';

const SIDEBAR_WIDTH = 240;
const MINI_SIDEBAR_WIDTH = 64;
const RIGHT_SIDEBAR_WIDTH = 320;

const Dashboard = () => {
  const [sidebarMode, setSidebarMode] = useState('full');
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  
  const toggleSidebar = () =>
    setSidebarMode((prev) => (prev === 'full' ? 'mini' : 'full'));
    
  const toggleRightSidebar = () =>
    setRightSidebarOpen((prev) => !prev);
  
  const sidebarWidth = sidebarMode === 'full' ? SIDEBAR_WIDTH : MINI_SIDEBAR_WIDTH;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f6f9 0%, #d6f5ec 100%)',
        position: 'relative',
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          zIndex: 102,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          borderTopRightRadius: '32px',
          borderBottomRightRadius: '32px',
        }}
      >
        <Sidebar mode={sidebarMode} />
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ padding: '2rem' }}>
          <Header onToggleSidebar={toggleSidebar} />
        </div>

        {/* Student Greeting Card below Header */}
        <div style={{ padding: '0 2rem 2rem 2rem' }}>
          <StudentGreetingCard />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '0 2rem 2rem 2rem' }}>
          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              marginBottom: '2rem',
            }}
          >
            Dashboard Widgets Coming Soon...
          </div>
        </div>
      </div>

      {/* Right Sidebar Toggle Button */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          right: rightSidebarOpen ? `${RIGHT_SIDEBAR_WIDTH - 20}px` : '10px',
          transform: 'translateY(-50%)',
          zIndex: 200,
          transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <IconButton
          onClick={toggleRightSidebar}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            width: 40,
            height: 40,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {rightSidebarOpen ? (
            <ChevronRight sx={{ color: '#870000' }} />
          ) : (
            <ChevronLeft sx={{ color: '#870000' }} />
          )}
        </IconButton>
      </div>

      {/* Right Sidebar */}
      <div
        style={{
          width: rightSidebarOpen ? RIGHT_SIDEBAR_WIDTH : 0,
          minWidth: rightSidebarOpen ? RIGHT_SIDEBAR_WIDTH : 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          borderTopLeftRadius: '32px',
          borderBottomLeftRadius: '32px',
          boxShadow: rightSidebarOpen ? '-2px 0 20px rgba(32,32,72,0.08)' : 'none',
          padding: rightSidebarOpen ? '2rem 1.2rem' : '0',
          zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {rightSidebarOpen && <CalendarCard />}
      </div>
    </div>
  );
};

export default Dashboard;
