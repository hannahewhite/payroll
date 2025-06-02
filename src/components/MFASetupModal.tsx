import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Link,
} from '@mui/material';
import AuthenticatorSetupModal from './AuthenticatorSetupModal';

interface MFASetupModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const MFASetupModal: React.FC<MFASetupModalProps> = ({ open, onClose, onComplete }) => {
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'password' | 'phone' | 'verify'>('password');
  const [passwordError, setPasswordError] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [authenticatorModalOpen, setAuthenticatorModalOpen] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const verificationInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on the appropriate input when step changes
    if (open) {
      setTimeout(() => {
        if (step === 'password' && passwordInputRef.current) {
          passwordInputRef.current.focus();
        } else if (step === 'phone' && phoneInputRef.current) {
          phoneInputRef.current.focus();
        } else if (step === 'verify' && verificationInputRef.current) {
          verificationInputRef.current.focus();
        }
      }, 100); // Small delay to ensure the input is rendered
    }
  }, [step, open]);

  const handleContinue = () => {
    if (step === 'password') {
      if (password === 'barry123') {
        setStep('phone');
        setPassword('');
        setPasswordError(false);
      } else {
        setPasswordError(true);
      }
    } else if (step === 'phone') {
      setStep('verify');
      // Handle sending code to phone number
      console.log('Sending code to:', phoneNumber);
    } else {
      if (verificationCode === '123 123') {
        console.log('Verifying code:', verificationCode);
        onComplete();
      } else {
        setVerificationError(true);
      }
    }
  };

  const handleCancel = () => {
    onClose();
    setPassword('');
    setPhoneNumber('');
    setVerificationCode('');
    setPasswordError(false);
    setVerificationError(false);
    setStep('password');
  };

  const handleResendNumber = () => {
    // Handle resending verification code
    console.log('Resending code to:', phoneNumber);
  };

  const handleBack = () => {
    if (step === 'verify') {
      setStep('phone');
      setVerificationError(false);
      setVerificationCode('');
    } else if (step === 'phone') {
      setStep('password');
      setPhoneNumber('');
    } else {
      handleCancel();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
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
          fontSize: '24px',
          fontWeight: 600,
        }}
      >
        Set up multi factor authentication
      </DialogTitle>
      <DialogContent sx={{ pt: '8px !important' }}>
        {step === 'password' && (
          <Box 
            component="form" 
            sx={{ mb: 2 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                mb: 3,
                fontSize: '16px'
              }}
            >
              We need to verify your identity to set up multi factor authentication.
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Enter password
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Enter account password"
              value={password}
              inputRef={passwordInputRef}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleContinue();
                }
              }}
              error={passwordError}
              helperText={passwordError ? "Incorrect password" : ""}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                },
                '& .MuiFormHelperText-root': {
                  fontSize: '14px',
                  marginLeft: 0,
                  marginTop: '2px',
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                }
              }}
            />
            <Box sx={{ mt: 1 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => console.log('Forgot password clicked')}
                sx={{
                  color: '#3D1CBA',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  }
                }}
              >
                Forgot password
              </Link>
            </Box>
          </Box>
        )}

        {step === 'phone' && (
          <Box 
            component="form" 
            sx={{ mb: 2 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: '2px' }}>
              Enter your phone number
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              A verification code will be sent to the number
            </Typography>
            <TextField
              fullWidth
              placeholder="0000 000 000"
              value={phoneNumber}
              inputRef={phoneInputRef}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleContinue();
                }
              }}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                }
              }}
            />
          </Box>
        )}

        {step === 'verify' && (
          <Box 
            component="form" 
            sx={{ mb: 2 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: '2px' }}>
              Verify your phone number
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Enter 6 digit code sent to your phone number
            </Typography>
            <TextField
              fullWidth
              placeholder="000 000"
              value={verificationCode}
              inputRef={verificationInputRef}
              onChange={(e) => {
                const input = e.target.value.replace(/\s/g, '');
                if (/^\d*$/.test(input)) {
                  const formattedInput = input.length > 3 
                    ? input.slice(0, 3) + ' ' + input.slice(3, 6)
                    : input;
                  setVerificationCode(formattedInput);
                  setVerificationError(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleContinue();
                }
              }}
              error={verificationError}
              helperText={verificationError ? "Incorrect code" : ""}
              inputProps={{ maxLength: 7 }}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                },
                '& .MuiFormHelperText-root': {
                  fontSize: '14px',
                  marginLeft: 0,
                  marginTop: '2px',
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                }
              }}
            />
            <Box sx={{ mt: 1 }}>
              <Link
                component="button"
                variant="body2"
                onClick={handleResendNumber}
                sx={{
                  color: '#3D1CBA',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  }
                }}
              >
                Resend code
              </Link>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={handleBack}
          sx={{ 
            color: '#6B7280',
            '&:hover': {
              backgroundColor: 'rgba(107, 114, 128, 0.04)',
            }
          }}
        >
          {step === 'verify' ? 'Back' : 'Cancel'}
        </Button>
        <Button
          variant="contained"
          onClick={handleContinue}
          sx={{
            bgcolor: '#3D1CBA',
            '&:hover': {
              bgcolor: '#3417A4',
            },
            boxShadow: 'none',
            textTransform: 'none',
            height: '36px',
            px: 3,
          }}
        >
          {step === 'password' ? 'Continue' : step === 'phone' ? 'Send code' : 'Finish set up'}
        </Button>
      </DialogActions>
      <AuthenticatorSetupModal
        open={authenticatorModalOpen}
        onClose={() => setAuthenticatorModalOpen(false)}
        onComplete={() => {
          setAuthenticatorModalOpen(false);
          onComplete();
        }}
      />
    </Dialog>
  );
};

export default MFASetupModal; 