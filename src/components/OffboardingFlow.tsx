import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  SelectChangeEvent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import OffboardingStepper from './OffboardingStepper';
import UpcomingShifts from './UpcomingShifts';
import Review from './Review';

interface FormData {
  terminationDate: Date | null;
  lastWorkingDate: Date | null;
  reasonForLeaving: string;
  atoReason: string;
  sentiment: string;
  comments: string;
  archiveOption: string;
  archiveTime: string;
}

const OffboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    terminationDate: null,
    lastWorkingDate: null,
    reasonForLeaving: '',
    atoReason: '',
    sentiment: '',
    comments: '',
    archiveOption: '',
    archiveTime: '11:59pm',
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 0) {
      navigate('/');
    } else {
      setStep(step - 1);
    }
  };

  const handleDateChange = (field: keyof Pick<FormData, 'terminationDate' | 'lastWorkingDate'>) => (date: Date | null) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSelectChange = (field: keyof Pick<FormData, 'reasonForLeaving' | 'atoReason' | 'archiveTime'>) => (
    event: SelectChangeEvent<string>
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleRadioChange = (field: keyof Pick<FormData, 'sentiment' | 'archiveOption'>) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleTextChange = (field: keyof Pick<FormData, 'comments'>) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
              Enter Offboarding details
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  Termination date
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: '#6B7280', fontSize: '14px' }}>
                  When the employee handed in their resignation
                </Typography>
                <DatePicker
                  selected={formData.terminationDate}
                  onChange={handleDateChange('terminationDate')}
                  dateFormat="dd MMM yyyy"
                  placeholderText="Select date"
                  className="custom-datepicker"
                  wrapperClassName="custom-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: '32px',
                        width: '300px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  }
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  Last date of employment
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: '#6B7280', fontSize: '14px' }}>
                  When the employee will finish up at the company
                </Typography>
                <DatePicker
                  selected={formData.lastWorkingDate}
                  onChange={handleDateChange('lastWorkingDate')}
                  dateFormat="dd MMM yyyy"
                  placeholderText="Select date"
                  className="custom-datepicker"
                  wrapperClassName="custom-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: '32px',
                        width: '300px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  }
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  Reason for leaving
                </Typography>
                <Select
                  fullWidth
                  value={formData.reasonForLeaving}
                  onChange={handleSelectChange('reasonForLeaving')}
                  displayEmpty
                  sx={{
                    height: '32px',
                    width: '300px',
                    '& .MuiSelect-select': {
                      padding: '6px 12px',
                      fontSize: '14px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D1D5DB',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3D1CBA',
                    },
                  }}
                >
                  <MenuItem value="" disabled>Select</MenuItem>
                  <MenuItem value="new_opportunity">New opportunity</MenuItem>
                  <MenuItem value="retirement">Retirement</MenuItem>
                  <MenuItem value="relocation">Relocation</MenuItem>
                  <MenuItem value="personal">Personal reasons</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  ATO reason
                </Typography>
                <Select
                  fullWidth
                  value={formData.atoReason}
                  onChange={handleSelectChange('atoReason')}
                  displayEmpty
                  sx={{
                    height: '32px',
                    width: '300px',
                    '& .MuiSelect-select': {
                      padding: '6px 12px',
                      fontSize: '14px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D1D5DB',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3D1CBA',
                    },
                  }}
                >
                  <MenuItem value="" disabled>Select</MenuItem>
                  <MenuItem value="voluntary">Voluntary cessation</MenuItem>
                  <MenuItem value="redundancy">Redundancy</MenuItem>
                  <MenuItem value="dismissal">Dismissal</MenuItem>
                  <MenuItem value="contract_end">Contract end</MenuItem>
                </Select>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  Sentiment
                </Typography>
                <RadioGroup
                  value={formData.sentiment}
                  onChange={handleRadioChange('sentiment')}
                  sx={{
                    '& .MuiFormControlLabel-root': {
                      marginBottom: '4px',
                    },
                  }}
                >
                  <FormControlLabel 
                    value="regrettable" 
                    control={
                      <Radio 
                        sx={{
                          color: '#E5E7EB',
                          '&.Mui-checked': {
                            color: '#3D1CBA',
                          },
                        }}
                      />
                    } 
                    label="Regrettable"
                    sx={{ 
                      '& .MuiFormControlLabel-label': { 
                        fontSize: '14px',
                        color: '#111827'
                      }
                    }}
                  />
                  <FormControlLabel 
                    value="non-regrettable" 
                    control={
                      <Radio 
                        sx={{
                          color: '#E5E7EB',
                          '&.Mui-checked': {
                            color: '#3D1CBA',
                          },
                        }}
                      />
                    } 
                    label="Non-regrettable"
                    sx={{ 
                      '& .MuiFormControlLabel-label': { 
                        fontSize: '14px',
                        color: '#111827'
                      }
                    }}
                  />
                </RadioGroup>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  Comments
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: '#6B7280', fontSize: '14px' }}>
                  (optional)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Add any additional information"
                  value={formData.comments}
                  onChange={handleTextChange('comments')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '14px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E7EB',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D1D5DB',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3D1CBA',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '12px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#111827' }}>
              Select when you want to archive employee
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FormControlLabel
                value="immediately"
                control={
                  <Radio 
                    checked={formData.archiveOption === 'immediately'}
                    onChange={handleRadioChange('archiveOption')}
                    sx={{
                      color: '#E5E7EB',
                      '&.Mui-checked': {
                        color: '#3D1CBA',
                      },
                      marginTop: '2px',
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ color: '#111827', fontSize: '14px', fontWeight: 500, lineHeight: '20px' }}>
                      Immediately
                    </Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '14px', mt: 0.5 }}>
                      Michaella will be archived as soon as this flow is completed
                    </Typography>
                  </Box>
                }
                sx={{ 
                  alignItems: 'flex-start',
                  margin: 0,
                  padding: '16px',
                  border: '1px solid',
                  borderColor: formData.archiveOption === 'immediately' ? '#3D1CBA' : '#E5E7EB',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                }}
              />

              <FormControlLabel
                value="lastDay"
                control={
                  <Radio 
                    checked={formData.archiveOption === 'lastDay'}
                    onChange={handleRadioChange('archiveOption')}
                    sx={{
                      color: '#E5E7EB',
                      '&.Mui-checked': {
                        color: '#3D1CBA',
                      },
                      marginTop: '2px',
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ color: '#111827', fontSize: '14px', fontWeight: 500, lineHeight: '20px' }}>
                      On last day of employment
                    </Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '14px', mt: 0.5 }}>
                      If all outstanding items are complete, Michaella will be archived on their final day of employment - {formData.lastWorkingDate ? formData.lastWorkingDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not set'}
                    </Typography>
                  </Box>
                }
                sx={{ 
                  alignItems: 'flex-start',
                  margin: 0,
                  marginTop: '12px',
                  padding: '16px',
                  border: '1px solid',
                  borderColor: formData.archiveOption === 'lastDay' ? '#3D1CBA' : '#E5E7EB',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                }}
              />

              <FormControlLabel
                value="manual"
                control={
                  <Radio 
                    checked={formData.archiveOption === 'manual'}
                    onChange={handleRadioChange('archiveOption')}
                    sx={{
                      color: '#E5E7EB',
                      '&.Mui-checked': {
                        color: '#3D1CBA',
                      },
                      marginTop: '2px',
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#111827', fontSize: '14px', fontWeight: 500, lineHeight: '20px' }}>
                    I will do this manually
                  </Typography>
                }
                sx={{ 
                  alignItems: 'flex-start',
                  margin: 0,
                  marginTop: '12px',
                  padding: '16px',
                  border: '1px solid',
                  borderColor: formData.archiveOption === 'manual' ? '#3D1CBA' : '#E5E7EB',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                }}
              />

              {(formData.archiveOption === 'immediately' || formData.archiveOption === 'lastDay') && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                    Archive time
                  </Typography>
                  <Select
                    fullWidth
                    value={formData.archiveTime}
                    onChange={handleSelectChange('archiveTime')}
                    sx={{
                      height: '32px',
                      '& .MuiSelect-select': {
                        padding: '6px 12px',
                        fontSize: '14px',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E7EB',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D1D5DB',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3D1CBA',
                      },
                    }}
                  >
                    <MenuItem value="11:59pm">11:59pm</MenuItem>
                    <MenuItem value="12:00am">12:00am</MenuItem>
                  </Select>
                </Box>
              )}
            </Box>
          </Box>
        );
      case 2:
        return <UpcomingShifts onNext={handleNext} onBack={handleBack} />;
      case 3:
        return (
          <Review
            firstName="Michaella"
            terminationDate={formData.terminationDate ? new Date(formData.terminationDate).toLocaleDateString() : '7 Apr 2025'}
            lastWorkingDate={formData.lastWorkingDate ? new Date(formData.lastWorkingDate).toLocaleDateString() : '27 May 2025'}
            reasonForLeaving={formData.reasonForLeaving || 'Resigned'}
            atoReason={formData.atoReason || 'Voluntary cessation'}
            sentiment={formData.sentiment || 'Regrettable'}
            comments={formData.comments || 'Going for a lap around Australia'}
            upcomingShifts={2}
            pendingTimesheets={15}
            unprocessedPayRuns={2}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box 
        sx={{ 
          width: '100%',
          borderBottom: '0.8px solid #E5E7EB',
          bgcolor: '#FFFFFF',
          position: 'fixed',
          top: 0,
          zIndex: 1200,
        }}
      >
        <Box sx={{ 
          display: 'flex',
          py: 3,
        }}>
          <Typography
            variant="h6"
            sx={{
              color: '#111827',
              fontWeight: 600,
              fontSize: '32px',
              marginLeft: '64px',
            }}
          >
            Offboard employee
          </Typography>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', pt: '88px', flex: 1 }}>
        {/* Side Navigation */}
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            bgcolor: '#FFFFFF',
            borderRight: '0.8px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 88px)',
            position: 'fixed',
            top: '88px',
          }}
        >
          <OffboardingStepper activeStep={step} />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#FFFFFF',
            marginLeft: '240px',
            minHeight: 'calc(100vh - 88px)',
            position: 'relative',
            pb: '80px',
          }}
        >
          <Box sx={{ maxWidth: '1000px', margin: '0 auto', p: 4 }}>
            {renderStepContent()}
          </Box>

          {/* Footer Navigation */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              maxWidth: '1000px',
              width: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginLeft: '120px',
              height: '80px',
              bgcolor: '#FFFFFF',
              borderTop: '0.8px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 4,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{
                borderColor: '#E5E7EB',
                color: '#374151',
                '&:hover': {
                  borderColor: '#6366F1',
                  backgroundColor: 'rgba(99, 102, 241, 0.04)',
                },
                height: '36px',
                px: 4,
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                bgcolor: '#3D1CBA',
                color: '#FFFFFF',
                '&:hover': {
                  bgcolor: '#3019A0',
                },
                height: '36px',
                px: 4,
              }}
            >
              {step === 3 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OffboardingFlow; 