import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

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
    name: 'David Stribling',
    employment: 'Full time',
    regularHrs: { value: 10, change: 5 },
    additionalHrs: { value: 2, change: 1 },
    leaveHrs: { value: 8, change: 8 },
    total: 1100.00,
    comparisonPay: 1000.00,
    difference: { value: -100.00, percentage: 10 },
    hasIssues: true,
  },
  {
    name: 'Denise Dang',
    employment: 'Full time',
    regularHrs: { value: 10, change: 5 },
    additionalHrs: { value: 2, change: 1 },
    leaveHrs: { value: 8, change: 8 },
    total: 1100.00,
    comparisonPay: 1000.00,
    difference: { value: -100.00, percentage: 10 },
    hasIssues: true,
  },
  {
    name: 'Emily Law',
    employment: 'Full time',
    regularHrs: { value: 12, change: 0 },
    additionalHrs: { value: 2, change: 1 },
    leaveHrs: { value: 8, change: 0 },
    total: 850.00,
    comparisonPay: 1000.00,
    difference: { value: 150.00, percentage: 15 },
    hasIssues: false,
  },
  {
    name: 'Jackson Taylor',
    employment: 'Full time',
    regularHrs: { value: 5, change: 0 },
    additionalHrs: { value: 0, change: -1 },
    leaveHrs: { value: 0, change: 8 },
    total: 1000.00,
    comparisonPay: 1000.00,
    difference: { value: 0, percentage: 0 },
    hasIssues: false,
  },
  {
    name: 'Jasmine Bilham',
    employment: 'Full time',
    regularHrs: { value: 5, change: 0 },
    additionalHrs: { value: 0, change: -1 },
    leaveHrs: { value: 0, change: 8 },
    total: 1000.00,
    comparisonPay: 1000.00,
    difference: { value: 0, percentage: 0 },
    hasIssues: false,
  },
  {
    name: 'Lisi Schappi',
    employment: 'Full time',
    regularHrs: { value: 5, change: 0 },
    additionalHrs: { value: 0, change: -1 },
    leaveHrs: { value: 0, change: 8 },
    total: 1000.00,
    comparisonPay: 1000.00,
    difference: { value: 0, percentage: 0 },
    hasIssues: false,
  },
  {
    name: 'Natalie Trow',
    employment: 'Full time',
    regularHrs: { value: 5, change: 0 },
    additionalHrs: { value: 0, change: -1 },
    leaveHrs: { value: 0, change: 8 },
    total: 1000.00,
    comparisonPay: 1000.00,
    difference: { value: 0, percentage: 0 },
    hasIssues: false,
  },
  {
    name: 'Ryan Gavan',
    employment: 'Full time',
    regularHrs: { value: 2, change: 3 },
    additionalHrs: { value: 1, change: 0 },
    leaveHrs: { value: 8, change: 0 },
    total: 900.00,
    comparisonPay: 1000.00,
    difference: { value: 100.00, percentage: 10 },
    hasIssues: false,
  },
  {
    name: 'Sandy Christie',
    employment: 'Full time',
    regularHrs: { value: 2, change: 3 },
    additionalHrs: { value: 1, change: 0 },
    leaveHrs: { value: 8, change: 0 },
    total: 900.00,
    comparisonPay: 1000.00,
    difference: { value: 100.00, percentage: 10 },
    hasIssues: false,
  },
];

const PayrunDetailsPage: React.FC<PayrunDetailsPageProps> = ({ payrunData }) => {
  const [tabValue, setTabValue] = useState(0);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDifference = (value: number, percentage: number) => {
    if (value === 0) return '0';
    const formattedValue = formatCurrency(Math.abs(value));
    return `${value < 0 ? '↓' : '↑'} ${formattedValue} (${percentage}%)`;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white', p: 0 }}>
      {/* Header */}
      <Box sx={{ 
        borderBottom: '1px solid #E5E7EB',
        px: 4,
        py: 2,
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            color: '#3D1CBA',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 500,
            mb: 2,
            pl: 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          Back
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              flex: 1,
              fontSize: '24px',
              fontWeight: 600,
              color: '#111827',
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Casual weekly {payrunData.period}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              sx={{
                mr: 1,
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
              endIcon={<KeyboardArrowDownIcon />}
            >
              Bulk actions
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#3D1CBA',
                '&:hover': {
                  bgcolor: '#3417A4',
                },
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                height: '36px',
              }}
            >
              Complete pay run
            </Button>
            <IconButton
              onClick={handleMenuClick}
              sx={{ ml: 1, color: '#6B7280' }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Typography 
          sx={{ 
            color: '#6B7280',
            fontSize: '14px',
            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          {payrunData.totalPayslips} payslips | Total payments: {payrunData.totalAmount}
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#E5E7EB' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            px: 4,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6B7280',
              '&.Mui-selected': {
                color: '#3D1CBA',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#3D1CBA',
            },
          }}
        >
          <Tab label="Summary" />
          <Tab label="Payslips" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ p: 4 }}>
        {tabValue === 0 && (
          <Box>
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
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
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
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
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
                      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    $4,100
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#10B981',
                      fontSize: '14px',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    ↑ 11.4%
                  </Typography>
                </Box>
              </Box>
              {/* Add similar boxes for Regular hrs, Additional hrs, Leave hrs, and Issues */}
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
                  {employeeData.map((employee, index) => (
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
                        {formatCurrency(employee.total)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {formatCurrency(employee.comparisonPay)}
                      </StyledTableCell>
                      <StyledTableCell 
                        align="right"
                        sx={{
                          color: employee.difference.value > 0 ? '#10B981' : 
                                employee.difference.value < 0 ? '#EF4444' : 'inherit',
                        }}
                      >
                        {formatDifference(employee.difference.value, employee.difference.percentage)}
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
        )}
      </Box>
    </Box>
  );
};

export default PayrunDetailsPage; 