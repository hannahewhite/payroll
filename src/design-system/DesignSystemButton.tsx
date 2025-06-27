// DesignSystemButton.tsx
// A reusable button component for consistent design system styling.
// Usage: <DesignSystemButton variant="contained|outlined" ...props>Label</DesignSystemButton>

import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

const DesignSystemButton: React.FC<ButtonProps> = ({ children, sx, ...props }) => {
  return (
    <Button
      sx={{
        height: '32px',
        borderRadius: '8px',
        px: 2,
        fontWeight: 500,
        fontSize: 14,
        textTransform: 'none',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default DesignSystemButton; 