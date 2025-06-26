import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, ListItemIcon } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BulkActionsDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };
  const handleSubmenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSubmenuAnchorEl(event.currentTarget);
  };
  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Button
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          height: '32px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#232329',
          background: '#fff',
          border: '1px solid #E5E7EB',
          boxShadow: 'none',
          textTransform: 'none',
          px: 2,
          minWidth: 0,
          '&:hover': {
            background: '#F9F9FB',
            borderColor: '#D1D5DB',
          },
        }}
      >
        Bulk actions
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.08)',
            minWidth: 200,
            p: 0.5,
            mt: '4px',
          },
        }}
        MenuListProps={{ sx: { p: 0 } }}
      >
        <MenuItem onClick={handleClose} sx={{ fontSize: '14px', height: '32px', px: 2 }}>Payments</MenuItem>
        <MenuItem
          onClick={handleSubmenuClick}
          sx={{ fontSize: '14px', height: '32px', px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Leave
          <ListItemIcon sx={{ minWidth: 0, ml: 2 }}>
            <ChevronRightIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontSize: '14px', height: '32px', px: 2 }}>Expense</MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontSize: '14px', height: '32px', px: 2 }}>Deduction</MenuItem>
      </Menu>
      <Menu
        anchorEl={submenuAnchorEl}
        open={Boolean(submenuAnchorEl)}
        onClose={handleSubmenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.08)',
            minWidth: 180,
            p: 0.5,
            ml: 1,
          },
        }}
        MenuListProps={{ sx: { p: 0 } }}
      >
        <MenuItem onClick={handleSubmenuClose} sx={{ fontSize: '14px', height: '32px', px: 2 }}>Annual Leave</MenuItem>
        <MenuItem onClick={handleSubmenuClose} sx={{ fontSize: '14px', height: '32px', px: 2 }}>Sick Leave</MenuItem>
      </Menu>
    </Box>
  );
};

export default BulkActionsDropdown; 