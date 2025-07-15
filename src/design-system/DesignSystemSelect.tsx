// DesignSystemSelect.tsx
// A reusable select/dropdown component for consistent design system styling.
// Usage: <DesignSystemSelect label="Label" value={...} onChange={...} width={...}>...</DesignSystemSelect>

import React, { ReactNode } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

interface DesignSystemSelectProps {
  label?: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number | string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

const DesignSystemSelect: React.FC<DesignSystemSelectProps> = ({ label, value, onChange, width = '350px', children, sx, ...props }) => {
  const menuProps = {
    PaperProps: {
      sx: {
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.08)',
        minWidth: width,
      },
    },
    MenuListProps: {
      sx: {
        p: 0,
      },
    },
  };
  return (
    <Box sx={{ width, ...sx }}>
      {label && (
        <Typography variant="subtitle1" gutterBottom sx={{ color: '#18113C', fontSize: '14px', fontWeight: 500, mb: 0.5 }}>
          {label}
        </Typography>
      )}
      <TextField
        select
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
        SelectProps={{
          MenuProps: menuProps,
        }}
        sx={{
          width,
          fontSize: 14,
          color: '#18113C',
          '& .MuiOutlinedInput-root': { height: '32px', borderRadius: '8px', fontSize: 14, color: '#18113C' },
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            fontSize: 14,
            color: '#18113C',
            height: '32px',
            lineHeight: '32px',
          },
        }}
        {...props}
      >
        {children}
      </TextField>
    </Box>
  );
};

// Styled menu item for design system dropdowns
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
  color: '#18113C',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#F9FAFB',
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent !important',
    color: '#3D1CBA',
    fontWeight: 700,
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'transparent !important',
    color: '#3D1CBA',
    fontWeight: 700,
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default DesignSystemSelect;
export { StyledMenuItem }; 