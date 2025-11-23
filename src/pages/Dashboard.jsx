import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StudentGreetingCard from '../components/StudentGreetingCard';
import CalendarCard from '../components/CalendarCard';
import StudentProfileCard from '../components/StudentProfileCard';
import StudentProfileModal from '../components/StudentProfileModal';
import Courses from '../components/courses/Courses';
import MyEnrollmentsCard from '../components/MyEnrollmentsCard';
import { IconButton } from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import LearningAnalyticsOverview from '../components/LearningAnalyticsOverview';
import SkillProgressCard from '../components/SkillProgressCard';
import WeeklyActivityCard from '../components/WeeklyActivityCard';
import AIInsightsCard from '../components/AIInsightsCard';
import Chat from '../components/Chat';
import Schedule from '../components/Schedule';
import Profile from '../components/Profile';
import Settings from '../components/Settings';

const SIDEBAR_WIDTH = 240;
const MINI_SIDEBAR_WIDTH = 64;
const RIGHT_SIDEBAR_WIDTH = 320;

const Dashboard = () => {
  const [sidebarMode, setSidebarMode] = useState('full');
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');

  const toggleSidebar = () => setSidebarMode((prev) => (prev === 'full' ? 'mini' : 'full'));
  const toggleRightSidebar = () => setRightSidebarOpen((prev) => !prev);

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
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
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
        <Sidebar
          mode={sidebarMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* Main Content Area */}
      <div
        style={{
          marginLeft: sidebarWidth,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          padding: '2rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <Header onToggleSidebar={toggleSidebar} activeSection={activeSection} />
          {activeSection === 'Dashboard' && <StudentGreetingCard />}
        </div>

        <div style={{ flex: 1, marginTop: '2rem' }}>
          {activeSection === 'Dashboard' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
                alignItems: 'stretch',
              }}
            >
              <MyEnrollmentsCard />
              <LearningAnalyticsOverview />
              <SkillProgressCard />
              <WeeklyActivityCard />
              <AIInsightsCard />
            </div>
          )}

          {activeSection === 'Courses' && <Courses />}
          {activeSection === 'Chat' && <Chat />}
          {activeSection === 'Schedule' && <Schedule />}
          {activeSection === 'Profile' && <Profile />}
          {activeSection === 'Settings' && <Settings />}
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
        {rightSidebarOpen && (
          <>
            <StudentProfileCard onClick={() => setProfileModalOpen(true)} />
            <CalendarCard />
            <StudentProfileModal
              open={profileModalOpen}
              onClose={() => setProfileModalOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
