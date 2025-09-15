import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { fetchWithAuth } from '../utils/auth';
import greetingImg from '../assets/greeting.png'; // Make sure the path matches your folder structure

const StudentGreetingCard = () => {
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await fetchWithAuth('http://127.0.0.1:8000/api/accounts/me/', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        setStudentName(data.username || data.name || 'Student');
      } catch (err) {
        setStudentName('Student');
      }
    }
    getUserData();
  }, []);

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        mb: 4,
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #ffe6f0 0%, #ffb3c6 100%)',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        boxShadow: '0 12px 36px rgba(255, 105, 180, 0.3)',
      }}
    >
      <Box sx={{ flex: '1 1 auto' }}>
        <Typography variant="h4" fontWeight={900} color="#d81e5b" gutterBottom>
          Hi, {studentName || 'Student'}! <span role="img" aria-label="wave">👋</span>
        </Typography>
        <Typography variant="body1" color="#912d53" sx={{ mb: 3, maxWidth: 480 }}>
          Welcome back! Keep up the great momentum on your learning journey. Review your upcoming classes and stay ahead.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <img
          src={greetingImg}
          alt="Greeting"
          style={{ width: "250px", height: "200px", objectFit: "contain" }}
        />
      </Box>
    </Paper>
  );
};

export default StudentGreetingCard;
