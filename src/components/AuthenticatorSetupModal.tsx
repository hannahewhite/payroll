import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Link,
  Box,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

interface AuthenticatorSetupModalProps {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const AuthenticatorSetupModal: React.FC<AuthenticatorSetupModalProps> = ({
  open,
  onClose,
  onComplete,
}) => {
  const [password, setPassword] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authAppCode, setAuthAppCode] = useState('');
  const [authAppCodeError, setAuthAppCodeError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const resendInterval = useRef<NodeJS.Timeout | null>(null);
  const secretKey = 'JBSWY3DPEHPK3PXP';
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (currentStep === 3) {
      setResendTimer(60);
      if (resendInterval.current) clearInterval(resendInterval.current);
      resendInterval.current = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            if (resendInterval.current) clearInterval(resendInterval.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (resendInterval.current) clearInterval(resendInterval.current);
    }
    return () => {
      if (resendInterval.current) clearInterval(resendInterval.current);
    };
  }, [currentStep]);

  const handlePasswordSubmit = () => {
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    setPasswordError('');
    setCurrentStep(2);
  };

  const handlePhoneSubmit = () => {
    if (!phone) {
      setPhoneError('Phone number is required');
      return;
    }
    setPhoneError('');
    setCurrentStep(3);
  };

  const handleCancel = () => {
    setPassword('');
    setCode('');
    setPhone('');
    setPhoneError('');
    setCurrentStep(1);
    onClose();
  };

  const handleCodeSubmit = () => {
    if (!code || code.length !== 6) {
      setCodeError('Code is required');
      return;
    }
    if (code !== '123123') {
      setCodeError('Code is incorrect');
      return;
    }
    setCodeError('');
    setCurrentStep(4);
  };

