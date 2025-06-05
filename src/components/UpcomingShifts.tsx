import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';

interface Shift {
  date: string;
  time: string;
  location: string;
}

interface UpcomingShiftsProps {
  onNext: () => void;
  onBack: () => void;
}

const UpcomingShifts: React.FC<UpcomingShiftsProps> = ({ onNext, onBack }) => {
  const shifts: Shift[] = [
    { date: 'Mon 10 Dec', time: '9:00 AM – 5:00 PM', location: 'Front of house' },
    { date: 'Mon 10 Dec', time: '6:00 PM – 11:00 PM', location: 'Bar service' },
    { date: 'Tue 11 Dec', time: '7:00 AM – 3:00 PM', location: 'Kitchen' },
    { date: 'Wed 12 Dec', time: '10:00 AM – 6:00 PM', location: 'Front of house' },
    { date: 'Thu 13 Dec', time: '3:00 PM – 11:00 PM', location: 'Bar service' },
    { date: 'Fri 14 Dec', time: '8:00 AM – 4:00 PM', location: 'Kitchen' },
    { date: 'Sat 15 Dec', time: '12:00 PM – 8:00 PM', location: 'Front of house' },
    { date: 'Sun 16 Dec', time: '5:00 PM – 10:00 PM', location: 'Bar service' },
    { date: 'Mon 17 Dec', time: '11:00 AM – 7:00 PM', location: 'Kitchen' },
  ];

  const handleOpenAllShifts = () => {
    // Implementation for opening all shifts
  };

  const handleMarkAllEmpty = () => {
    // Implementation for marking all shifts as empty
  };

  const handleDeleteAll = () => {
    // Implementation for deleting all shifts
  };

  const handleDiscard = (index: number) => {
    // Implementation for discarding a shift
  };

  const handleOpenShift = (index: number) => {
    // Implementation for opening a shift
  };

  const getLocationColor = (location: string): string => {
    switch (location) {
      case 'Front of house':
        return '#10B981';
      case 'Bar service':
        return '#6366F1';
      case 'Kitchen':
        return '#F59E0B';
      default:
        return '#10B981';
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
        Action any upcoming shifts
      </Typography>

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button
          variant="outlined"
          onClick={handleOpenAllShifts}
          sx={{
            color: '#374151',
            borderColor: '#E5E7EB',
            '&:hover': {
              borderColor: '#D1D5DB',
              backgroundColor: 'rgba(99, 102, 241, 0.04)',
            },
            textTransform: 'none',
            height: '32px',
          }}
        >
          Open all shifts
        </Button>
        <Button
          variant="outlined"
          onClick={handleMarkAllEmpty}
          sx={{
            color: '#374151',
            borderColor: '#E5E7EB',
            '&:hover': {
              borderColor: '#D1D5DB',
              backgroundColor: 'rgba(99, 102, 241, 0.04)',
            },
            textTransform: 'none',
            height: '32px',
          }}
        >
          Mark all as empty
        </Button>
        <Button
          variant="outlined"
          onClick={handleDeleteAll}
          sx={{
            color: '#DC2626',
            borderColor: '#DC2626',
            '&:hover': {
              borderColor: '#DC2626',
              backgroundColor: 'rgba(220, 38, 38, 0.04)',
            },
            textTransform: 'none',
            height: '32px',
          }}
        >
          Delete all
        </Button>
      </Box>

      {/* Shifts list */}
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 4 }}>
        {shifts.map((shift, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: '12px',
              borderBottom: '1px solid #E5E7EB',
            }}
          >
            <Box sx={{ display: 'flex', gap: 8 }}>
              <Typography sx={{ color: '#111827', width: '100px', fontSize: '14px' }}>
                {shift.date}
              </Typography>
              <Typography sx={{ color: '#111827', width: '160px', fontSize: '14px' }}>
                {shift.time}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: getLocationColor(shift.location),
                  }}
                />
                <Typography sx={{ color: '#111827', fontSize: '14px' }}>
                  {shift.location}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => handleDiscard(index)}
                sx={{
                  color: '#374151',
                  borderColor: '#E5E7EB',
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                  textTransform: 'none',
                  height: '32px',
                }}
              >
                Discard
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleOpenShift(index)}
                sx={{
                  color: '#374151',
                  borderColor: '#E5E7EB',
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                  textTransform: 'none',
                  height: '32px',
                }}
              >
                Open shift
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            borderColor: '#E5E7EB',
            color: '#374151',
            '&:hover': {
              borderColor: '#D1D5DB',
              backgroundColor: 'rgba(99, 102, 241, 0.04)',
            },
            height: '36px',
            px: 4,
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          sx={{
            bgcolor: '#3D1CBA',
            color: '#FFFFFF',
            '&:hover': {
              bgcolor: '#3019A0',
            },
            height: '36px',
            px: 4,
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UpcomingShifts; 