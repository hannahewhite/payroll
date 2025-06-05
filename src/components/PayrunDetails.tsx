import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const PayslipSection = styled(Box)(({ theme }) => ({
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  marginBottom: '16px',
}));

const PayslipDetailRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
  '&:not(:last-child)': {
    borderBottom: '1px solid #E5E7EB',
  },
}));

const employeeData = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Software Engineer',
    baseRate: 45.00,
    hoursWorked: 38,
    leaveHours: 0,
    overtimeHours: 2,
    expenses: 150.00,
    deductions: 250.00,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    baseRate: 52.00,
    hoursWorked: 40,
    leaveHours: 8,
    overtimeHours: 0,
    expenses: 75.00,
    deductions: 180.00,
  },
  // Add more employees as needed
];

const PayrunDetails: React.FC = () => {
  const [tabValue, setTabValue] = useState(1); // Default to Payslips tab
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    navigate('/payruns');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredEmployees = employeeData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', p: 3 }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <Button
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#6366F1',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              '&:hover': { bgcolor: 'transparent' },
            }}
          >
            Back
          </Button>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
              Casual weekly 26 Feb - 2 Mar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              12 payslips | Total payments: $112,000.00
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{
                mr: 2,
                color: '#374151',
                borderColor: '#E5E7EB',
                textTransform: 'none',
              }}
            >
              Bulk actions
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#4F46E5',
                color: 'white',
                textTransform: 'none',
                '&:hover': { bgcolor: '#4338CA' },
              }}
            >
              Complete pay run
            </Button>
            <IconButton onClick={handleMenuClick} sx={{ ml: 1 }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: '#E5E7EB' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6B7280',
                '&.Mui-selected': {
                  color: '#4F46E5',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#4F46E5',
              },
            }}
          >
            <Tab label="Summary" />
            <Tab label="Payslips" />
          </Tabs>
        </Box>

        {/* Content */}
        {tabValue === 1 && (
          <Box sx={{ mt: 3, display: 'flex', gap: 3 }}>
            {/* Employee List */}
            <Box sx={{ width: 300, borderRight: '1px solid #E5E7EB', pr: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search employees"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#9CA3AF' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <List>
                {filteredEmployees.map((employee) => (
                  <ListItem
                    key={employee.id}
                    onClick={() => setSelectedEmployee(employee.id)}
                    sx={{
                      borderRadius: '8px',
                      mb: 0.5,
                      cursor: 'pointer',
                      bgcolor: selectedEmployee === employee.id ? '#F5F3FF' : 'transparent',
                      '&:hover': {
                        bgcolor: selectedEmployee === employee.id ? '#F5F3FF' : '#F9FAFB',
                      },
                    }}
                  >
                    <ListItemText
                      primary={employee.name}
                      secondary={employee.role}
                      primaryTypographyProps={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#111827',
                      }}
                      secondaryTypographyProps={{
                        fontSize: '12px',
                        color: '#6B7280',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Payslip Details */}
            <Box sx={{ flex: 1 }}>
              {selectedEmployee ? (
                <>
                  <Typography variant="h6" sx={{ mb: 3, color: '#111827' }}>
                    {employeeData.find(e => e.id === selectedEmployee)?.name}'s Payslip
                  </Typography>
                  {(() => {
                    const selectedEmployeeData = employeeData.find(e => e.id === selectedEmployee);
                    if (!selectedEmployeeData) return null;

                    return (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <PayslipSection>
                          <Typography variant="h6" sx={{ mb: 2, color: '#111827' }}>
                            Hours & Earnings
                          </Typography>
                          <PayslipDetailRow>
                            <Typography variant="body2" color="text.secondary">Base Hours (${selectedEmployeeData.baseRate}/hr)</Typography>
                            <Typography variant="body1" fontWeight={500}>{selectedEmployeeData.hoursWorked} hrs</Typography>
                          </PayslipDetailRow>
                          <PayslipDetailRow>
                            <Typography variant="body2" color="text.secondary">Leave Hours</Typography>
                            <Typography variant="body1" fontWeight={500}>{selectedEmployeeData.leaveHours} hrs</Typography>
                          </PayslipDetailRow>
                          <PayslipDetailRow>
                            <Typography variant="body2" color="text.secondary">Overtime Hours</Typography>
                            <Typography variant="body1" fontWeight={500}>{selectedEmployeeData.overtimeHours} hrs</Typography>
                          </PayslipDetailRow>
                          <PayslipDetailRow>
                            <Typography variant="body2" color="text.secondary">Total Hours</Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {selectedEmployeeData.hoursWorked + selectedEmployeeData.leaveHours + selectedEmployeeData.overtimeHours} hrs
                            </Typography>
                          </PayslipDetailRow>
                        </PayslipSection>

                        <PayslipSection>
                          <Typography variant="h6" sx={{ mb: 2, color: '#111827' }}>
                            Additional Payments
                          </Typography>
                          <PayslipDetailRow>
                            <Typography variant="body2" color="text.secondary">Expenses</Typography>
                            <Typography variant="body1" fontWeight={500}>${selectedEmployeeData.expenses.toFixed(2)}</Typography>
                          </PayslipDetailRow>
                        </PayslipSection>

                        <PayslipSection>
                          <Typography variant="h6" sx={{ mb: 2, color: '#111827' }}>
                            Deductions
                          </Typography>
                          <PayslipDetailRow>
                            <Typography variant="body2" color="text.secondary">Tax</Typography>
                            <Typography variant="body1" fontWeight={500}>${selectedEmployeeData.deductions.toFixed(2)}</Typography>
                          </PayslipDetailRow>
                        </PayslipSection>

                        <PayslipSection>
                          <Typography variant="h6" sx={{ mb: 2, color: '#111827' }}>
                            Net Pay
                          </Typography>
                          <PayslipDetailRow>
                            <Typography variant="body2" color="text.secondary">Total</Typography>
                            <Typography variant="h6" sx={{ color: '#111827' }}>
                              ${(
                                (selectedEmployeeData.baseRate * selectedEmployeeData.hoursWorked) +
                                selectedEmployeeData.expenses -
                                selectedEmployeeData.deductions
                              ).toFixed(2)}
                            </Typography>
                          </PayslipDetailRow>
                        </PayslipSection>
                      </Box>
                    );
                  })()}
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8, color: '#6B7280' }}>
                  <Typography variant="body1">
                    Select an employee to view their payslip
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
          }}
        >
          {/* Add menu items here */}
        </Menu>
      </Box>
    </Box>
  );
};

export default PayrunDetails; 