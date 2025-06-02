import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={onClick}
      variant="text"
      sx={{
        color: '#6B7280',
        mb: 3,
        pl: 0,
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      Back
    </Button>
  );
};

export default BackButton; 