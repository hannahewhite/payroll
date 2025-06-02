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
import { QRCodeSVG } from 'qrcode.react';

interface AuthenticatorSetupModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const AuthenticatorSetupModal: React.FC<AuthenticatorSetupModalProps> = ({ open, onClose, onComplete }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(false);

  const handleFinish = () => {
    if (verificationCode === '123456') {
      onComplete();
    } else {
      setVerificationError(true);
    }
  };

  const handleCancel = () => {
    onClose();
    setVerificationCode('');
    setVerificationError(false);
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
        Set up authenticator app
      </DialogTitle>
      <DialogContent sx={{ pt: '8px !important' }}>
        <Box>
          <Typography variant="subtitle1" sx={{ mb: '2px' }}>
            Download an authenticator app
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Download and install one of these authentication apps on your device
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
            <Link
              href="https://apps.apple.com/us/app/google-authenticator/id388497605"
              target="_blank"
              sx={{
                color: '#3D1CBA',
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': { textDecoration: 'none' }
              }}
            >
              Google Authenticator (iOS)
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
              target="_blank"
              sx={{
                color: '#3D1CBA',
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': { textDecoration: 'none' }
              }}
            >
              Google Authenticator (Android)
            </Link>
          </Box>

          <Typography variant="subtitle1" sx={{ mb: '2px' }}>
            Scan the QR code
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Open your authenticator app and scan this QR code
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <QRCodeSVG
              value="otpauth://totp/PayrollApp:user@example.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=PayrollApp"
              size={200}
              level="H"
            />
          </Box>

          <Typography variant="subtitle1" sx={{ mb: '2px' }}>
            Enter verification code
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Enter the 6-digit code shown in your authenticator app
          </Typography>
          <TextField
            fullWidth
            placeholder="000000"
            value={verificationCode}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, '');
              if (input.length <= 6) {
                setVerificationCode(input);
                setVerificationError(false);
              }
            }}
            error={verificationError}
            helperText={verificationError ? "Incorrect code" : ""}
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
        </Box>
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
          }}
        >
          Finish setup
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthenticatorSetupModal; 