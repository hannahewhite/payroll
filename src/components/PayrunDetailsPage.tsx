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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px solid #E5E7EB',
  padding: '16px 24px',
  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
  '&.MuiTableCell-head': {
    backgroundColor: 'white',
    color: '#6B7280',
    fontWeight: 500,
    fontSize: '14px',
  },
  '&.MuiTableCell-body': {
    color: '#111827',
    fontSize: '14px',
  },
}));

interface PayrunDetailsPageProps {
  payrunData: {
    period: string;
    totalPayslips: number;
    totalAmount: string;
  };
}

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
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Designer',
    baseRate: 48.00,
    hoursWorked: 35,
    leaveHours: 4,
    overtimeHours: 0,
    expenses: 100.00,
    deductions: 220.00,
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Marketing Manager',
    baseRate: 50.00,
    hoursWorked: 40,
    leaveHours: 0,
    overtimeHours: 5,
    expenses: 200.00,
    deductions: 280.00,
  },
];

const summaryData = [
  {
    name: 'John Smith',
    employment: 'Full time',
    regularHrs: { value: 38, change: 0 },
    additionalHrs: { value: 2, change: 2 },
    leaveHrs: { value: 0, change: 0 },
    total: 1810.00, // (38 * 45) + (2 * 45) + 150 - 250
    comparisonPay: 1700.00,
    difference: { value: 110.00, percentage: 6 },
    hasIssues: false,
  },
  {
    name: 'Sarah Johnson',
    employment: 'Full time',
    regularHrs: { value: 40, change: -2 },
    additionalHrs: { value: 0, change: 0 },
    leaveHrs: { value: 8, change: 8 },
    total: 2075.00, // (40 * 52) + (8 * 52) + 75 - 180
    comparisonPay: 2200.00,
    difference: { value: -125.00, percentage: 6 },
    hasIssues: true,
  },
  {
    name: 'Michael Brown',
    employment: 'Full time',
    regularHrs: { value: 35, change: 0 },
    additionalHrs: { value: 0, change: 0 },
    leaveHrs: { value: 4, change: 4 },
    total: 1760.00, // (35 * 48) + (4 * 48) + 100 - 220
    comparisonPay: 1760.00,
    difference: { value: 0, percentage: 0 },
    hasIssues: false,
  },
  {
    name: 'Emily Davis',
    employment: 'Full time',
    regularHrs: { value: 40, change: 2 },
    additionalHrs: { value: 5, change: 3 },
    leaveHrs: { value: 0, change: 0 },
    total: 2420.00, // (40 * 50) + (5 * 50) + 200 - 280
    comparisonPay: 2000.00,
    difference: { value: 420.00, percentage: 21 },
    hasIssues: true,
  },
];

