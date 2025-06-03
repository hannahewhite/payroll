import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  InputAdornment,
  Alert,
  Link,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';

interface CreatePayCalendarModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payCalendar: {
    name: string;
    frequency: string;
    startDay: string;
    businessEntity?: string;
  }) => void;
}

const CreatePayCalendarModal: React.FC<CreatePayCalendarModalProps> = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('Weekly');
  const [startDay, setStartDay] = useState('Monday');
  const [hasBusinessEntity, setHasBusinessEntity] = useState('no');
  const [businessEntity, setBusinessEntity] = useState('');

  const handleSubmit = () => {
    onSubmit({
      name,
      frequency,
      startDay,
      ...(hasBusinessEntity === 'yes' && { businessEntity })
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: '#FFFFFF',
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Content */}
          <Box sx={{ 
            p: 3, 
            maxWidth: '1000px', 
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Back Navigation */}
            <Box sx={{ mb: 1 }}>
              <Link
                onClick={onClose}
                component="button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#3D1CBA',
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    color: '#3315A0'
                  }
                }}
              >
                <ArrowBackIcon fontSize="small" />
                Back to Setup
              </Link>
            </Box>

            <Typography variant="h4" sx={{ mb: 2, fontSize: '30px', fontWeight: 600 }}>
              Create pay calendar
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Pay calendars will determine the frequency assigned team members get paid
            </Typography>

            {/* Form Fields */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
              {/* Pay Calendar Name */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Pay calendar name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Weekly"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    width: '300px',
                    '& .MuiOutlinedInput-root': {
                      height: '32px',
                    }
                  }}
                />
              </Box>

              {/* Frequency */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Frequency
                </Typography>
                <FormControl sx={{ width: '300px' }}>
                  <Select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    size="small"
                    IconComponent={ExpandMoreIcon}
                    sx={{
                      height: '32px',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E7EB',
                        borderRadius: '8px'
                      },
                      '& .MuiSelect-select': {
                        pt: 0.75,
                        pb: 0.75,
                        fontSize: '14px'
                      }
                    }}
                  >
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Fortnightly">Fortnightly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Starting */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Starting
                </Typography>
                <FormControl sx={{ width: '300px' }}>
                  <Select
                    value={startDay}
                    onChange={(e) => setStartDay(e.target.value)}
                    size="small"
                    IconComponent={ExpandMoreIcon}
                    sx={{
                      height: '32px',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E7EB',
                        borderRadius: '8px'
                      },
                      '& .MuiSelect-select': {
                        pt: 0.75,
                        pb: 0.75,
                        fontSize: '14px'
                      }
                    }}
                  >
                    <MenuItem value="Monday">Monday</MenuItem>
                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                    <MenuItem value="Thursday">Thursday</MenuItem>
                    <MenuItem value="Friday">Friday</MenuItem>
                  </Select>
                </FormControl>
                <Alert 
                  icon={<InfoIcon />}
                  severity="info"
                  sx={{ 
                    mt: 2,
                    width: '70%',
                    bgcolor: '#F9F9FB',
                    color: '#111827',
                    borderRadius: '8px',
                    fontWeight: 500,
                    '& .MuiAlert-icon': {
                      color: '#3D1CBA'
                    }
                  }}
                >
                  Next pay run will be Mon, 10 Jan - Mon, 17 Jan
                </Alert>
              </Box>

              {/* Business Entity */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Business entity
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Does this pay calendar belong to a specific business entity?
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Button
                    component="a"
                    href="#"
                    sx={{
                      color: '#6366F1',
                      textTransform: 'none',
                      p: 0,
                      minWidth: 'auto',
                      fontWeight: 400,
                      '&:hover': {
                        bgcolor: 'transparent',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Learn more
                  </Button>
                </Box>
                <FormControl>
                  <RadioGroup
                    value={hasBusinessEntity}
                    onChange={(e) => setHasBusinessEntity(e.target.value)}
                    row
                  >
                    <FormControlLabel 
                      value="no" 
                      control={
                        <Radio 
                          sx={{
                            color: '#E5E7EB',
                            '&.Mui-checked': {
                              color: '#3D1CBA',
                            }
                          }}
                        />
                      } 
                      label="No"
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '14px'
                        }
                      }}
                    />
                    <FormControlLabel 
                      value="yes" 
                      control={
                        <Radio 
                          sx={{
                            color: '#E5E7EB',
                            '&.Mui-checked': {
                              color: '#3D1CBA',
                            }
                          }}
                        />
                      } 
                      label="Yes"
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '14px'
                        }
                      }}
                    />
                  </RadioGroup>
                </FormControl>
                {hasBusinessEntity === 'yes' && (
                  <FormControl sx={{ width: '300px', mt: 2 }}>
                    <Select
                      value={businessEntity}
                      onChange={(e) => setBusinessEntity(e.target.value)}
                      size="small"
                      displayEmpty
                      IconComponent={ExpandMoreIcon}
                      sx={{
                        height: '32px',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#E5E7EB',
                        },
                        '& .MuiSelect-select': {
                          pt: 0.75,
                          pb: 0.75,
                          fontSize: '14px'
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        Cromer business entity - 123432432
                      </MenuItem>
                      <MenuItem value="Cromer business entity">Cromer business entity - 123432432</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Box>
            </Box>

            {/* Create Button */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              borderTop: '1px solid #E5E7EB',
              pt: 3
            }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  bgcolor: '#3D1CBA',
                  '&:hover': { bgcolor: '#3315A0' },
                  textTransform: 'none',
                  height: '36px',
                  px: 3,
                }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePayCalendarModal; 