import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface ArchiveDateProps {
  onNext: () => void;
  onBack: () => void;
  archiveDate: Date | null;
  setArchiveDate: (date: Date | null) => void;
}

const ArchiveDate: React.FC<ArchiveDateProps> = ({
  onNext,
  onBack,
  archiveDate,
  setArchiveDate,
}) => {
  return (
    <Box sx={{ p: 4, maxWidth: '600px' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Select Archive Date
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Choose when this employee's data should be archived. After this date, their information will be moved to the archive section.
      </Typography>
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Archive Date"
          value={archiveDate}
          onChange={(newValue: Date | null) => setArchiveDate(newValue)}
          sx={{ width: '100%', mb: 4 }}
          minDate={new Date()} // Can't select dates in the past
        />
      </LocalizationProvider>
    </Box>
  );
};

export default ArchiveDate; 