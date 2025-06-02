import React from 'react';
import { Box, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.root}`]: {
    marginLeft: '12px',
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#E5E7EB',
    borderLeftWidth: 2,
    minHeight: 40,
  },
}));

const steps = [
  { label: 'Business details', path: 'setup/business-details' },
  { label: 'Payroll details', path: 'setup/payroll-details' },
  { label: 'Pay calendars', path: 'setup/pay-calendars' },
  { label: 'Account security', path: 'setup/account-security' },
];

const SetupStepper: React.FC = () => {
  const location = useLocation();
  const currentStep = steps.findIndex(step => location.pathname.includes(step.path.split('/')[1]));

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      pt: 4,
      pl: 8
    }}>
      <Stepper 
        activeStep={currentStep} 
        orientation="vertical"
        connector={<CustomConnector />}
      >
        {steps.map((step) => (
          <Step 
            key={step.label}
            sx={{
              '& .MuiStepLabel-root': {
                padding: '8px 24px 8px 0',
              },
              '& .MuiStepLabel-iconContainer': {
                paddingRight: '12px',
              },
              '& .MuiStepLabel-label': {
                color: location.pathname.includes(step.path) ? '#3D1CBA' : '#6B7280',
                fontWeight: location.pathname.includes(step.path) ? 600 : 400,
                fontSize: '14px',
                '&.Mui-active': {
                  color: '#3D1CBA',
                  fontWeight: 600,
                },
                '&.Mui-completed': {
                  color: '#1E163C',
                  fontWeight: 600,
                },
              },
              '& .MuiStepIcon-root': {
                color: '#FFFFFF',
                border: '2px solid #E5E7EB',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                '&.Mui-active': {
                  color: '#3D1CBA',
                  border: 'none',
                },
                '&.Mui-completed': {
                  backgroundColor: '#232329',
                  border: 'none',
                  'path': {
                    fill: '#EFF0F3',
                  }
                },
              },
            }}
          >
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default SetupStepper; 