import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import MFASetupModal from './MFASetupModal';

const AccountSecurity: React.FC = () => {
  const navigate = useNavigate();
  const [isMFAModalOpen, setIsMFAModalOpen] = useState(false);
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);

  const handleMFAStatusChange = (isEnabled: boolean) => {
    setIsMFAEnabled(isEnabled);
  };

  useEffect(() => {
    handleMFAStatusChange(isMFAEnabled);
  }, [isMFAEnabled]);

  const handleNext = () => {
    if (isMFAEnabled) {
      navigate('/payruns');
    }
  };

  const handleBack = () => {
    navigate('/setup/pay-calendars');
  };

  const handleMFASetup = () => {
    setIsMFAModalOpen(true);
  };

  const handleMFAModalClose = () => {
    setIsMFAModalOpen(false);
  };

  const handleMFAComplete = () => {
    setIsMFAEnabled(true);
    setIsMFAModalOpen(false);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Account security
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Set up additional security measures for your account
        </Typography>
      </Box>

      {isMFAEnabled ? (
        <>
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              '& .MuiAlert-message': {
                color: '#232329',
              },
              '& .MuiAlert-icon': {
                color: '#232329',
              },
              backgroundColor: '#F4FBF7',
              color: '#232329',
              border: '1px solid #8FCEA8',
              '& .MuiTypography-root': {
                color: '#232329',
              },
            }}
          >
            Multi factor authentication is now enabled
            <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
              This can be managed in the account setting in your global profile.
            </Typography>
          </Alert>

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
            Set up authenticator app
          </Button>
        </>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Multi-factor authentication
          </Typography>
          <Button
            variant="outlined"
            onClick={handleMFASetup}
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
            Set up
          </Button>
        </Box>
      )}

      <MFASetupModal
        open={isMFAModalOpen}
        onClose={handleMFAModalClose}
        onComplete={handleMFAComplete}
      />
    </Box>
  );
};

export default AccountSecurity; 