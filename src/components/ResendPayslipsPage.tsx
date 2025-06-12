import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Alert,
  Avatar,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckIcon from '@mui/icons-material/Check';

const mockEmployees = [
  { id: 1, name: 'Hannah White', type: 'Full time', location: "Little Finn's Gin", email: '', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 2, name: 'Kozi White', type: 'Part time', location: "Little Finn's Gin", email: '', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: 3, name: 'Finn White', type: 'Casual', location: 'August Coffee', email: 'fwhite@deputy.com', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 4, name: 'Jordi White', type: 'Full time', location: 'August Coffee', email: 'jwhite@deputy.com', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 5, name: 'Simon Hutchinson', type: 'Full time', location: 'August Coffee', email: 'hwhite@deputy.com', avatar: 'https://randomuser.me/api/portraits/men/23.jpg' },
  { id: 6, name: 'Mike Ho', type: 'Casual', location: "Little Finn's Gin", email: 'hwhite@deputy.com', avatar: 'https://randomuser.me/api/portraits/men/76.jpg' },
  { id: 7, name: 'Johnny Cash', type: 'Full time', location: "Little Finn's Gin", email: 'hwhite@deputy.com', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { id: 8, name: 'Taylor Swift', type: 'Part time', location: "Little Finn's Gin", email: 'hwhite@deputy.com', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
];

const employmentTypes = ['Full time', 'Part time', 'Casual'];
const mainLocations = ["Little Finn's Gin", 'August Coffee'];

const ResendPayslipsPage: React.FC = () => {
  const [selected, setSelected] = useState<number[]>(mockEmployees.filter(e => e.email).map(e => e.id));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(mockEmployees.filter(e => e.email).map(e => e.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const missingEmailCount = mockEmployees.filter(e => !e.email).length;

  const handleEmploymentTypeToggle = (type: string) => {
    setSelectedEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  const handleLocationToggle = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', maxWidth: 1000, mx: 'auto', position: 'relative', px: 0 }}>
      <Box>
        <Typography variant="body2" sx={{ color: '#232329', mb: 1, mt: 6 }}>
          <Box
            component="span"
            sx={{ fontWeight: 500, color: '#232329', cursor: 'pointer', display: 'inline' }}
            onClick={() => navigate(-1)}
            tabIndex={0}
            role="button"
            aria-label="Go back to Pay runs"
          >
            Pay runs
          </Box> {'>'} Resend payslips
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Resend payslips
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#6B7280', mb: 3 }}>
          Weekly - 1/05/2025 – 7/05/2025
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, color: '#232329' }}>
          Select which employee you want to email payslips for:
        </Typography>
        {missingEmailCount > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 3,
              backgroundColor: '#FFFAEA',
              color: '#232329',
              border: '1px solid #E9C16B',
              borderRadius: '8px',
              fontFamily: '-apple-system, "SF Pro", "SF Pro Display"',
              px: 2,
              py: 1.5,
            }}
          >
            <WarningIcon sx={{ color: '#D7AA41' }} />
            <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#232329' }}>
              {missingEmailCount} employee{missingEmailCount > 1 ? 's are' : ' is'} missing an email address and will not receive their payslips via email.
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 500, color: '#374151', borderColor: '#E5E7EB', mr: 2 }}
          >
            Filter
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0px 4px 16px 0px rgba(16, 24, 40, 0.08)',
                minWidth: 280,
                p: 2,
              },
            }}
            MenuListProps={{ sx: { p: 0 } }}
          >
            <Box sx={{ px: 1, py: 0.5 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#6B7280', letterSpacing: 1, mb: 1, textTransform: 'uppercase' }}>
                Employment type
              </Typography>
              {employmentTypes.map((type) => (
                <Box key={type} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Checkbox
                    checked={selectedEmploymentTypes.includes(type)}
                    onChange={() => handleEmploymentTypeToggle(type)}
                    sx={{ width: 20, height: 20, borderRadius: 1, p: 0, mr: 1.5 }}
                    icon={<Box sx={{ width: 20, height: 20, borderRadius: '4px', border: '1.5px solid #D1D5DB', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon sx={{ color: 'white', fontSize: 18, opacity: 0 }} /></Box>}
                    checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '4px', bgcolor: '#3D1CBA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon sx={{ color: 'white', fontSize: 18 }} /></Box>}
                  />
                  <Typography sx={{ fontSize: 16, color: '#232329', fontWeight: 500 }}>{type}</Typography>
                </Box>
              ))}
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#6B7280', letterSpacing: 1, mb: 1, mt: 2, textTransform: 'uppercase' }}>
                Main location
              </Typography>
              {mainLocations.map((loc) => (
                <Box key={loc} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Checkbox
                    checked={selectedLocations.includes(loc)}
                    onChange={() => handleLocationToggle(loc)}
                    sx={{ width: 20, height: 20, borderRadius: 1, p: 0, mr: 1.5 }}
                    icon={<Box sx={{ width: 20, height: 20, borderRadius: '4px', border: '1.5px solid #D1D5DB', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon sx={{ color: 'white', fontSize: 18, opacity: 0 }} /></Box>}
                    checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '4px', bgcolor: '#3D1CBA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon sx={{ color: 'white', fontSize: 18 }} /></Box>}
                  />
                  <Typography sx={{ fontSize: 16, color: '#232329', fontWeight: 500 }}>{loc}</Typography>
                </Box>
              ))}
            </Box>
          </Menu>
        </Box>
      </Box>
      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', mb: 4, height: '100%', overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: 'white', zIndex: 1 }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < mockEmployees.filter(e => e.email).length}
                    checked={selected.length === mockEmployees.filter(e => e.email).length}
                    onChange={handleSelectAll}
                    inputProps={{ 'aria-label': 'select all employees' }}
                    sx={{ width: 16, height: 16, borderRadius: 1, p: 0 }}
                    icon={<Box sx={{ width: 16, height: 16, borderRadius: '4px', border: '1.5px solid #D1D5DB', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon sx={{ color: 'white', fontSize: 16, opacity: 0 }} /></Box>}
                    checkedIcon={<Box sx={{ width: 16, height: 16, borderRadius: '4px', bgcolor: '#3D1CBA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon sx={{ color: 'white', fontSize: 16 }} /></Box>}
                  />
                </TableCell>
                <TableCell sx={{ backgroundColor: 'white', zIndex: 1 }}>Team member</TableCell>
                <TableCell sx={{ backgroundColor: 'white', zIndex: 1 }}>Employment type</TableCell>
                <TableCell sx={{ backgroundColor: 'white', zIndex: 1 }}>Main location</TableCell>
                <TableCell sx={{ backgroundColor: 'white', zIndex: 1 }}>Email address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(emp.id)}
                      onChange={() => handleSelect(emp.id)}
                      disabled={!emp.email}
                      sx={{ width: 16, height: 16, borderRadius: 1, p: 0 }}
                      icon={
                        !emp.email ? (
                          <Box sx={{ width: 16, height: 16, borderRadius: '4px', border: '1.5px solid #D1D5DB', bgcolor: '#F9F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckIcon sx={{ color: 'white', fontSize: 16, opacity: 0 }} />
                          </Box>
                        ) : (
                          <Box sx={{ width: 16, height: 16, borderRadius: '4px', border: '1.5px solid #D1D5DB', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckIcon sx={{ color: 'white', fontSize: 16, opacity: 0 }} />
                          </Box>
                        )
                      }
                      checkedIcon={<Box sx={{ width: 16, height: 16, borderRadius: '4px', bgcolor: '#3D1CBA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon sx={{ color: 'white', fontSize: 16 }} /></Box>}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={emp.avatar} alt={emp.name} sx={{ width: 32, height: 32, mr: 1 }} />
                      {emp.name}
                    </Box>
                  </TableCell>
                  <TableCell>{emp.type}</TableCell>
                  <TableCell>{emp.location}</TableCell>
                  <TableCell sx={{ color: emp.email ? 'inherit' : '#C9150C', fontWeight: emp.email ? 400 : 500 }}>
                    {emp.email || 'No email'}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={5} sx={{ height: '80px', border: 0, padding: 0 }} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          bgcolor: 'white',
          py: 2,
          zIndex: 1201,
        }}
      >
        <Box
          sx={{
            maxWidth: 1000,
            mx: 'auto',
            px: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '1px solid #E5E7EB',
            pt: 2,
          }}
        >
          <Button variant="outlined" onClick={handleCancel} sx={{ borderRadius: 2, textTransform: 'none', color: '#374151', borderColor: '#E5E7EB', fontWeight: 500, mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: '#3D1CBA', '&:hover': { bgcolor: '#2E1A8A' } }}>
            Email {selected.length} payslip{selected.length !== 1 ? 's' : ''}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResendPayslipsPage; 