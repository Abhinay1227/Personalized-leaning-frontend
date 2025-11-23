import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
import { fetchWithAuth } from '../utils/auth';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const StudentProfileModal = ({ open, onClose }) => {
  const [student, setStudent] = useState({
    name: '',
    avatar: '',
    email: '',
    grade: '',
    school: '',
    bio: '',
    linkedin: '',
    twitter: '',
  });
  const [uploading, setUploading] = useState(false);

  // Fetch student profile when modal opens or refresh needed
  useEffect(() => {
    if (!open) return;

    async function fetchData() {
      try {
        const res = await fetchWithAuth('http://127.0.0.1:8000/api/accounts/me/', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch student data');
        const data = await res.json();
        setStudent({
          name: data.name || data.username || 'Student',
          avatar: data.avatar || '',
          email: data.email || '',
          grade: data.grade || '',
          school: data.school || '',
          bio: data.bio || '',
          linkedin: data.linkedin || '',
          twitter: data.twitter || '',
        });
      } catch {
        setStudent({ name: 'Student' });
      }
    }

    fetchData();
  }, [open]);

  // Handle avatar upload and refresh full profile after success
  const handleAvatarUpload = async (event) => {
    console.log('Avatar upload triggered');
    const file = event.target.files[0];
    if (!file) {
    console.log('No file selected');
    return;
  }

    setUploading(true);

    const formData = new FormData();
    formData.append('avatar', file);

    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch('http://127.0.0.1:8000/api/accounts/avatar/upload/', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    setUploading(false);

    if (res.ok) {
      // Refresh student data from backend after avatar upload
      const profileRes = await fetchWithAuth('http://127.0.0.1:8000/api/accounts/me/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setStudent({
          name: profileData.name || profileData.username || 'Student',
          avatar: profileData.avatar || '',
          email: profileData.email || '',
          grade: profileData.grade || '',
          school: profileData.school || '',
          bio: profileData.bio || '',
          linkedin: profileData.linkedin || '',
          twitter: profileData.twitter || '',
        });
      }
    } else {
      alert('Failed to upload avatar');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="student-profile-title"
      aria-describedby="student-profile-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: '20px',
          boxShadow: 26,
          p: 5,
          minWidth: 360,
          maxWidth: 420,
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography id="student-profile-title" variant="h4" fontWeight={700} sx={{ mb: 2, color: '#3f51b5' }}>
          Student Profile
        </Typography>

        <Avatar
          src={student.avatar ? `http://127.0.0.1:8000${student.avatar.startsWith('/media/') ? student.avatar : `/media/${student.avatar}`}` : ''}
          sx={{ width: 90, height: 90, mb: 1, boxShadow: '0 3px 12px rgba(63,81,181,0.3)' }}
        >
          {student.name ? student.name[0] : ''}
        </Avatar>

        <Button
          component="label"
          variant="outlined"
          color="primary"
          sx={{ mb: 2 }}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload New Avatar'}
          <input type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
        </Button>

        <Typography variant="h5" fontWeight={700}>
          {student.name}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {student.email}
        </Typography>

        <Divider sx={{ width: '80%', my: 3 }} />

        <Box sx={{ width: '100%', px: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            School
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {student.school || 'N/A'}
          </Typography>

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Grade
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {student.grade || 'N/A'}
          </Typography>

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            About Me
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.bio || 'No additional information provided.'}
          </Typography>
        </Box>

        <Divider sx={{ width: '80%', my: 3 }} />

        <Stack direction="row" spacing={2}>
          {student.linkedin && (
            <IconButton aria-label="LinkedIn Profile" color="primary" href={student.linkedin} target="_blank" rel="noopener">
              <LinkedInIcon fontSize="large" />
            </IconButton>
          )}
          {student.twitter && (
            <IconButton aria-label="Twitter Profile" color="primary" href={student.twitter} target="_blank" rel="noopener">
              <TwitterIcon fontSize="large" />
            </IconButton>
          )}
          {student.email && (
            <IconButton aria-label="Send Email" color="primary" href={`mailto:${student.email}`}>
              <EmailIcon fontSize="large" />
            </IconButton>
          )}
        </Stack>

        <Button sx={{ mt: 4, borderRadius: '30px', px: 5 }} variant="contained" color="primary" onClick={onClose} fullWidth>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default StudentProfileModal;
