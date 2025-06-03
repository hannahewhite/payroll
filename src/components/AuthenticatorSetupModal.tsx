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
  InputAdornment,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { QRCodeSVG } from 'qrcode.react';

interface AuthenticatorSetupModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const AuthenticatorSetupModal: React.FC<AuthenticatorSetupModalProps> = ({ open, onClose, onComplete }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [step, setStep] = useState('download');

  const handleFinish = () => {
    const cleanCode = verificationCode.replace(/\s/g, '');
    if (cleanCode.length !== 6) {
      setVerificationError(true);
      return;
    }
    if (verificationCode === '123 123') {
      onComplete();
    } else {
      setVerificationError(true);
    }
  };

  const handleCancel = () => {
    onClose();
    setVerificationCode('');
    setVerificationError(false);
    setVerificationSuccess(false);
    setStep('download');
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
          fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        Set up an authentication app
      </DialogTitle>
      <DialogContent sx={{ pt: '8px !important' }}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: '2px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Download an authenticator app
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6B7280',
              fontSize: '14px',
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            You can download an authenticator app e.g. Google auth
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: '2px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Scan the QR code
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6B7280',
              fontSize: '14px',
              mb: 2,
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Open your authenticator app and scan this QR code
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <QRCodeSVG
              value="otpauth://totp/PayrollApp:user@example.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=PayrollApp"
              size={160}
              level="H"
            />
          </Box>
        </Box>

        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: '2px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Enter 6 digit code
          </Typography>
          <TextField
            fullWidth
            placeholder="000 000"
            value={verificationCode}
            onChange={(e) => {
              const input = e.target.value.replace(/\s/g, '');
              if (/^\d*$/.test(input)) {
                const formattedInput = input.length > 3 
                  ? input.slice(0, 3) + ' ' + input.slice(3, 6)
                  : input;
                setVerificationCode(formattedInput);
                setVerificationError(false);
                setVerificationSuccess(formattedInput === '123 123');
              }
            }}
            error={verificationError}
            helperText={verificationError ? "Incorrect code" : ""}
            inputProps={{ maxLength: 7 }}
            InputProps={{
              endAdornment: verificationSuccess && (
                <InputAdornment position="end">
                  <CheckCircleIcon sx={{ color: '#30A46C', fontSize: 20 }} />
                </InputAdornment>
              )
            }}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '40px',
                backgroundColor: '#fff',
                '& fieldset': {
                  borderColor: '#E5E7EB',
                },
                '&:hover fieldset': {
                  borderColor: '#E5E7EB',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3D1CBA',
                },
              },
              '& .MuiFormHelperText-root': {
                fontSize: '14px',
                marginLeft: 0,
                marginTop: '2px',
                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={handleCancel}
          sx={{
            color: '#3D1CBA',
            backgroundColor: '#F5F3FF',
            '&:hover': {
              backgroundColor: '#EDE9FE',
            },
            textTransform: 'none',
            height: '36px',
            px: 3,
            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleFinish}
          sx={{
            bgcolor: '#3D1CBA',
            '&:hover': {
              bgcolor: '#3417A4',
            },
            boxShadow: 'none',
            textTransform: 'none',
            height: '36px',
            px: 3,
            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          Finish set up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthenticatorSetupModal; 