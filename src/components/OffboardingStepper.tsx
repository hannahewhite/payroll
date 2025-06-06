import React from 'react';
import { Box, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.root}`]: {
    marginLeft: '12px',
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#E5E7EB',
    borderLeftWidth: 1,
    minHeight: 16,
  },
}));

const steps = [
  { label: 'Offboarding details', path: 'offboarding-details' },
  { label: 'Archive date', path: 'archive-date' },
  { label: 'Upcoming shifts', path: 'upcoming-shifts' },
  { label: 'Review', path: 'review' }
];

interface OffboardingStepperProps {
  activeStep: number;
}

const OffboardingStepper: React.FC<OffboardingStepperProps> = ({ activeStep }) => {
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
        activeStep={activeStep} 
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
                color: activeStep === steps.indexOf(step) ? '#3D1CBA' : '#6B7280',
                fontWeight: activeStep === steps.indexOf(step) ? 600 : 400,
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
                border: '0.8px solid #E5E7EB',
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

export default OffboardingStepper; 