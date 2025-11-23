import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Box } from '@mui/material';
import { fetchWithAuth } from '../utils/auth';

const StudentProfileCard = ({ onClick }) => {
  const [student, setStudent] = useState({ name: '', avatar: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetchWithAuth('http://127.0.0.1:8000/api/accounts/me/', {
          method: 'GET', headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error('Error fetching');
        const data = await res.json();
        setStudent({ name: data.name || data.username, avatar: data.avatar || '' });
      } catch {
        setStudent({ name: 'Student' });
      }
    }
    fetchData();
  }, []);

  return (
    <Box display="flex" alignItems="center" gap={2} sx={{
      cursor: 'pointer',
      padding: '0.5rem 0.8rem',
      borderRadius: '8px',
      backgroundColor: 'rgba(245,250,255,0.7)',
      boxShadow: '0 2px 8px rgba(32,32,72,0.03)',
      marginBottom: '1.1rem',
      ':hover': { backgroundColor: 'rgba(225,235,250,1)' },
    }} onClick={onClick}>
      <Avatar
  src={student.avatar ? `http://127.0.0.1:8000${student.avatar.startsWith('/media/') ? student.avatar : `/media/${student.avatar}`}` : ''}
  sx={{ width: 38, height: 38 }}
  alt={student.name}
>
  {student.name ? student.name[0] : ''}
</Avatar>

      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{student.name}</Typography>
    </Box>
  );
};

export default StudentProfileCard;
