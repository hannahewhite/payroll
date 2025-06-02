import React, { useState } from 'react';
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

  const handleContinue = () => {
    if (step === 'password') {
      setStep('phone');
      setPassword('');
    } else if (step === 'phone') {
      setStep('verify');
      // Handle sending code to phone number
      console.log('Sending code to:', phoneNumber);
    } else {
      // Handle verification code submission and complete setup
      console.log('Verifying code:', verificationCode);
      onComplete();
    }
  };

  const handleCancel = () => {
    onClose();
    setPassword('');
    setPhoneNumber('');
    setVerificationCode('');
    setStep('password');
  };

  const handleResendNumber = () => {
    // Handle resending verification code
    console.log('Resending code to:', phoneNumber);
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Enter password
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Enter account password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                }
              }}
            />
          </Box>
        )}

        {step === 'phone' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Enter your phone number
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              A verification code will be sent to the number
            </Typography>
            <TextField
              fullWidth
              placeholder="0000 000 000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Verify your phone number
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enter 6 digit code sent to your phone number
            </Typography>
            <TextField
              fullWidth
              placeholder="000 000"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                }
              }}
            />
            <Box sx={{ mt: 2 }}>
              <Link
                component="button"
                variant="body2"
                onClick={handleResendNumber}
                sx={{
                  color: '#6366F1',
                  textDecorationColor: '#6366F1',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Resend number
              </Link>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                fullWidth
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
                Add authentication app
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={handleCancel}
          sx={{ 
            color: '#6B7280',
            '&:hover': {
              backgroundColor: 'rgba(107, 114, 128, 0.04)',
            }
          }}
        >
          Cancel
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
    </Dialog>
  );
};

export default MFASetupModal; 