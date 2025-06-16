import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import SetupStepper from './SetupStepper';

const SetupLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMfaComplete, setIsMfaComplete] = useState(false);
  const [showMfaError, setShowMfaError] = useState(false);

  const menuItems = [
    { path: 'business-details', label: 'Business details' },
    { path: 'payroll-details', label: 'Payroll details' },
    { path: 'pay-calendars', label: 'Pay calendars' },
    { path: 'account-security', label: 'Account security' },
  ];

  const currentStepIndex = menuItems.findIndex(item => location.pathname.includes(item.path));
  const isLastStep = location.pathname.includes('account-security');

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(`/setup/${menuItems[currentStepIndex - 1].path}`);
    } else {
      navigate('/');
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      navigate(`/setup/${menuItems[currentStepIndex + 1].path}`);
    } else {
      if (!isMfaComplete) {
        setShowMfaError(true);
        return;
      }
      navigate('/payruns', { replace: true });
    }
  };

  const handleMfaComplete = () => {
    setIsMfaComplete(true);
    setShowMfaError(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box 
        sx={{ 
          width: '100%',
          borderBottom: '0.8px solid #E5E7EB',
          bgcolor: '#FFFFFF',
          position: 'fixed',
          top: 0,
          zIndex: 1200,
        }}
      >
        <Box sx={{ 
          display: 'flex',
          py: 3,
        }}>
          <Typography
            variant="h6"
            sx={{
              color: '#111827',
              fontWeight: 600,
              fontSize: '32px',
              marginLeft: '64px',
            }}
          >
            Setup payroll
          </Typography>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', pt: '88px', flex: 1 }}>
        {/* Side Navigation */}
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            bgcolor: '#FFFFFF',
            borderRight: '0.8px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 88px)',
            position: 'fixed',
            top: '88px',
          }}
        >
          <SetupStepper />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#FFFFFF',
            marginLeft: '240px',
            minHeight: 'calc(100vh - 88px)',
            position: 'relative',
            pb: '80px',
          }}
        >
          <Box sx={{ maxWidth: '1000px', margin: '0 auto', p: 4 }}>
            <Outlet context={{ 
              onMfaComplete: handleMfaComplete,
              showMfaError: showMfaError,
            }} />
          </Box>

          {/* Footer Navigation */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              maxWidth: '1000px',
              width: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginLeft: '120px',
              height: '80px',
              bgcolor: '#FFFFFF',
              borderTop: '0.8px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 4,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{
                borderColor: '#E5E7EB',
                color: '#374151',
                '&:hover': {
                  borderColor: '#6366F1',
                  backgroundColor: 'rgba(99, 102, 241, 0.04)',
                },
                height: '36px',
                px: 4,
              }}
            >
              {currentStepIndex === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
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
              {isLastStep ? 'Finish set up' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SetupLayout; 