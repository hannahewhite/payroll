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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';

interface FormData {
  terminationDate: Date | null;
  lastWorkingDate: Date | null;
  reasonForLeaving: string;
  atoReason: string;
  sentiment: string;
  comments: string;
  archiveOption: string;
  documentUrl?: string;
  documentName?: string;
}

const OffboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    terminationDate: null,
    lastWorkingDate: null,
    reasonForLeaving: '',
    atoReason: '',
    sentiment: '',
    comments: '',
    archiveOption: '',
    documentUrl: '',
    documentName: '',
  });

  const isFirstStepValid = () => {
    return (
      formData.terminationDate !== null &&
      formData.lastWorkingDate !== null &&
      formData.reasonForLeaving !== '' &&
      formData.atoReason !== '' &&
      formData.sentiment !== ''
    );
  };

  const handleNext = () => {
    if (step === 0) {
      if (!isFirstStepValid()) {
        setShowErrors(true);
        return;
      }
      setShowErrors(false);
    }
    setStep(step + 1);
    // Scroll to top of content
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleBack = () => {
    if (step === 0) {
      navigate('/');
    } else {
      setStep(step - 1);
      // Scroll to top of content
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleDateChange = (field: keyof Pick<FormData, 'terminationDate' | 'lastWorkingDate'>) => (date: Date | null) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSelectChange = (field: keyof Pick<FormData, 'reasonForLeaving' | 'atoReason'>) => (
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
                  className={`custom-datepicker ${showErrors && !formData.terminationDate ? 'error' : ''}`}
                  wrapperClassName="custom-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: '32px',
                        width: '350px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        border: `1px solid ${showErrors && !formData.terminationDate ? '#AF1105' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  }
                />
                {showErrors && !formData.terminationDate && (
                  <Typography sx={{ color: '#AF1105', fontSize: '14px', mt: 1 }}>
                    Please select a termination date
                  </Typography>
                )}
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
                  className={`custom-datepicker ${showErrors && !formData.lastWorkingDate ? 'error' : ''}`}
                  wrapperClassName="custom-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: '32px',
                        width: '350px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        border: `1px solid ${showErrors && !formData.lastWorkingDate ? '#AF1105' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  }
                />
                {showErrors && !formData.lastWorkingDate && (
                  <Typography sx={{ color: '#AF1105', fontSize: '14px', mt: 1 }}>
                    Please select a last working date
                  </Typography>
                )}
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
                  error={showErrors && !formData.reasonForLeaving}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.08)',
                        '& .MuiMenuItem-root': {
                          fontSize: '14px',
                          '&:hover': {
                            backgroundColor: '#F9F9FB',
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    height: '32px',
                    width: '350px',
                    '& .MuiSelect-select': {
                      padding: '6px 12px',
                      fontSize: '14px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: showErrors && !formData.reasonForLeaving ? '#AF1105' : '#E5E7EB',
                      borderRadius: '8px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: showErrors && !formData.reasonForLeaving ? '#AF1105' : '#D1D5DB',
                      borderRadius: '8px',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: showErrors && !formData.reasonForLeaving ? '#AF1105' : '#3D1CBA',
                      borderRadius: '8px',
                    },
                  }}
                >
                  <MenuItem value="" disabled sx={{ fontSize: '14px' }}>Select</MenuItem>
                  <MenuItem value="abandonment" sx={{ fontSize: '14px' }}>Abandonment</MenuItem>
                  <MenuItem value="better_rewards" sx={{ fontSize: '14px' }}>Better rewards</MenuItem>
                  <MenuItem value="career_advancement" sx={{ fontSize: '14px' }}>Career advancement</MenuItem>
                  <MenuItem value="career_change" sx={{ fontSize: '14px' }}>Career change</MenuItem>
                  <MenuItem value="family_matters" sx={{ fontSize: '14px' }}>Family matters</MenuItem>
                  <MenuItem value="further_education" sx={{ fontSize: '14px' }}>Further education</MenuItem>
                  <MenuItem value="health_issues" sx={{ fontSize: '14px' }}>Health issues</MenuItem>
                  <MenuItem value="incomplete_probation" sx={{ fontSize: '14px' }}>Incomplete probation</MenuItem>
                  <MenuItem value="poor_performance" sx={{ fontSize: '14px' }}>Poor performance</MenuItem>
                  <MenuItem value="redundancy" sx={{ fontSize: '14px' }}>Redundancy</MenuItem>
                  <MenuItem value="relocation" sx={{ fontSize: '14px' }}>Relocation</MenuItem>
                  <MenuItem value="resignation" sx={{ fontSize: '14px' }}>Resignation</MenuItem>
                  <MenuItem value="retirement" sx={{ fontSize: '14px' }}>Retirement</MenuItem>
                  <MenuItem value="serious_misconduct" sx={{ fontSize: '14px' }}>Serious misconduct</MenuItem>
                  <MenuItem value="travelling" sx={{ fontSize: '14px' }}>Travelling</MenuItem>
                  <MenuItem value="work_eligibility" sx={{ fontSize: '14px' }}>Work eligibility</MenuItem>
                </Select>
                {showErrors && !formData.reasonForLeaving && (
                  <Typography sx={{ color: '#AF1105', fontSize: '14px', mt: 1 }}>
                    Please select a reason for leaving
                  </Typography>
                )}
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
                  error={showErrors && !formData.atoReason}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.08)',
                        '& .MuiMenuItem-root': {
                          fontSize: '14px',
                          '&:hover': {
                            backgroundColor: '#F9F9FB',
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    height: '32px',
                    width: '350px',
                    '& .MuiSelect-select': {
                      padding: '6px 12px',
                      fontSize: '14px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: showErrors && !formData.atoReason ? '#AF1105' : '#E5E7EB',
                      borderRadius: '8px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: showErrors && !formData.atoReason ? '#AF1105' : '#D1D5DB',
                      borderRadius: '8px',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: showErrors && !formData.atoReason ? '#AF1105' : '#3D1CBA',
                      borderRadius: '8px',
                    },
                  }}
                >
                  <MenuItem value="" disabled sx={{ fontSize: '14px' }}>Select</MenuItem>
                  <MenuItem value="voluntary" sx={{ fontSize: '14px' }}>Voluntary cessation</MenuItem>
                  <MenuItem value="redundancy" sx={{ fontSize: '14px' }}>Redundancy</MenuItem>
                  <MenuItem value="dismissal" sx={{ fontSize: '14px' }}>Dismissal</MenuItem>
                  <MenuItem value="contract_end" sx={{ fontSize: '14px' }}>Contract end</MenuItem>
                </Select>
                {showErrors && !formData.atoReason && (
                  <Typography sx={{ color: '#AF1105', fontSize: '14px', mt: 1 }}>
                    Please select an ATO reason
                  </Typography>
                )}
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
                          color: showErrors && !formData.sentiment ? '#AF1105' : '#E5E7EB',
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
                          color: showErrors && !formData.sentiment ? '#AF1105' : '#E5E7EB',
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
                {showErrors && !formData.sentiment && (
                  <Typography sx={{ color: '#AF1105', fontSize: '14px', mt: 1 }}>
                    Please select a sentiment
                  </Typography>
                )}
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                    Supporting document
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '14px' }}>
                    (optional)
                  </Typography>
                </Box>
                <Box>
                  {formData.documentUrl ? (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 350,
                        bgcolor: '#FAFAFB',
                        borderRadius: '8px',
                        px: 3,
                        py: 2,
                        mb: 2,
                        boxSizing: 'border-box',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <InsertDriveFileIcon sx={{ color: '#1991B7', fontSize: 16, width: 16, height: 16 }} />
                        <Typography sx={{ color: '#18113C', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 230 }}>
                          {formData.documentName || 'document_name'}
                        </Typography>
                      </Box>
                      <DeleteIcon
                        sx={{ color: '#C9150C', fontSize: 16, width: 16, height: 16, cursor: 'pointer' }}
                        onClick={() => setFormData({ ...formData, documentUrl: '', documentName: '' })}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        border: '1.5px dashed #E5E7EB',
                        borderRadius: '8px',
                        bgcolor: '#FAFAFB',
                        px: 2,
                        py: 1.5,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: 350,
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                        '&:hover': { borderColor: '#6C3DCC' },
                        mb: 2,
                        position: 'relative',
                        gap: 2,
                        boxSizing: 'border-box',
                      }}
                      onClick={() => document.getElementById('supporting-doc-upload')?.click()}
                      onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                      onDrop={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.dataTransfer.files?.[0]) {
                          const file = e.dataTransfer.files[0];
                          const fakeUrl = URL.createObjectURL(file);
                          setFormData({ ...formData, documentUrl: fakeUrl, documentName: file.name });
                        }
                      }}
                    >
                      <CloudUploadIcon sx={{ color: '#3D1CBA', fontSize: 24, minWidth: 24, minHeight: 24 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography sx={{ fontWeight: 500, color: '#232329', fontSize: 14, mb: 0.5 }}>
                          Drop files here, or{' '}
                          <Box
                            component="span"
                            sx={{ color: '#3D1CBA', textDecoration: 'none', cursor: 'pointer', fontSize: 14 }}
                            onClick={e => {
                              e.stopPropagation();
                              document.getElementById('supporting-doc-upload')?.click();
                            }}
                          >
                            browse
                          </Box>
                        </Typography>
                        <Typography sx={{ color: '#6B7280', fontSize: 14 }}>
                          PDF and images supported
                        </Typography>
                      </Box>
                      <input
                        id="supporting-doc-upload"
                        type="file"
                        accept="application/pdf,image/*"
                        hidden
                        onChange={e => {
                          if (e.target.files?.[0]) {
                            const file = e.target.files[0];
                            const fakeUrl = URL.createObjectURL(file);
                            setFormData({ ...formData, documentUrl: fakeUrl, documentName: file.name });
                          }
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                    Comments
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '14px' }}>
                    (optional)
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Add any additional information"
                  value={formData.comments}
                  onChange={handleTextChange('comments')}
                  sx={{
                    width: '350px',
                    '& .MuiOutlinedInput-root': {
                      fontSize: '14px',
                      height: '84px',
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
                      padding: '12px 12px 12px 0',
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
                      mr: '8px',
                      mt: '-6px',
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
                  width: '600px',
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
                      mr: '8px',
                      mt: '-6px',
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ color: '#111827', fontSize: '14px', fontWeight: 500, lineHeight: '20px' }}>
                      On last day of employment
                    </Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '14px', mt: 0.5 }}>
                      If all outstanding items are complete, Michaella will be archived on their final day of employment - {formData.lastWorkingDate ? formData.lastWorkingDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not set'} at 11:00pm
                    </Typography>
                  </Box>
                }
                sx={{ 
                  alignItems: 'flex-start',
                  margin: 0,
                  padding: '16px',
                  border: '1px solid',
                  borderColor: formData.archiveOption === 'lastDay' ? '#3D1CBA' : '#E5E7EB',
                  borderRadius: '8px',
                  width: '600px',
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
                      mr: '8px',
                      mt: '-6px',
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#111827', fontSize: '14px', fontWeight: 500, lineHeight: '20px' }}>
                      I will do this manually
                    </Typography>
                  </Box>
                }
                sx={{ 
                  alignItems: 'center',
                  margin: 0,
                  padding: '16px',
                  border: '1px solid',
                  borderColor: formData.archiveOption === 'manual' ? '#3D1CBA' : '#E5E7EB',
                  borderRadius: '8px',
                  width: '600px',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                }}
              />
            </Box>
          </Box>
        );
      case 2:
        return <UpcomingShifts 
          onNext={handleNext} 
          onBack={handleBack} 
          disableNext={true} 
        />;
      case 3:
        return (
          <Review
            firstName="Michaella"
            terminationDate={formData.terminationDate ? formData.terminationDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '7 Apr 2025'}
            lastWorkingDate={formData.lastWorkingDate ? formData.lastWorkingDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '27 May 2025'}
            reasonForLeaving={formData.reasonForLeaving || 'resigned'}
            atoReason={formData.atoReason || 'voluntary_cessation'}
            sentiment={formData.sentiment || 'regrettable'}
            comments={formData.comments}
            upcomingShifts={2}
            pendingTimesheets={15}
            unprocessedPayRuns={2}
            documentUrl={formData.documentUrl}
            archiveOption={formData.archiveOption}
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
          role="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#FFFFFF',
            marginLeft: '240px',
            minHeight: 'calc(100vh - 88px)',
            position: 'relative',
            pb: '80px',
            overflowY: 'auto',
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
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                startIcon={step !== 0 ? <ArrowBackIcon /> : null}
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
                {step === 0 ? 'Cancel' : 'Back'}
              </Button>
              {step > 0 && (
                <Button
                  variant="text"
                  onClick={() => navigate('/')}
                  sx={{
                    color: '#374151',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.04)',
                    },
                    height: '36px',
                    px: 4,
                  }}
                >
                  Cancel
                </Button>
              )}
            </Box>
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={step !== 3 ? <ArrowForwardIcon /> : null}
              disabled={step === 2 && formData.archiveOption === 'immediately'}
              sx={{
                bgcolor: step === 2 && formData.archiveOption === 'immediately' ? '#E5E7EB' : '#3D1CBA',
                color: step === 2 && formData.archiveOption === 'immediately' ? '#9CA3AF' : '#FFFFFF',
                '&:hover': {
                  bgcolor: step === 2 && formData.archiveOption === 'immediately' ? '#E5E7EB' : '#3019A0',
                },
                '&.Mui-disabled': {
                  bgcolor: '#E5E7EB',
                  color: '#9CA3AF',
                },
                height: '36px',
                px: 4,
              }}
            >
              {step === 3 ? 'Confirm details' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OffboardingFlow; 