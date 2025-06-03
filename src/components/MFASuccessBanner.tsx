import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface MFASuccessBannerProps {
  message?: string;
}

const MFASuccessBanner: React.FC<MFASuccessBannerProps> = ({ 
  message = "Multi factor authentication has been set up successfully" 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        bgcolor: '#F0FDF4',
        p: 2,
        borderRadius: 1,
        border: '1px solid #BBF7D0',
      }}
    >
      <CheckCircleIcon 
        sx={{ 
          color: '#16A34A',
          fontSize: 20,
        }} 
      />
      <Typography
        sx={{
          color: '#15803D',
          fontSize: '14px',
          fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default MFASuccessBanner; 