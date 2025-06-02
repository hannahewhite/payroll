import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

interface StartPayrunModalProps {
  open: boolean;
  onClose: () => void;
  payrunData: {
    period: string;
    paymentDate: string;
    calendar: string;
  };
}

const StartPayrunModal: React.FC<StartPayrunModalProps> = ({ open, onClose, payrunData }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    onClose();
    // Navigate to the payrun details page with a temporary ID
    navigate('/payruns/1');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          width: '480px',
          maxWidth: '90vw',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          pb: 1,
          pr: 5,
          fontSize: '24px',
          fontWeight: 600,
          fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        Start {payrunData.calendar.toLowerCase()} payrun
      </DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          color: '#6B7280',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: '8px !important' }}>
        <Box sx={{ 
          bgcolor: '#F9FAFB', 
          borderRadius: 2,
          p: 3,
          mb: 2
        }}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              sx={{ 
                color: '#6B7280',
                fontSize: '14px',
                mb: 0.5,
                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Run
            </Typography>
            <Typography 
              sx={{ 
                color: '#111827',
                fontSize: '16px',
                fontWeight: 500,
                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              {payrunData.period}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 8 }}>
            <Box>
              <Typography 
                sx={{ 
                  color: '#6B7280',
                  fontSize: '14px',
                  mb: 0.5,
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Year
              </Typography>
              <Typography 
                sx={{ 
                  color: '#111827',
                  fontSize: '16px',
                  fontWeight: 500,
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                2023/2024
              </Typography>
            </Box>

            <Box>
              <Typography 
                sx={{ 
                  color: '#6B7280',
                  fontSize: '14px',
                  mb: 0.5,
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Payment date
              </Typography>
              <Typography 
                sx={{ 
                  color: '#111827',
                  fontSize: '16px',
                  fontWeight: 500,
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                {payrunData.paymentDate}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleStart}
            sx={{
              bgcolor: '#3D1CBA',
              '&:hover': {
                bgcolor: '#3417A4',
              },
              boxShadow: 'none',
              textTransform: 'none',
              height: '36px',
              px: 3,
              fontSize: '14px',
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Start
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default StartPayrunModal; 