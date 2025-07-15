// DesignSystemMultiSelect.tsx
// A reusable multi-select dropdown with parent/child grouping and checkboxes, styled for the design system.

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
  SxProps,
  Theme,
  ListSubheader,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import DesignSystemCheckbox from './DesignSystemCheckbox';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export interface MultiSelectOption {
  parent: string;
  children: { value: string; label: string }[];
}

interface DesignSystemMultiSelectProps {
  label: string;
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  width?: number | string;
  sx?: SxProps<Theme>;
}

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
      borderRadius: 8,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.08)',
    },
  },
};

const DesignSystemMultiSelect: React.FC<DesignSystemMultiSelectProps> = ({ label, options, selected, onChange, width = '100%', sx }) => {
  // Flatten all children for easy lookup
  const allChildren = options.flatMap(opt => opt.children.map(child => child.value));

  // Handle parent selection
  const handleParentToggle = (parent: string) => {
    const parentObj = options.find(opt => opt.parent === parent);
    if (!parentObj) return;
    const childValues = parentObj.children.map(child => child.value);
    const allSelected = childValues.every(val => selected.includes(val));
    let newSelected;
    if (allSelected) {
      // Deselect all children
      newSelected = selected.filter(val => !childValues.includes(val));
    } else {
      // Select all children (add any not already selected)
      newSelected = [...selected, ...childValues.filter(val => !selected.includes(val))];
    }
    onChange(newSelected);
  };

  // Handle child selection
  const handleChange = (event: any) => {
    const value = event.target.value;
    onChange(typeof value === 'string' ? value.split(',') : value);
  };

  // Custom render for selected values
  const renderValue = (selectedVals: string[]) => {
    if (!selectedVals || selectedVals.length === 0) {
      return <span style={{ color: '#6B7280', fontSize: 14 }}>Select</span>;
    }
    const labels: string[] = [];
    options.forEach(opt => {
      opt.children.forEach(child => {
        if (selectedVals.includes(child.value)) {
          labels.push(child.label);
        }
      });
    });
    return (
      <Box sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'block',
        fontSize: 14,
      }}>
        {labels.join(', ')}
      </Box>
    );
  };

  return (
    <Box sx={{ width, ...sx }}>
      {label && (
        <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500, mb: 0.5 }}>
          {label}
        </Typography>
      )}
      <FormControl size="small" sx={{ width: '100%' }}>
        <Select
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput
            sx={{
              height: '32px',
              minHeight: '32px',
              borderRadius: '8px',
              boxSizing: 'border-box',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB !important',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D1D5DB !important',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3D1CBA !important',
              },
            }}
          />}
          renderValue={renderValue}
          MenuProps={MenuProps}
          displayEmpty
          sx={{
            borderRadius: '8px',
            height: '32px',
            minHeight: '32px',
            '& .MuiSelect-select': {
              padding: '6px 12px',
              fontSize: '14px',
              minHeight: '32px',
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          {options.map((opt, idx) => [
            <ListSubheader key={opt.parent} sx={{ fontWeight: 600, fontSize: 14, color: '#18113C', bgcolor: 'white', px: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', lineHeight: '32px', minHeight: '32px', height: '32px', mt: idx === 0 ? 0 : 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                <LocationOnIcon sx={{ color: '#3D1CBA', fontSize: 18, mr: 1 }} />
                <span style={{ minWidth: 0, fontWeight: 600, fontSize: 14, color: '#18113C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{opt.parent}</span>
              </Box>
              <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <DesignSystemCheckbox
                  checked={opt.children.every(child => selected.includes(child.value))}
                  indeterminate={opt.children.some(child => selected.includes(child.value)) && !opt.children.every(child => selected.includes(child.value))}
                  onClick={e => {
                    e.stopPropagation();
                    handleParentToggle(opt.parent);
                  }}
                />
              </Box>
            </ListSubheader>,
            opt.children.map(child => (
              <MenuItem key={child.value} value={child.value} sx={{
                pl: 4,
                pr: 1,
                fontSize: 14,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '&.Mui-selected': { backgroundColor: 'transparent !important' },
                '&.Mui-selected:hover': { backgroundColor: 'transparent !important' },
                '&.Mui-focusVisible': { backgroundColor: 'transparent !important', outline: 'none !important' },
                '&.Mui-focused': { backgroundColor: 'transparent !important', outline: 'none !important' },
              }}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <ListItemText primary={child.label} primaryTypographyProps={{ fontSize: 14 }} />
                </Box>
                <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <DesignSystemCheckbox checked={selected.includes(child.value)} />
                </Box>
              </MenuItem>
            ))
          ])}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DesignSystemMultiSelect; 