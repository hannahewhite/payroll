import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/setup/business-details');
  };

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Typography 
              component="span" 
              sx={{ 
                fontSize: '32px',
                fontWeight: 600,
                color: '#1A1A1A',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              payroll
              <Box 
                component="img" 
                src="/deputy-asterisk.svg" 
                sx={{ 
                  width: '24px',
                  height: '24px',
                  mt: '4px'
                }} 
                alt="Deputy asterisk"
              />
            </Typography>
          </Box>

          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: '40px', 
              fontWeight: 600,
              color: '#1A1A1A',
              mb: 2,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.2
            }}
          >
            Turn Deputy into your all-in-one solution with our new single touch payroll
          </Typography>

          <Button
            variant="contained"
            onClick={handleGetStarted}
            sx={{
              mt: 4,
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              backgroundColor: '#3D1CBA',
              '&:hover': {
                backgroundColor: '#2F1590',
              },
            }}
          >
            Get started
          </Button>
        </Box>

        <Box sx={{ position: 'relative', mb: 8 }}>
          <Box 
            sx={{ 
              width: '100%',
              height: '500px',
              bgcolor: '#000',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Video placeholder */}
          </Box>
        </Box>

        {/* @ts-ignore */}
        <Grid container spacing={4}>
          {/* @ts-ignore */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: 'none',
              border: '1px solid #E5E7EB',
              borderRadius: 2,
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <img src="/timesheet-icon.png" alt="Timesheet" style={{ width: '100%' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Zero click timesheet exports
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Approved timesheets are automatically brought into the corresponding pay run.
                </Typography>
                <Button 
                  variant="text" 
                  sx={{ 
                    color: '#3D1CBA',
                    p: 0,
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* @ts-ignore */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: 'none',
              border: '1px solid #E5E7EB',
              borderRadius: 2,
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <img src="/multi-entity-icon.png" alt="Multi entity" style={{ width: '100%' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Multi entity processing
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Set up multiple businesses and run a separate payroll within your one account.
                </Typography>
                <Button 
                  variant="text" 
                  sx={{ 
                    color: '#3D1CBA',
                    p: 0,
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* @ts-ignore */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: 'none',
              border: '1px solid #E5E7EB',
              borderRadius: 2,
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <img src="/payslip-icon.png" alt="Payslip" style={{ width: '100%' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Instant payslips on mobile
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Once payroll is finalised, team members can access their payslips via the mobile app.
                </Typography>
                <Button 
                  variant="text" 
                  sx={{ 
                    color: '#3D1CBA',
                    p: 0,
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WelcomeScreen; 