  const handleAuthAppSubmit = () => {
    if (!authAppCode || authAppCode.length !== 6) {
      setAuthAppCodeError('Code is required');
      return;
    }
    if (authAppCode !== '123123') {
      setAuthAppCodeError('Incorrect code');
      return;
    }
    setAuthAppCodeError('');
    if (onComplete) onComplete();
    handleCancel();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '12px' }
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
        {currentStep === 4 ? 'Set up an authentication app' : 'Set up multi factor authentication'}
      </DialogTitle>
      <DialogContent>
        {currentStep === 1 ? (
          <>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              We need to verify your identity to set up multi factor authentication.
            </Typography>
            <Typography 
              variant="subtitle1" 
              fontWeight="medium"
              sx={{ mb: 1 }}
            >
              Enter account password
            </Typography>
            <TextField
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              fullWidth
              variant="outlined"
              sx={{ mb: 1, width: '300px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  height: '32px',
                  fontFamily: 'SF Pro Text',
                },
                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#C9150C',
                },
                '& .MuiFormHelperText-root.Mui-error': {
                  color: '#C9150C',
                  fontSize: '14px',
                  marginLeft: 0,
                  fontFamily: 'SF Pro Text',
                },
              }}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Box sx={{ mt: 0.5 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => {/* TODO: Handle forgot password */}}
                sx={{ 
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Forgot password
              </Link>
            </Box>
          </>
        ) : currentStep === 2 ? (
          <>
            <Typography
              variant="subtitle1"
              sx={{
                mt: '18px',
                color: '#18113C',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'SF Pro Text',
              }}
            >
              Enter your phone number
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6B7280', mb: '8px', fontFamily: 'SF Pro Text', fontSize: '14px' }}
            >
              A verification code will be sent to the number
            </Typography>
            <TextField
              value={phone}
              onChange={e => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError('');
              }}
              placeholder="0000 000 000"
              variant="outlined"
              sx={{
                mb: 1,
                width: '300px',
                fontFamily: 'SF Pro Text',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  height: '32px',
                  fontFamily: 'SF Pro Text',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                  fontFamily: 'SF Pro Text',
                },
                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#C9150C',
                },
                '& .MuiFormHelperText-root.Mui-error': {
                  color: '#C9150C',
                  fontSize: '14px',
                  marginLeft: 0,
                  fontFamily: 'SF Pro Text',
                },
              }}
              error={!!phoneError}
              helperText={phoneError}
            />
          </>
        ) : currentStep === 3 ? (
          <>
            <Typography
              variant="subtitle1"
              sx={{
                mt: '18px',
                color: '#18113C',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'SF Pro Text',
              }}
            >
              Verify your phone number
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6B7280', mb: '8px', fontFamily: 'SF Pro Text', fontSize: '14px' }}
            >
              Enter 6 digit code sent to your phone number
            </Typography>
            <TextField
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (codeError) setCodeError('');
              }}
              placeholder="000000"
              variant="outlined"
              sx={{
                width: '300px',
                fontFamily: 'SF Pro Text',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  height: '32px',
                  fontFamily: 'SF Pro Text',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                  textAlign: 'left',
                  letterSpacing: '0.3em',
                  fontFamily: 'SF Pro Text',
                },
                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#C9150C',
                },
                '& .MuiFormHelperText-root.Mui-error': {
                  color: '#C9150C',
                  fontSize: '14px',
                  marginLeft: 0,
                  fontFamily: 'SF Pro Text',
                },
              }}
              error={!!codeError}
              helperText={codeError}
              inputProps={{ maxLength: 6 }}
              InputProps={{
                endAdornment: code === '123123' && !codeError ? (
                  <CheckCircleIcon sx={{ color: '#30A46C', fontSize: 20, mr: 0.5 }} />
                ) : null
              }}
            />
            <Box sx={{ mt: '8px' }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  if (resendTimer === 0) setResendTimer(60);
                }}
                disabled={resendTimer > 0}
                sx={{
                  color: resendTimer > 0 ? '#9CA3AF' : '#3D1CBA',
                  fontWeight: 500,
                  fontSize: '14px',
                  textDecoration: 'none',
                  fontFamily: 'SF Pro Text',
                  cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',
                  '&:hover': {
                    textDecoration: resendTimer > 0 ? 'none' : 'underline',
                  },
                }}
              >
                {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
              </Link>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mt: '18px', fontWeight: 600, fontSize: '14px', color: '#18113C', fontFamily: 'SF Pro Text', mb: 0.5 }}>
                Download an authenticator app
              </Typography>
              <Typography sx={{ color: '#6B7280', fontSize: '14px', fontFamily: 'SF Pro Text', mb: 1 }}>
                You can download an authenticator app e.g. Google auth
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#18113C', fontFamily: 'SF Pro Text', mb: 0.5 }}>
                Scan the QR code
              </Typography>
              <Typography sx={{ color: '#6B7280', fontSize: '14px', fontFamily: 'SF Pro Text', mb: 2 }}>
                Open your authenticator app and scan this QR code
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=otpauth://totp/Example:demo@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example"
                  alt="QR Code"
                  width={120}
                  height={120}
                  style={{ borderRadius: 8 }}
                />
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: '#6B7280', fontSize: '14px', fontFamily: 'SF Pro Text', mb: 1 }}>
                Enter this code manually in your authenticator app:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F4F4F5', borderRadius: '8px', px: 2, py: 1, width: 'fit-content', mb: 2 }}>
                <Typography sx={{ fontFamily: 'SF Pro Text', fontWeight: 600, fontSize: '16px', letterSpacing: '0.1em', color: '#18113C', mr: 1 }}>
                  {secretKey}
                </Typography>
                <Tooltip
                  open={copied}
                  title={<span style={{ color: '#fff', fontSize: 12 }}>Copied!</span>}
                  placement="top"
                  slotProps={{ popper: { sx: { zIndex: 1500 } }, tooltip: { sx: { bgcolor: '#1E163C', borderRadius: 1, px: 1, py: 0.5 } } }}
                >
                  <ContentCopyIcon
                    onClick={handleCopy}
                    sx={{ cursor: 'pointer', color: copied ? '#30A46C' : '#6B7280', fontSize: 18 }}
                  />
                </Tooltip>
              </Box>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#18113C', fontFamily: 'SF Pro Text', mb: 1 }}>
              Enter 6 digit code
            </Typography>
            <TextField
              value={authAppCode}
              onChange={e => {
                const val = e.target.value;
                setAuthAppCode(val);
                if (authAppCodeError) setAuthAppCodeError('');
                if (val.length === 6 && val !== '123123') {
                  setAuthAppCodeError('Incorrect code');
                } else if (val.length < 6) {
                  setAuthAppCodeError('');
                }
              }}
              placeholder="000 000"
              variant="outlined"
              sx={{
                mb: 2,
                width: '300px',
                fontFamily: 'SF Pro Text',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  height: '32px',
                  fontFamily: 'SF Pro Text',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                  fontFamily: 'SF Pro Text',
                  letterSpacing: '0.3em',
                },
                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#C9150C',
                },
                '& .MuiFormHelperText-root.Mui-error': {
                  color: '#C9150C',
                  fontSize: '14px',
                  marginLeft: 0,
                  fontFamily: 'SF Pro Text',
                },
              }}
              error={!!authAppCodeError}
              helperText={authAppCodeError}
              inputProps={{ maxLength: 6 }}
              InputProps={{
                endAdornment: authAppCode === '123123' && !authAppCodeError ? (
                  <CheckCircleIcon sx={{ color: '#30A46C', fontSize: 20, mr: 0.5 }} />
                ) : null
              }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2, gap: 0 }}>
        <Button
          onClick={currentStep === 3 ? () => setCurrentStep(2) : handleCancel}
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
          {currentStep === 3 ? 'Back' : 'Cancel'}
        </Button>
        <Button
          onClick={
            currentStep === 1
              ? handlePasswordSubmit
              : currentStep === 2
                ? handlePhoneSubmit
                : currentStep === 3
                  ? handleCodeSubmit
                  : handleAuthAppSubmit
          }
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
          disabled={false}
        >
          {currentStep === 2 ? 'Send code' : currentStep === 4 ? 'Finish set up' : 'Continue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthenticatorSetupModal; 