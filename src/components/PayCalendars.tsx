import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import CreatePayCalendarModal from './CreatePayCalendarModal';

interface PayCalendar {
  name: string;
  frequency: string;
  startDay: string;
  businessEntity?: string;
}

const PayCalendars: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payCalendars, setPayCalendars] = useState<PayCalendar[]>([]);
  const [showToast, setShowToast] = useState(false);

  const handleCreatePayCalendar = (payCalendar: PayCalendar) => {
    setPayCalendars([...payCalendars, payCalendar]);
    setShowToast(true);
  };

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToast(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontSize: '30px', fontWeight: 600, mb: 2 }}>
          Pay calendars
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Assign existing pay calendar or create a new one that belongs to this entity
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 'none', mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pay calendar</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Start date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payCalendars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No pay calendars found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              payCalendars.map((calendar, index) => (
                <TableRow key={index}>
                  <TableCell>{calendar.name}</TableCell>
                  <TableCell>{calendar.frequency}</TableCell>
                  <TableCell>{calendar.startDay}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Button
          variant="outlined"
          onClick={() => setIsModalOpen(true)}
          sx={{
            borderColor: '#E5E7EB',
            color: '#374151',
            '&:hover': {
              borderColor: '#6366F1',
              backgroundColor: 'rgba(99, 102, 241, 0.04)',
            },
            textTransform: 'none',
            height: '36px',
          }}
        >
          Create new
        </Button>
      </Box>

      <CreatePayCalendarModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePayCalendar}
      />

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleCloseToast}
          severity="success"
          sx={{ 
            bgcolor: '#111827',
            color: '#FFFFFF',
            '& .MuiAlert-icon': {
              color: '#FFFFFF'
            },
            '& .MuiAlert-action': {
              color: '#FFFFFF'
            }
          }}
        >
          Pay calendar created successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PayCalendars; 