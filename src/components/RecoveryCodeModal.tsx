import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface RecoveryCodeModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const RecoveryCodeModal: React.FC<RecoveryCodeModalProps> = ({ open, onClose, onComplete }) => {
  // Example recovery codes - in a real app, these would be generated on the backend
  const recoveryCodes = [
    'ABCD-EFGH-IJKL',
    'MNOP-QRST-UVWX',
    'WXYZ-1234-5678',
    '9ABC-DEFG-HIJK',
    'LMNO-PQRS-TUVW',
    'XYZ1-2345-6789',
    'ABCD-EFGH-IJKL',
    'MNOP-QRST-UVWX',
  ];

  const handleCopyClick = () => {
    navigator.clipboard.writeText(recoveryCodes.join('\n'));
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          maxWidth: '480px',
        }
      }}
    >
      <DialogTitle sx={{ 
        pt: 4,
        px: 4,
        pb: 2,
        fontWeight: 600,
        fontSize: '20px',
        color: '#111827',
      }}>
        Save your recovery codes
      </DialogTitle>

      <DialogContent sx={{ px: 4 }}>
        <Typography sx={{ color: '#6B7280', fontSize: '14px', mb: 3 }}>
          Recovery codes are used to access your account if you can't receive two-factor authentication codes. Save these codes in a secure location.
        </Typography>

        <Box sx={{ 
          backgroundColor: '#F9FAFB',
          borderRadius: '8px',
          p: 2,
          position: 'relative',
        }}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
          }}>
            {recoveryCodes.map((code, index) => (
              <Typography 
                key={index}
                sx={{ 
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: '#111827',
                }}
              >
                {code}
              </Typography>
            ))}
          </Box>
          <IconButton 
            onClick={handleCopyClick}
            sx={{ 
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#6B7280',
              '&:hover': {
                color: '#111827',
                backgroundColor: 'rgba(55, 65, 81, 0.04)',
              },
            }}
          >
            <ContentCopyIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        <Typography sx={{ color: '#C9150C', fontSize: '14px', mt: 3 }}>
          You won't be able to view these codes again. Make sure you store them in a safe place.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, pt: 2 }}>
        <Button
          onClick={onComplete}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#3D1CBA',
            color: '#FFFFFF',
            '&:hover': {
              bgcolor: '#3019A0',
            },
            height: '40px',
            borderRadius: '6px',
            textTransform: 'none',
            fontSize: '14px',
          }}
        >
          I've saved my recovery codes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecoveryCodeModal; 