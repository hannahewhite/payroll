import React, { useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Custom input for DatePicker that displays the value
const PayrunDateInput = React.forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
  <div className="payrun-datepicker-wrapper" onClick={onClick} style={{ cursor: 'pointer' }}>
    <input
      className="payrun-datepicker-input"
      value={value}
      readOnly
      ref={ref}
      style={{ cursor: 'pointer' }}
    />
  </div>
));

const CompletePayrunPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentDate, setPaymentDate] = useState<Date | null>(new Date('2024-03-10'));

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '320px',
          backgroundColor: 'white',
          borderRight: '1px solid #E5E7EB',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            color: '#3D1CBA',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: 16,
            mb: 2,
            alignSelf: 'flex-start',
            px: 0,
            height: '32px',
          }}
        >
          Back
        </Button>
        <Typography sx={{ fontWeight: 600, fontSize: 22, color: '#232329', mb: 0.5 }}>
          Complete payrun
        </Typography>
        <Typography sx={{ color: '#6B7280', fontSize: 16, mb: 3 }}>
          Casual weekly<br />26 Feb - 2 Mar 2024
        </Typography>
        <List sx={{ p: 0 }}>
          <ListItem sx={{ p: 0, mb: 1 }}>
            <Box sx={{
              bgcolor: '#F5F3FF',
              borderRadius: '8px',
              px: 2,
              py: 1,
              width: '100%',
            }}>
              <Typography sx={{ color: '#3D1CBA', fontWeight: 600, fontSize: 16 }}>
                1. Pay your team
              </Typography>
            </Box>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <Typography sx={{ color: '#6B7280', fontWeight: 500, fontSize: 16, ml: 2 }}>
              2. Submit to ATO
            </Typography>
          </ListItem>
        </List>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 6, bgcolor: 'white', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 790 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, color: '#232329' }}>
            Pay your team
          </Typography>
          {/* Step 1 */}
          <Box sx={{ bgcolor: '#F9F9FC', borderRadius: 2, p: 3, mb: 3, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 16, color: '#232329' }}>1. Confirm payment date</Typography>
              <Typography sx={{ color: '#6B7280', fontSize: 14 }}>This is the date the team members will receive their pay.</Typography>
            </Box>
            <Box sx={{ width: 140 }}>
              <DatePicker
                selected={paymentDate}
                onChange={date => setPaymentDate(date)}
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-end"
                wrapperClassName="payrun-datepicker-wrapper"
                customInput={<PayrunDateInput />}
                withPortal
              />
            </Box>
          </Box>
          {/* Step 2 */}
          <Box sx={{ bgcolor: '#F9F9FC', borderRadius: 2, p: 3, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16, color: '#232329' }}>2. Download the ABA file</Typography>
              <Typography sx={{ color: '#6B7280', fontSize: 14 }}>This file contains a summary of how much each team member should be paid.</Typography>
            </Box>
            <Button 
              variant="text" 
              sx={{ 
                color: '#3D1CBA',
                fontWeight: 600, 
                fontSize: 14, 
                textTransform: 'none', 
                borderRadius: 2, 
                px: 2,
                height: '32px',
                minWidth: '100px',
                bgcolor: 'transparent',
                border: 'none',
                '&:hover': {
                  bgcolor: 'rgba(61,29,186,0.08)',
                  color: '#3019A0',
                },
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3.333v10M10 13.333l-3.333-3.333M10 13.333l3.333-3.333" stroke="#3D1CBA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3.333" y="16.667" width="13.333" height="1.667" rx="0.833" fill="#3D1CBA"/>
                </svg>
                Download
              </span>
            </Button>
          </Box>
          {/* Step 3 */}
          <Box sx={{ bgcolor: '#F9F9FC', borderRadius: 2, p: 3, mb: 3 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16, color: '#232329' }}>3. Upload your ABA file to your bank</Typography>
            <Typography sx={{ color: '#6B7280', fontSize: 14 }}>Upload the file with you bank and schedule the payment of your team members.</Typography>
          </Box>
          {/* Step 4 */}
          <Box sx={{ bgcolor: '#F9F9FC', borderRadius: 2, p: 3, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16, color: '#232329' }}>4. Confirm pay scheduled</Typography>
              <ul style={{ color: '#6B7280', fontSize: 14, margin: '8px 0 0 20px', padding: 0 }}>
                <li>This will lock the pay run</li>
                <li>You will no longer be able to download the ABA file</li>
                <li>Timesheets will be marked as paid</li>
                <li>In order to make changes you will need to unlock the pay run</li>
              </ul>
              <Typography sx={{ color: '#6B7280', fontSize: 14, mt: 2 }}>
                Payslips will be sent to your team members on the 10th of March
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              onClick={() => navigate('/payruns/1/submit-ato')}
              sx={{ 
                bgcolor: '#3D1CBA', 
                color: 'white', 
                textTransform: 'none', 
                height: '32px',
                '&:hover': { bgcolor: '#3019A0' },
              }}
            >
              Confirm & continue
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompletePayrunPage; 