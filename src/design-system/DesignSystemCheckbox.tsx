// DesignSystemCheckbox.tsx
import React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

const DesignSystemCheckbox: React.FC<CheckboxProps> = ({ checked, indeterminate, ...props }) => (
  <Checkbox
    checked={checked}
    indeterminate={indeterminate}
    icon={
      <Box sx={{
        width: 16,
        height: 16,
        borderRadius: '4px',
        border: '1.5px solid #D1D5DB',
        bgcolor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CheckIcon sx={{ color: 'white', fontSize: 16, opacity: 0 }} />
      </Box>
    }
    checkedIcon={
      <Box sx={{
        width: 16,
        height: 16,
        borderRadius: '4px',
        bgcolor: '#3D1CBA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CheckIcon sx={{ color: 'white', fontSize: 16 }} />
      </Box>
    }
    indeterminateIcon={
      <Box sx={{
        width: 16,
        height: 16,
        borderRadius: '4px',
        bgcolor: '#3D1CBA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box sx={{ width: 10, height: 2, borderRadius: 1, bgcolor: 'white' }} />
      </Box>
    }
    sx={{ width: 16, height: 16, p: 0, mr: 1.5 }}
    {...props}
  />
);

export default DesignSystemCheckbox; 