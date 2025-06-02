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
  Tabs,
  Tab,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
import StartPayrunModal from './StartPayrunModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px solid #E5E7EB',
  padding: '16px 24px',
  '&.MuiTableCell-head': {
    backgroundColor: 'white',
    color: '#6B7280',
    fontWeight: 500,
    fontSize: '14px',
  },
}));

const StatusChip = styled(Chip)<{ status: 'processing' | 'ready' | 'upcoming' }>(({ status }) => ({
  borderRadius: '16px',
  height: '24px',
  fontSize: '14px',
  fontWeight: 500,
  '&.MuiChip-root': {
    backgroundColor: status === 'processing' 
      ? '#FFFAEA' 
      : status === 'ready'
      ? '#F9F9FC'
      : '#FFFFFF',
    color: '#232329',
    border: status === 'processing' 
      ? '0.8px solid #E9C16B' 
      : '0.8px solid #CACCD6',
    padding: '0 12px',
    '& .MuiChip-label': {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      fontWeight: 500,
      '&:before': {
        content: '""',
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        marginRight: '6px',
        backgroundColor: status === 'processing'
          ? '#F59E0B'
          : status === 'ready'
          ? '#9CA3AF'
          : '#9CA3AF',
      },
    },
  },
}));

const SideNavItem = styled(ListItem)<{ active?: boolean }>(({ active }) => ({
  borderRadius: '8px',
  marginBottom: '4px',
  padding: '8px 12px',
  backgroundColor: active ? '#F5F3FF' : 'transparent',
  '&:hover': {
    backgroundColor: active ? '#F5F3FF' : '#F9FAFB',
  },
  '& .MuiListItemText-primary': {
    fontSize: '14px',
    fontWeight: active ? 600 : 500,
    color: active ? '#3D1CBA' : '#374151',
  },
}));

const payRunData = [
  {
    period: '26 Feb - 2 Mar',
    paymentDate: '5 Mar',
    calendar: 'Weekly',
    wages: '$112,000.00',
    employees: 12,
    status: 'processing' as const,
  },
  {
    period: '3 Feb - 3 Mar',
    paymentDate: '6 Mar',
    calendar: 'Monthly',
    wages: '-',
    employees: 12,
    status: 'ready' as const,
  },
  {
    period: '3 Mar - 10 Mar',
    paymentDate: '13 Mar',
    calendar: 'Weekly',
    wages: '-',
    employees: 12,
    status: 'upcoming' as const,
  },
];

const PayrunsPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [selectedPayrun, setSelectedPayrun] = useState<typeof payRunData[0] | null>(null);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBackToSetup = () => {
    navigate('/setup', { state: { activeStep: 0 } });
  };

  const handleStartPayrun = (payrun: typeof payRunData[0]) => {
    setSelectedPayrun(payrun);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '240px',
          backgroundColor: 'white',
          borderRight: '1px solid #E5E7EB',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List>
          <SideNavItem active>
            <ListItemText primary="Pay runs" />
          </SideNavItem>
          <SideNavItem>
            <ListItemText primary="Superannuation" />
          </SideNavItem>
          <SideNavItem>
            <ListItemText primary="Reports" />
          </SideNavItem>
        </List>
        
        <Button
          variant="outlined"
          onClick={handleBackToSetup}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            py: 1,
            fontSize: '14px',
            fontWeight: 500,
            color: '#374151',
            borderColor: '#E5E7EB',
            mt: 2,
            '&:hover': {
              backgroundColor: '#F9FAFB',
              borderColor: '#D1D5DB',
            },
          }}
        >
          Back to setup
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, backgroundColor: 'white', py: 3, px: 7, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: '1000px', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
              Payruns
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                color: '#374151',
                borderColor: '#E5E7EB',
                px: 3,
                height: '32px',
                fontSize: '14px',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#F9FAFB',
                  borderColor: '#D1D5DB',
                },
              }}
            >
              Off cycle pay run
            </Button>
          </Box>

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
                    color: '#3D1CBA',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#3D1CBA',
                },
              }}
            >
              <Tab label="Upcoming pay runs" />
              <Tab label="Completed" />
            </Tabs>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 'none', mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Pay run</StyledTableCell>
                  <StyledTableCell>Payment Date</StyledTableCell>
                  <StyledTableCell>Pay calendar</StyledTableCell>
                  <StyledTableCell align="right">Wages</StyledTableCell>
                  <StyledTableCell align="right">Employees</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payRunData.map((row, index) => (
                  <TableRow key={index}>
                    <StyledTableCell>{row.period}</StyledTableCell>
                    <StyledTableCell>{row.paymentDate}</StyledTableCell>
                    <StyledTableCell>{row.calendar}</StyledTableCell>
                    <StyledTableCell align="right">{row.wages}</StyledTableCell>
                    <StyledTableCell align="right">{row.employees}</StyledTableCell>
                    <StyledTableCell align="right">
                      <StatusChip 
                        label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} 
                        status={row.status}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleStartPayrun(row)}
                        sx={{
                          textTransform: 'none',
                          borderRadius: '8px',
                          px: 2,
                          py: 0,
                          minHeight: '32px',
                          height: '32px',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#374151',
                          borderColor: '#E5E7EB',
                          '&:hover': {
                            backgroundColor: '#F9FAFB',
                            borderColor: '#D1D5DB',
                          },
                        }}
                      >
                        Start
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <StartPayrunModal
        open={selectedPayrun !== null}
        onClose={() => setSelectedPayrun(null)}
        payrunData={selectedPayrun || payRunData[0]}
      />
    </Box>
  );
};

export default PayrunsPage; 