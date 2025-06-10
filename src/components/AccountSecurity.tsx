import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  FormHelperText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthenticatorSetupModal from './AuthenticatorSetupModal';
import RecoveryCodeModal from './RecoveryCodeModal';

type ContextType = {
  onMfaComplete: () => void;
  showMfaError: boolean;
};

const AccountSecurity: React.FC = () => {
  const { onMfaComplete, showMfaError } = useOutletContext<ContextType>();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);

  const handleMFAStatusChange = (isEnabled: boolean) => {
    setIsMFAEnabled(isEnabled);
    if (isEnabled) {
      onMfaComplete();
    }
  };

  useEffect(() => {
    handleMFAStatusChange(isMFAEnabled);
  }, [isMFAEnabled, handleMFAStatusChange]);

  const handleAuthSetup = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthComplete = () => {
    setIsAuthModalOpen(false);
    setIsRecoveryModalOpen(true);
  };

  const handleRecoveryModalClose = () => {
    setIsRecoveryModalOpen(false);
  };

  const handleRecoveryComplete = () => {
    setIsRecoveryModalOpen(false);
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
        <>
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
                This can be managed in the account settings in your global profile.
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              You must complete authenticator setup before continuing
            </FormHelperText>
          )}
        </Box>
      )}

      <AuthenticatorSetupModal
        open={isAuthModalOpen}
        onClose={handleAuthModalClose}
        onComplete={() => {
          setIsMFAEnabled(true);
          setIsAuthModalOpen(false);
        }}
      />

      <RecoveryCodeModal
        open={isRecoveryModalOpen}
        onClose={handleRecoveryModalClose}
        onComplete={handleRecoveryComplete}
      />
    </Box>
  );
};

export default AccountSecurity; 