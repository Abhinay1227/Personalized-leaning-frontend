import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const ModernCard = styled(Paper)({
  width: '100%',
  borderRadius: 24,
  padding: '16px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
});

export default function CalendarCard() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ModernCard elevation={0}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          showDaysOutsideCurrentMonth
          sx={{
            width: '100%',
            maxWidth: '100%',
            '& .MuiPickersCalendarHeader-root': { 
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: 0,
              marginBottom: '12px',
            },
            '& .MuiPickersCalendarHeader-label': {
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#1a202c',
              letterSpacing: '-0.025em',
            },
            '& .MuiPickersArrowSwitcher-root': {
              '& .MuiIconButton-root': {
                backgroundColor: 'rgba(135, 0, 0, 0.08)',
                borderRadius: '10px',
                width: '36px',
                height: '36px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(135, 0, 0, 0.15)',
                  transform: 'scale(1.05)',
                },
                '& svg': {
                  color: '#870000',
                  fontSize: '1.1rem',
                },
              },
            },
            '& .MuiDayCalendar-header': {
              marginBottom: '8px',
              '& .MuiTypography-root': {
                fontWeight: 600,
                color: '#4a5568',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                width: '36px',
                textAlign: 'center',
              },
            },
            '& .MuiDayCalendar-weekContainer': {
              margin: '1px 0',
              justifyContent: 'space-between',
            },
            '& .MuiPickersDay-root': { 
              fontSize: '0.85rem',
              fontWeight: 500,
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              margin: '1px',
              transition: 'all 0.2s ease',
              border: '2px solid transparent',
              '&:hover': {
                backgroundColor: 'rgba(135, 0, 0, 0.08)',
                transform: 'scale(1.05)',
                border: '2px solid rgba(135, 0, 0, 0.2)',
              },
            },
            '& .MuiPickersDay-root.Mui-selected': {
              backgroundColor: '#870000',
              color: 'white',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(135, 0, 0, 0.3)',
              transform: 'scale(1.05)',
              '&:hover': {
                backgroundColor: '#b93d3d',
                transform: 'scale(1.08)',
              },
            },
            // Today's date with dark background
            '& .MuiPickersDay-root.MuiPickersDay-today': {
              backgroundColor: '#2d3748', // Dark background for today
              color: 'white',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(45, 55, 72, 0.3)',
              '&:hover': {
                backgroundColor: '#4a5568',
                transform: 'scale(1.05)',
              },
              // When today is also selected
              '&.Mui-selected': {
                backgroundColor: '#870000',
                '&:hover': {
                  backgroundColor: '#b93d3d',
                },
              },
            },
            '& .MuiPickersDay-root.Mui-disabled': {
              color: '#cbd5e0',
              opacity: 0.5,
            },
            '& .MuiDayCalendar-monthContainer': {
              width: '100%',
            },
            '& .MuiDayCalendar-slideTransition': {
              width: '100%',
              overflow: 'hidden',
            },
          }}
        />
      </ModernCard>
    </LocalizationProvider>
  );
}
