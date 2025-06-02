import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const PayCalendars: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/setup/account-security');
  };

  const handleBack = () => {
    navigate('/setup/payroll-details');
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Pay calendars
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Set up your pay run schedules
        </Typography>
      </Box>

      <Paper sx={{ 
        borderRadius: 2, 
        border: '1px solid #E5E7EB',
        boxShadow: 'none',
        overflow: 'hidden',
        mb: 3
      }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
              <TableCell 
                sx={{ 
                  py: 1.5,
                  px: 3,
                  borderBottom: '1px solid #E5E7EB',
                  color: '#111827',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Pay calendar
              </TableCell>
              <TableCell 
                sx={{ 
                  py: 1.5,
                  px: 3,
                  borderBottom: '1px solid #E5E7EB',
                  color: '#111827',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Frequency
              </TableCell>
              <TableCell 
                sx={{ 
                  py: 1.5,
                  px: 3,
                  borderBottom: '1px solid #E5E7EB',
                  color: '#111827',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Start date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: '1px solid #E5E7EB',
                  color: '#111827',
                  fontSize: '14px',
                }}
              >
                Monthly A
              </TableCell>
              <TableCell
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: '1px solid #E5E7EB',
                  color: '#111827',
                  fontSize: '14px',
                }}
              >
                Monthly
              </TableCell>
              <TableCell
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: '1px solid #E5E7EB',
                  color: '#111827',
                  fontSize: '14px',
                }}
              >
                26th
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
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
    </Box>
  );
};

export default PayCalendars; 