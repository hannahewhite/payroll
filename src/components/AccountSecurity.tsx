import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  FormHelperText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MFASetupModal from './MFASetupModal';
import AuthenticatorSetupModal from './AuthenticatorSetupModal';

type ContextType = {
  onMfaComplete: () => void;
  showMfaError: boolean;
};

const AccountSecurity: React.FC = () => {
  const navigate = useNavigate();
  const { onMfaComplete, showMfaError } = useOutletContext<ContextType>();
  const [isMFAModalOpen, setIsMFAModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);
  const [isSMSVerified, setIsSMSVerified] = useState(false);

  const handleMFAStatusChange = (isEnabled: boolean) => {
    setIsMFAEnabled(isEnabled);
    if (isEnabled) {
      onMfaComplete();
    }
  };

  useEffect(() => {
    handleMFAStatusChange(isMFAEnabled);
  }, [isMFAEnabled]);

  const handleMFASetup = () => {
    setIsMFAModalOpen(true);
  };

  const handleMFAModalClose = () => {
    setIsMFAModalOpen(false);
  };

  const handleMFAComplete = () => {
    setIsSMSVerified(true);
    setIsMFAModalOpen(false);
  };

  const handleAuthSetup = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthComplete = () => {
    setIsAuthModalOpen(false);
    setIsMFAEnabled(true);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Account security
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Set up additional security measures for your account. The ATO requires that individuals processing payroll have multi-factor authentication (MFA) enabled to ensure the protection of sensitive information.
        </Typography>
      </Box>

      {isMFAEnabled ? (
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
            mb: 3,
            p: 2,
            backgroundColor: '#F4FBF7',
            borderRadius: '8px',
            border: '1px solid #8FCEA8',
          }}
        >
          <CheckCircleIcon 
            sx={{ 
              color: '#30A46C',
              fontSize: 20,
              mt: '2px',
            }} 
          />
          <Box>
            <Typography
              sx={{
                color: '#232329',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Multi factor authentication is now enabled
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 0.5,
                color: '#232329',
                opacity: 0.8,
                fontSize: '14px',
                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              An authenticator app and SMS code have both been enabled. This can be managed in the account setting in your global profile.
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {!isSMSVerified ? (
            <>
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
                  alignSelf: 'flex-start'
                }}
              >
                Set up
              </Button>
              {showMfaError && (
                <FormHelperText 
                  error 
                  sx={{ 
                    mt: 1,
                    fontSize: '14px',
                    color: '#C9150C',
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  You must complete MFA setup before continuing
                </FormHelperText>
              )}
            </>
          ) : (
            <>
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  mb: 2,
                  p: 2,
                  backgroundColor: '#F4FBF7',
                  borderRadius: '8px',
                  border: '1px solid #8FCEA8',
                }}
              >
                <CheckCircleIcon 
                  sx={{ 
                    color: '#30A46C',
                    fontSize: 20,
                    mt: '2px',
                  }} 
                />
                <Box>
                  <Typography
                    sx={{
                      color: '#232329',
                      fontSize: '14px',
                      fontWeight: 500,
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    SMS verification enabled
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 0.5,
                      color: '#232329',
                      opacity: 0.8,
                      fontSize: '14px',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    Complete the setup by enabling an authenticator app below
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                onClick={handleAuthSetup}
                sx={{
                  borderColor: '#E5E7EB',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#6366F1',
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                  textTransform: 'none',
                  height: '36px',
                  alignSelf: 'flex-start'
                }}
              >
                Set up authenticator app
              </Button>
              {showMfaError && (
                <FormHelperText 
                  error 
                  sx={{ 
                    mt: 1,
                    fontSize: '14px',
                    color: '#C9150C',
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  You must complete authenticator app setup before continuing
                </FormHelperText>
              )}
            </>
          )}
        </Box>
      )}

      <MFASetupModal
        open={isMFAModalOpen}
        onClose={handleMFAModalClose}
        onComplete={handleMFAComplete}
      />

      <AuthenticatorSetupModal
        open={isAuthModalOpen}
        onClose={handleAuthModalClose}
        onComplete={handleAuthComplete}
      />
    </Box>
  );
};

export default AccountSecurity; 