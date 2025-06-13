import React from 'react';
import {
  Box,
  Typography,
  Alert,
  Button,
  IconButton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WarningIcon from '@mui/icons-material/Warning';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
  documentUrl?: string;
  archiveOption: string;
}

const Review: React.FC<ReviewProps> = ({
  firstName = 'Team member',
  terminationDate = '7 Apr 2025',
  lastWorkingDate = '27 May 2025',
  reasonForLeaving = 'Resigned',
  atoReason = 'Voluntary cessation',
  sentiment = 'Regrettable',
  comments = '',
  upcomingShifts = 2,
  pendingTimesheets = 15,
  unprocessedPayRuns = 2,
  documentUrl,
  archiveOption = '',
}) => {
  // Helper function to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatValue = (value: string) => {
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

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
        fontFamily: isDate ? '-apple-system, "SF Pro", "SF Pro Display"' : 'inherit',
        fontStyle: !value ? 'italic' : 'normal'
      }}>
        {isDate ? formatDate(value) : (label === "Reason for leaving" || label === "ATO reason" || label === "Sentiment") ? formatValue(value) : value || ''}
      </Typography>
    </Box>
  );

  const ActionRow = ({ 
    label, 
    value, 
    buttonText, 
    onClick,
    isUpcomingShift = false
  }: { 
    label: string; 
    value: string; 
    buttonText: string;
    onClick: () => void;
    isUpcomingShift?: boolean;
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
        width: '300px',
        gap: 2
      }}>
        <Box sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: isUpcomingShift ? '#F59E0B' : '#D7AA41'
        }} />
        <Typography sx={{ 
          color: '#111827',
          fontSize: '14px'
        }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ 
        width: '300px'
      }}>
        <Typography sx={{ 
          color: '#111827',
          fontSize: '14px'
        }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <Button
          variant="outlined"
          endIcon={<OpenInNewIcon />}
          onClick={onClick}
          sx={{
            color: '#374151',
            borderColor: '#E5E7EB',
            height: '32px',
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.04)',
              borderColor: '#6366F1',
            },
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
        Review details
      </Typography>

      <Alert 
        severity="warning"
        icon={<WarningIcon sx={{ color: '#D7AA41' }} />}
        sx={{ 
          mb: 4,
          backgroundColor: '#FFFAEA',
          color: '#232329',
          '& .MuiAlert-icon': {
            color: '#D7AA41'
          },
          border: '1px solid #E9C16B',
          borderRadius: '8px',
          fontFamily: '-apple-system, "SF Pro", "SF Pro Display"'
        }}
      >
        {archiveOption === 'immediately' 
          ? `${firstName} will be archived immediately once confirming`
          : archiveOption === 'manual'
          ? `You have selected to manually archive ${firstName}.`
          : `${firstName} will be archived on ${formatDate(lastWorkingDate)} at 11:00pm if there are no upcoming shifts`
        }
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
          <Box sx={{ 
            display: 'flex', 
            borderBottom: '1px solid #E5E7EB',
            py: '12px',
            alignItems: 'center',
          }}>
            <Typography sx={{ 
              color: '#111827', 
              width: '300px',
              fontSize: '14px'
            }}>
              Supporting document
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              {documentUrl ? (
                <Button
                  variant="outlined"
                  startIcon={<AttachFileIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    color: '#374151',
                    borderColor: '#E5E7EB',
                    height: '32px',
                    textTransform: 'none',
                    fontSize: '14px',
                    borderRadius: '8px',
                    minWidth: '0',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.04)',
                      borderColor: '#6366F1',
                    },
                  }}
                  onClick={() => window.open(documentUrl, '_blank', 'noopener,noreferrer')}
                >
                  Preview document
                </Button>
              ) : (
                <Typography sx={{ color: '#6B7280', fontStyle: 'italic', fontSize: '14px' }}>
                  No document uploaded
                </Typography>
              )}
            </Box>
          </Box>
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
            isUpcomingShift={true}
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