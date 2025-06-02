import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const states = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' },
];

// Add global styles for Google Maps autocomplete
const globalStyles = `
  .pac-container {
    border-radius: 8px;
    border: 1px solid #E5E7EB;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif;
    margin-top: 4px;
    background-color: white;
    z-index: 1400;
    width: 100% !important;
    left: 0 !important;
    position: absolute;
  }
  .pac-item {
    padding: 12px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-top: 1px solid #E5E7EB;
  }
  .pac-item:first-child {
    border-top: none;
  }
  .pac-item:hover {
    background-color: #F9FAFB;
  }
  .pac-icon {
    display: none;
  }
  .pac-item-query {
    font-size: 14px;
    color: #111827;
    font-weight: 500;
    margin-right: 4px;
  }
  .pac-matched {
    font-weight: 600;
    color: #3D1CBA;
  }
  .pac-secondary-text {
    font-size: 14px;
    color: #6B7280;
  }
`;

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

declare global {
  interface Window {
    google: any;
  }
}

const validationSchema = Yup.object({
  abn: Yup.string()
    .matches(/^\d{11}$/, 'ABN must be 11 digits')
    .required('ABN is required'),
  legalBusinessName: Yup.string().required('Legal business name is required'),
  tradingName: Yup.string().required('Trading name is required'),
  branchCode: Yup.string().required('Branch code is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  businessPhone: Yup.string().required('Business phone is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  addressLine1: Yup.string().required('Address is required'),
  unitLevel: Yup.string(),
  citySuburb: Yup.string().required('City/Suburb is required'),
  state: Yup.string().required('State is required'),
  postcode: Yup.string().required('Postcode is required'),
  country: Yup.string().required('Country is required'),
});

const BusinessDetails: React.FC = () => {
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState<any>(null);

  const formik = useFormik({
    initialValues: {
      abn: '',
      legalBusinessName: '',
      tradingName: '',
      branchCode: '001',
      firstName: '',
      lastName: '',
      businessPhone: '',
      email: '',
      addressLine1: '',
      unitLevel: '',
      citySuburb: '',
      state: '',
      postcode: '',
      country: 'Australia',
    },
    validationSchema,
    onSubmit: (values) => {
      handleNext();
    },
  });

  const handlePlaceSelect = useCallback(() => {
    const place = autocomplete?.getPlace();
    if (place?.address_components) {
      // Extract address components
      const addressComponents = place.address_components;
      let streetNumber = '';
      let route = '';
      let unitNumber = '';
      let suburb = '';
      let state = '';
      let postcode = '';

      addressComponents.forEach((component: AddressComponent) => {
        const types = component.types;
        if (types.includes('street_number')) {
          streetNumber = component.long_name;
        } else if (types.includes('route')) {
          route = component.long_name;
        } else if (types.includes('subpremise')) {
          unitNumber = component.long_name;
        } else if (types.includes('locality')) {
          suburb = component.long_name;
        } else if (types.includes('administrative_area_level_1')) {
          state = component.short_name;
        } else if (types.includes('postal_code')) {
          postcode = component.long_name;
        }
      });

      // Update form values
      formik.setValues({
        ...formik.values,
        addressLine1: `${streetNumber} ${route}`.trim(),
        unitLevel: unitNumber,
        citySuburb: suburb,
        state: state,
        postcode: postcode,
      });
    }
  }, [formik, autocomplete]);

  const handleFillDemoData = () => {
    formik.setValues({
      abn: '12345678901',
      legalBusinessName: 'Tech Solutions Pty Ltd',
      tradingName: 'TechSolutions',
      branchCode: '001',
      firstName: 'John',
      lastName: 'Smith',
      businessPhone: '0412345678',
      email: 'john.smith@techsolutions.com.au',
      addressLine1: '42 Innovation Street',
      unitLevel: 'Level 5',
      citySuburb: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'Australia',
    });
  };

  useEffect(() => {
    // Add global styles
    const styleElement = document.createElement('style');
    styleElement.textContent = globalStyles;
    document.head.appendChild(styleElement);

    // Load Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      const searchInput = document.getElementById('address-search');
      if (searchInput) {
        const autocompleteInstance = new window.google.maps.places.Autocomplete(
          searchInput as HTMLInputElement,
          { componentRestrictions: { country: 'AU' }, types: ['address'] }
        );

        autocompleteInstance.addListener('place_changed', handlePlaceSelect);
        setAutocomplete(autocompleteInstance);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(styleElement);
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('maps.googleapis.com')) {
          scripts[i].parentNode?.removeChild(scripts[i]);
          break;
        }
      }
    };
  }, [handlePlaceSelect]);

  // Call handleFillDemoData once when component mounts
  useEffect(() => {
    handleFillDemoData();
  }, []);

  const handleNext = () => {
    navigate('../payroll-details');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: '#111827' }}>
          Business details
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B7280' }}>
          Review and populate the following details
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mt: 4, mb: 8 }}>
          <Typography variant="subtitle1" gutterBottom>
            ABN
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Australian Business Number
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <TextField
                fullWidth
                name="abn"
                placeholder="Enter 11 digit ABN..."
                value={formik.values.abn}
                onChange={formik.handleChange}
                error={formik.touched.abn && Boolean(formik.errors.abn)}
                helperText={formik.touched.abn && formik.errors.abn}
                size="small"
              />
            </Box>
            <Box>
              <Button 
                variant="outlined" 
                sx={{ 
                  height: '32px',
                  minWidth: '100px',
                  borderColor: '#E5E7EB',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#6366F1',
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                }}
              >
                Search
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Legal business name
            </Typography>
            <TextField
              fullWidth
              name="legalBusinessName"
              placeholder="Enter legal business name..."
              value={formik.values.legalBusinessName}
              onChange={formik.handleChange}
              error={formik.touched.legalBusinessName && Boolean(formik.errors.legalBusinessName)}
              helperText={formik.touched.legalBusinessName && formik.errors.legalBusinessName}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Trading name
            </Typography>
            <TextField
              fullWidth
              name="tradingName"
              placeholder="Enter trading name..."
              value={formik.values.tradingName}
              onChange={formik.handleChange}
              error={formik.touched.tradingName && Boolean(formik.errors.tradingName)}
              helperText={formik.touched.tradingName && formik.errors.tradingName}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Branch code
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              The unique identifier for a branch in your business
            </Typography>
            <TextField
              fullWidth
              name="branchCode"
              value={formik.values.branchCode}
              onChange={formik.handleChange}
              error={formik.touched.branchCode && Boolean(formik.errors.branchCode)}
              helperText={formik.touched.branchCode && formik.errors.branchCode}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                },
              }}
            />
          </Box>

          <Divider sx={{ my: 4, borderColor: '#E7E8EC' }} />

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Primary contact
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, '& > *': { flex: 1 } }}>
              <Box>
                <TextField
                  fullWidth
                  name="firstName"
                  placeholder="First name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '32px',
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '6px 12px',
                    },
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  name="lastName"
                  placeholder="Last name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '32px',
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '6px 12px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Business phone
            </Typography>
            <TextField
              fullWidth
              name="businessPhone"
              placeholder="Enter business phone..."
              value={formik.values.businessPhone}
              onChange={formik.handleChange}
              error={formik.touched.businessPhone && Boolean(formik.errors.businessPhone)}
              helperText={formik.touched.businessPhone && formik.errors.businessPhone}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Email
            </Typography>
            <TextField
              fullWidth
              name="email"
              placeholder="Enter email address..."
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Address
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            This is the legal address of your business
          </Typography>

          <Box sx={{ mt: 2, position: 'relative' }}>
            <Typography variant="subtitle1" gutterBottom>
              Address line 1
            </Typography>
            <TextField
              id="address-search"
              fullWidth
              name="addressLine1"
              placeholder="Search address..."
              value={formik.values.addressLine1}
              onChange={(e) => {
                formik.handleChange(e);
                const input = document.getElementById('address-search');
                if (input) {
                  input.focus();
                }
              }}
              error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
              helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#6B7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                  paddingLeft: '36px',
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Unit / Level / Suite (optional)
            </Typography>
            <TextField
              fullWidth
              name="unitLevel"
              placeholder="Enter unit, level or suite..."
              value={formik.values.unitLevel}
              onChange={formik.handleChange}
              error={formik.touched.unitLevel && Boolean(formik.errors.unitLevel)}
              helperText={formik.touched.unitLevel && formik.errors.unitLevel}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              City / Suburb
            </Typography>
            <TextField
              fullWidth
              name="citySuburb"
              placeholder="Enter city or suburb..."
              value={formik.values.citySuburb}
              onChange={formik.handleChange}
              error={formik.touched.citySuburb && Boolean(formik.errors.citySuburb)}
              helperText={formik.touched.citySuburb && formik.errors.citySuburb}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              State
            </Typography>
            <TextField
              select
              fullWidth
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiSelect-select': {
                  padding: '6px 12px',
                },
              }}
            >
              {states.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Postcode
            </Typography>
            <TextField
              fullWidth
              name="postcode"
              placeholder="0000"
              value={formik.values.postcode}
              onChange={formik.handleChange}
              error={formik.touched.postcode && Boolean(formik.errors.postcode)}
              helperText={formik.touched.postcode && formik.errors.postcode}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '6px 12px',
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Country
            </Typography>
            <TextField
              select
              fullWidth
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              size="small"
              disabled
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
                '& .MuiSelect-select': {
                  padding: '6px 12px',
                },
              }}
            >
              <MenuItem value="Australia">Australia</MenuItem>
            </TextField>
          </Box>
        </Box>
      </form>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4, pb: 4 }}>
        <Button
          variant="outlined"
          onClick={handleFillDemoData}
          sx={{
            borderColor: '#E5E7EB',
            color: '#374151',
            '&:hover': {
              borderColor: '#6366F1',
              backgroundColor: 'rgba(99, 102, 241, 0.04)',
            },
            textTransform: 'none',
            height: '36px',
          }}
        >
          Fill demo data
        </Button>
      </Box>
    </Box>
  );
};

export default BusinessDetails; 