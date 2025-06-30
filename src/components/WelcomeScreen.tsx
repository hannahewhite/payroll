import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.svg';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/setup/business-details');
  };

  const handleOffboard = () => {
    navigate('/offboarding/details');
  };

  const handleMfaFlow = () => {
    navigate('/setup/account-security');
  };

  const handleBulkEmail = () => {
    navigate('/payruns/1');
  };

  const handleSessionTimeout = () => {
    navigate('/payruns', { state: { sessionTimeout: true } });
  };

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <img 
              src={logo}
              alt="Payroll" 
              style={{ 
                height: '32px',
                width: 'auto',
              }} 
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleGetStarted}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                backgroundColor: '#3D1CBA',
                '&:hover': {
                  backgroundColor: '#2F1590',
                },
              }}
            >
              Get started
            </Button>
            <Button
              variant="outlined"
              onClick={handleOffboard}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                borderColor: '#E5E7EB',
                color: '#374151',
                '&:hover': {
                  borderColor: '#D1D5DB',
                  backgroundColor: '#F9FAFB',
                },
              }}
            >
              Offboard employee
            </Button>
            <Button
              variant="outlined"
              onClick={handleMfaFlow}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                borderColor: '#E5E7EB',
                color: '#374151',
                '&:hover': {
                  borderColor: '#D1D5DB',
                  backgroundColor: '#F9FAFB',
                },
              }}
            >
              MFA flow
            </Button>
            <Button
              variant="outlined"
              onClick={handleBulkEmail}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                borderColor: '#E5E7EB',
                color: '#374151',
                '&:hover': {
                  borderColor: '#D1D5DB',
                  backgroundColor: '#F9FAFB',
                },
              }}
            >
              Bulk email
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleSessionTimeout}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                borderColor: '#E5E7EB',
                color: '#374151',
                '&:hover': {
                  borderColor: '#D1D5DB',
                  backgroundColor: '#F9FAFB',
                },
              }}
            >
              Session Timeout
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomeScreen; 