const PayrunDetailsPage: React.FC<PayrunDetailsPageProps> = ({ payrunData }) => {
  const [tabValue, setTabValue] = useState(0); // Default to Summary tab
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
              {payrunData.period}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {payrunData.totalPayslips} payslips | Total payments: {payrunData.totalAmount}
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
        {tabValue === 0 ? (
          <Box sx={{ p: 3 }}>
            {/* Search and Compare */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}>
              <TextField
                placeholder="Search"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#9CA3AF' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: '320px',
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                    fontSize: '14px',
                  },
                }}
              />
              <Box>
                <Typography 
                  component="span" 
                  sx={{
                    color: '#6B7280',
                    fontSize: '14px',
                    mr: 1,
                  }}
                >
                  Compare to
                </Typography>
                <Button
                  variant="outlined"
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: '#374151',
                    borderColor: '#E5E7EB',
                    textTransform: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    height: '36px',
                    '&:hover': {
                      borderColor: '#D1D5DB',
                      backgroundColor: '#F9FAFB',
                    },
                  }}
                >
                  Last pay run
                </Button>
              </Box>
            </Box>

            {/* Summary Cards */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: 2,
              mb: 4,
            }}>
              <Box sx={{ 
                p: 3, 
                border: '1px solid #E5E7EB',
                borderRadius: 2,
                bgcolor: 'white',
              }}>
                <Typography 
                  sx={{ 
                    color: '#6B7280',
                    fontSize: '14px',
                    mb: 1,
                  }}
                >
                  Total
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography 
                    sx={{ 
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#111827',
                      mr: 1,
                    }}
                  >
                    $4,100
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#10B981',
                      fontSize: '14px',
                    }}
                  >
                    ↑ 11.4%
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: '1px solid #E5E7EB',
                borderRadius: 2,
                bgcolor: 'white',
              }}>
                <Typography 
                  sx={{ 
                    color: '#6B7280',
                    fontSize: '14px',
                    mb: 1,
                  }}
                >
                  Regular hrs
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography 
                    sx={{ 
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#111827',
                      mr: 1,
                    }}
                  >
                    320
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#10B981',
                      fontSize: '14px',
                    }}
                  >
                    ↑ 5%
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: '1px solid #E5E7EB',
                borderRadius: 2,
                bgcolor: 'white',
              }}>
                <Typography 
                  sx={{ 
                    color: '#6B7280',
                    fontSize: '14px',
                    mb: 1,
                  }}
                >
                  Additional hrs
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography 
                    sx={{ 
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#111827',
                      mr: 1,
                    }}
                  >
                    24
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#EF4444',
                      fontSize: '14px',
                    }}
                  >
                    ↓ 8%
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: '1px solid #E5E7EB',
                borderRadius: 2,
                bgcolor: 'white',
              }}>
                <Typography 
                  sx={{ 
                    color: '#6B7280',
                    fontSize: '14px',
                    mb: 1,
                  }}
                >
                  Leave hrs
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography 
                    sx={{ 
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#111827',
                      mr: 1,
                    }}
                  >
                    16
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#10B981',
                      fontSize: '14px',
                    }}
                  >
                    ↑ 2
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: '1px solid #E5E7EB',
                borderRadius: 2,
                bgcolor: 'white',
              }}>
                <Typography 
                  sx={{ 
                    color: '#6B7280',
                    fontSize: '14px',
                    mb: 1,
                  }}
                >
                  Issues
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography 
                    sx={{ 
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#111827',
                    }}
                  >
                    2
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Employee</StyledTableCell>
                    <StyledTableCell>Employment</StyledTableCell>
                    <StyledTableCell align="right">Regular hrs</StyledTableCell>
                    <StyledTableCell align="right">Additional hrs</StyledTableCell>
                    <StyledTableCell align="right">Leave hrs</StyledTableCell>
                    <StyledTableCell align="right">Total</StyledTableCell>
                    <StyledTableCell align="right">Comparison pay</StyledTableCell>
                    <StyledTableCell align="right">Difference</StyledTableCell>
                    <StyledTableCell align="right">Issues</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summaryData.map((employee, index) => (
                    <TableRow key={index}>
                      <StyledTableCell>{employee.name}</StyledTableCell>
                      <StyledTableCell>{employee.employment}</StyledTableCell>
                      <StyledTableCell align="right">
                        {employee.regularHrs.value}
                        {employee.regularHrs.change !== 0 && (
                          <Typography 
                            component="span" 
                            sx={{ 
                              ml: 1,
                              color: employee.regularHrs.change > 0 ? '#10B981' : '#EF4444',
                              fontSize: '14px',
                            }}
                          >
                            {employee.regularHrs.change > 0 ? '↑' : '↓'} {Math.abs(employee.regularHrs.change)}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {employee.additionalHrs.value}
                        {employee.additionalHrs.change !== 0 && (
                          <Typography 
                            component="span" 
                            sx={{ 
                              ml: 1,
                              color: employee.additionalHrs.change > 0 ? '#10B981' : '#EF4444',
                              fontSize: '14px',
                            }}
                          >
                            {employee.additionalHrs.change > 0 ? '↑' : '↓'} {Math.abs(employee.additionalHrs.change)}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {employee.leaveHrs.value}
                        {employee.leaveHrs.change !== 0 && (
                          <Typography 
                            component="span" 
                            sx={{ 
                              ml: 1,
                              color: '#10B981',
                              fontSize: '14px',
                            }}
                          >
                            ↑ {employee.leaveHrs.change}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        ${employee.total.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        ${employee.comparisonPay.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell 
                        align="right"
                        sx={{
                          color: employee.difference.value > 0 ? '#10B981' : 
                                employee.difference.value < 0 ? '#EF4444' : 'inherit',
                        }}
                      >
                        {employee.difference.value === 0 ? '0' : 
                          `${employee.difference.value < 0 ? '↓' : '↑'} $${Math.abs(employee.difference.value).toFixed(2)} (${employee.difference.percentage}%)`
                        }
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {employee.hasIssues && (
                          <Typography 
                            sx={{ 
                              color: '#EF4444',
                              fontSize: '14px',
                            }}
                          >
                            ▲
                          </Typography>
                        )}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
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

export default PayrunDetailsPage; 