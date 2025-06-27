import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Snackbar,
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
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [showResetToast, setShowResetToast] = useState(false);
  const [showForgotToast, setShowForgotToast] = useState(false);

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
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'row', gap: 2 }}>
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
        onForgotPassword={() => setShowForgotToast(true)}
      />

      <RecoveryCodeModal
        open={isRecoveryModalOpen}
        onClose={handleRecoveryModalClose}
        onComplete={handleRecoveryComplete}
      />

      {/* Social Login Modal */}
      <Dialog
        open={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 2px 16px 0 rgba(16,24,40,0.08)',
            position: 'relative',
          }
        }}
      >
        <DialogTitle sx={{
          pb: 1,
          typography: 'h4',
          fontWeight: 600,
          color: '#18113C',
          fontSize: '24px',
          mt: '16px',
        }}>
          Set up multi factor authentication
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 0, px: 3 }}>
          <Typography sx={{ color: '#6B7280', fontSize: '14px', mt: 2, mb: 4, fontWeight: 400 }}>
            2FA is required for all users, including those using social logins.<br />
            Since your account doesn't have a password, you'll receive an email to set one. Once that's done, we'll save where you are up to so you can return here to finish setting up 2FA in Global Settings.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2, gap: 0 }}>
          <Button
            onClick={() => setIsSocialModalOpen(false)}
            variant="outlined"
            sx={{
              mr: 1,
              height: '32px',
              borderColor: '#E5E7EB',
              color: '#374151',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                borderColor: '#6366F1',
                backgroundColor: 'rgba(99, 102, 241, 0.04)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              height: '32px',
              bgcolor: '#3D1CBA',
              color: '#FFFFFF',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#3019A0',
              },
            }}
            onClick={() => {
              setIsSocialModalOpen(false);
              setShowResetToast(true);
            }}
          >
            Reset password
          </Button>
        </DialogActions>
      </Dialog>
      {/* Toast for reset password */}
      <Snackbar
        open={showResetToast}
        autoHideDuration={4000}
        onClose={() => setShowResetToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        ContentProps={{
          sx: {
            bgcolor: '#32295E',
            color: '#fff',
            borderRadius: '8px',
            width: 208,
            minWidth: 0,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 400,
            px: 0,
            py: 2,
            boxShadow: '0px 4px 16px 0px rgba(16, 24, 40, 0.08)',
            left: 32,
            bottom: 32,
            position: 'fixed',
          }
        }}
        message={
          <span style={{ fontSize: 14, fontWeight: 400 }}>
            Reset password email sent
          </span>
        }
        style={{ left: 32, bottom: 32 }}
      />
      <Snackbar
        open={showForgotToast}
        autoHideDuration={3000}
        onClose={() => setShowForgotToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        ContentProps={{
          sx: {
            bgcolor: '#32295E',
            color: '#fff',
            borderRadius: '8px',
            width: 208,
            minWidth: 0,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontSize: 14,
            fontWeight: 400,
            px: 1,
            pl: 2,
            py: 2,
            boxShadow: '0px 4px 16px 0px rgba(16, 24, 40, 0.08)',
            left: 32,
            bottom: 32,
            position: 'fixed',
          }
        }}
        message={
          <span style={{ fontSize: 14, fontWeight: 400 }}>
            Password reset email sent
          </span>
        }
        style={{ left: 32, bottom: 32 }}
      />
    </Box>
  );
};

export default AccountSecurity; 