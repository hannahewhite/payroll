import React from 'react';
import {
  Box,
  Typography,
  Alert,
  Button,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ReviewProps {
  firstName: string;
  terminationDate: string;
  lastWorkingDate: string;
  reasonForLeaving: string;
  atoReason: string;
  sentiment: string;
  comments: string;
  upcomingShifts: number;
  pendingTimesheets: number;
  unprocessedPayRuns: number;
}

const Review: React.FC<ReviewProps> = ({
  firstName = 'Team member',
  terminationDate = '7 Apr 2025',
  lastWorkingDate = '27 May 2025',
  reasonForLeaving = 'Resigned',
  atoReason = 'Voluntary cessation',
  sentiment = 'Regrettable',
  comments = 'Going for a lap around Australia',
  upcomingShifts = 2,
  pendingTimesheets = 15,
  unprocessedPayRuns = 2,
}) => {
  const DetailRow = ({ label, value, isDate }: { label: string; value: string; isDate?: boolean }) => (
    <Box sx={{ 
      display: 'flex', 
      borderBottom: '1px solid #E5E7EB',
      py: '12px',
      '&:last-child': {
        borderBottom: 'none',
      }
    }}>
      <Typography sx={{ 
        color: '#111827', 
        width: '300px',
        fontSize: '14px'
      }}>
        {label}
      </Typography>
      <Typography sx={{ 
        color: '#111827', 
        flex: 1,
        fontSize: '14px',
        fontFamily: isDate ? '-apple-system, "SF Pro", "SF Pro Display"' : 'inherit'
      }}>
        {value}
      </Typography>
    </Box>
  );

  const ActionRow = ({ 
    label, 
    value, 
    buttonText, 
    onClick 
  }: { 
    label: string; 
    value: string; 
    buttonText: string;
    onClick: () => void;
  }) => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      borderBottom: '1px solid #E5E7EB',
      py: '12px',
      '&:last-child': {
        borderBottom: 'none',
      }
    }}>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        gap: 2
      }}>
        <Box sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: '#F59E0B'
        }} />
        <Typography sx={{ 
          color: '#111827',
          fontSize: '14px'
        }}>
          {label}
        </Typography>
      </Box>
      <Typography sx={{ 
        color: '#111827', 
        mr: 4,
        fontSize: '14px'
      }}>
        {value}
      </Typography>
      <Button
        variant="text"
        endIcon={<ArrowForwardIcon />}
        onClick={onClick}
        sx={{
          color: '#374151',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.04)',
          },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
        Review details
      </Typography>

      <Alert 
        severity="warning" 
        sx={{ 
          mb: 4,
          backgroundColor: '#FFFBEB',
          color: '#92400E',
          '& .MuiAlert-icon': {
            color: '#92400E'
          },
          border: '1px solid #FEF3C7',
        }}
      >
        {firstName} will be archived on the {lastWorkingDate} at 11:59pm if there are no upcoming shifts.
      </Alert>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#111827' }}>
          Offboarding details for {firstName}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <DetailRow label="Termination date" value={terminationDate} isDate />
          <DetailRow label="Last date of employment" value={lastWorkingDate} isDate />
          <DetailRow label="Reason for leaving" value={reasonForLeaving} />
          <DetailRow label="ATO reason" value={atoReason} />
          <DetailRow label="Sentiment" value={sentiment} />
          <DetailRow label="Comments" value={comments} />
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1, color: '#111827' }}>
          To do before archive
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: '#6B7280' }}>
          Tasks to action before team member is archived.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ActionRow 
            label="Upcoming shifts" 
            value={`${upcomingShifts} shifts`}
            buttonText="View shifts"
            onClick={() => {}}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 1, color: '#111827' }}>
          Next steps
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: '#6B7280' }}>
          Recommended tasks to complete but not required before archiving.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ActionRow 
            label="Approve timesheets" 
            value={`${pendingTimesheets} pending timesheets`}
            buttonText="Go to timesheets"
            onClick={() => {}}
          />
          <ActionRow 
            label="Process outstanding pay" 
            value={`${unprocessedPayRuns} unprocessed pay runs`}
            buttonText="Go to payroll"
            onClick={() => {}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Review; 