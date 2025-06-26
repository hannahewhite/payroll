import React, { useState } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, Avatar, Link, IconButton, Tooltip, List, ListItem } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SubmitToATOPage: React.FC = () => {
  const [reportType, setReportType] = useState('submit');
  const [isFinal, setIsFinal] = useState('no');
  const navigate = useNavigate();

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
          onClick={() => navigate(-1)}
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
          <ListItem 
            sx={{ 
              p: 0, 
              mb: 1,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'transparent',
              }
            }}
            onClick={() => navigate('/payruns/1/complete')}
          >
            <Typography sx={{ color: '#6B7280', fontWeight: 500, fontSize: 16, ml: 2 }}>
              1. Pay your team
            </Typography>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <Box sx={{
              bgcolor: '#F5F3FF',
              borderRadius: '8px',
              px: 2,
              py: 1,
              width: '100%',
            }}>
              <Typography sx={{ color: '#3D1CBA', fontWeight: 600, fontSize: 16 }}>
                2. Submit to ATO
              </Typography>
            </Box>
          </ListItem>
        </List>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, bgcolor: 'white' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#23213D', mb: 1 }}>
          Submit payroll data to ATO
        </Typography>
        <Typography sx={{ color: '#8B8BA1', fontSize: 20, mb: 5 }}>
          To process pay please submit your payroll data to the ATO
        </Typography>
        <Box sx={{
          position: 'relative',
          width: 600,
          bgcolor: '#FAF9FF',
          borderRadius: 4,
          boxShadow: '0 2px 8px 0 rgba(16,24,40,0.04)',
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          {/* Avatar */}
          <Avatar
            src="https://randomuser.me/api/portraits/men/32.jpg"
            sx={{
              position: 'absolute',
              top: -28,
              right: 32,
              width: 48,
              height: 48,
              border: '4px solid #fff',
              boxShadow: '0 2px 8px 0 rgba(16,24,40,0.08)',
            }}
          />
          {/* Report Type */}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 20, color: '#23213D', mr: 1 }}>
                What kind of report are you lodging?
              </Typography>
              <Tooltip title="What does this mean?">
                <IconButton size="small" sx={{ color: '#B0B0C3' }}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <RadioGroup
              row
              value={reportType}
              onChange={e => setReportType(e.target.value)}
              sx={{ mb: 3 }}
            >
              <FormControlLabel value="submit" control={<Radio sx={{ color: '#6B28F7', '&.Mui-checked': { color: '#6B28F7' } }} />} label={<Typography sx={{ fontWeight: 600, fontSize: 18, color: '#23213D' }}>Submit</Typography>} />
              <FormControlLabel value="update" control={<Radio sx={{ color: '#6B28F7', '&.Mui-checked': { color: '#6B28F7' } }} />} label={<Typography sx={{ fontWeight: 600, fontSize: 18, color: '#23213D' }}>Update</Typography>} />
            </RadioGroup>
            <Box sx={{ borderBottom: '1px solid #E4E2F8', mb: 3 }} />
          </Box>
          {/* End of Year Final Submission */}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 20, color: '#23213D', mr: 1 }}>
                Is this an end of year final submission?
              </Typography>
              <Tooltip title="Is this your final STP submission for the year?">
                <IconButton size="small" sx={{ color: '#B0B0C3' }}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <RadioGroup
              row
              value={isFinal}
              onChange={e => setIsFinal(e.target.value)}
              sx={{ mb: 1 }}
            >
              <FormControlLabel value="yes" control={<Radio sx={{ color: '#6B28F7', '&.Mui-checked': { color: '#6B28F7' } }} />} label={<Typography sx={{ fontWeight: 600, fontSize: 18, color: '#23213D' }}>Yes</Typography>} />
              <FormControlLabel value="no" control={<Radio sx={{ color: '#6B28F7', '&.Mui-checked': { color: '#6B28F7' } }} />} label={<Typography sx={{ fontWeight: 600, fontSize: 18, color: '#23213D' }}>No</Typography>} />
            </RadioGroup>
            <Typography sx={{ color: '#8B8BA1', fontSize: 16, mb: 3 }}>
              A finalisation declaration needs to be submitted 14 July each year.{' '}
              <Link href="#" sx={{ color: '#6B28F7', fontWeight: 500, textDecoration: 'underline', cursor: 'pointer' }}>More information</Link>
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#3D1CBA',
              color: '#fff',
              fontWeight: 600,
              fontSize: 18,
              borderRadius: 2,
              px: 5,
              py: 1.5,
              mt: 2,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#3019A0',
                boxShadow: 'none',
              },
            }}
          >
            Review
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubmitToATOPage; 