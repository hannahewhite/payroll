import React from 'react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import PayrunsPage from './components/PayrunsPage';
import BusinessDetails from './components/BusinessDetails';
import PayrollDetails from './components/PayrollDetails';
import PayCalendars from './components/PayCalendars';
import AccountSecurity from './components/AccountSecurity';
import SetupLayout from './components/SetupLayout';
import PayrunDetailsPage from './components/PayrunDetailsPage';
import OffboardingFlow from './components/OffboardingFlow';
import theme from './theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', position: 'relative' }}>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/payruns" element={<PayrunsPage />} />
            <Route path="/payruns/:id" element={
              <PayrunDetailsPage 
                payrunData={{
                  period: '26 Feb - 2 Mar',
                  totalPayslips: 12,
                  totalAmount: '$112,000.00',
                }}
              />
            } />
            <Route path="/setup" element={<SetupLayout />}>
              <Route path="business-details" element={<BusinessDetails />} />
              <Route path="payroll-details" element={<PayrollDetails />} />
              <Route path="pay-calendars" element={<PayCalendars />} />
              <Route path="account-security" element={<AccountSecurity />} />
            </Route>
            <Route path="/offboarding/*" element={<OffboardingFlow />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
