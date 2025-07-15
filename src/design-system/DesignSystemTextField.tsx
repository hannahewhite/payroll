// DesignSystemTextField.tsx
// A reusable text field component for consistent design system styling.
// Usage: <DesignSystemTextField label="Label" footerText="Footer" width={300} ...props />

import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';

interface DesignSystemTextFieldCustomProps {
  label?: string;
  footerText?: string;
  sx?: SxProps<Theme>;
  width?: number | string;
}

const DesignSystemTextField: React.FC<DesignSystemTextFieldCustomProps & TextFieldProps> = ({ label, footerText, sx, width = '100%', ...props }) => {
  return (
    <Box>
      {label && (
        <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 0.5, color: '#18113C' }}>{label}</Typography>
      )}
      <TextField
        fullWidth
        variant="outlined"
        sx={{
          width,
          fontFamily: 'SF Pro Text',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            height: '32px',
            fontFamily: 'SF Pro Text',
          },
          '& input[type="date"]': {
            padding: '6px 12px',
            height: '20px',
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
          ...sx,
        }}
        {...props}
      />
      {footerText && (
        <Typography sx={{ color: '#6B7280', fontSize: 13, mt: 0.5 }}>{footerText}</Typography>
      )}
    </Box>
  );
};

export default DesignSystemTextField; 