import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  accountName: Yup.string().required('Account name is required'),
  bsb: Yup.string()
    .matches(/^\d{6}$/, 'BSB must be 6 digits')
    .required('BSB is required'),
  accountNumber: Yup.string().required('Account number is required'),
  bankingInstitution: Yup.string().required('Banking institution is required'),
  apcaCode: Yup.string(),
});

const PayrollDetails: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      accountName: '',
      bsb: '',
      accountNumber: '',
      bankingInstitution: '',
      apcaCode: '',
    },
    validationSchema,
    onSubmit: (values) => {
      navigate('../pay-calendars');
    },
  });

  const handleFillDemoData = () => {
    formik.setValues({
      accountName: 'Tech Solutions Pty Ltd',
      bsb: '062000',
      accountNumber: '12345678',
      bankingInstitution: 'Commonwealth Bank',
      apcaCode: 'ABC123',
    });
  };

  useEffect(() => {
    handleFillDemoData();
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: '#111827' }}>
          Payroll details
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B7280' }}>
          Set up your payroll preferences
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mt: 4, mb: 8 }}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Account name
            </Typography>
            <TextField
              fullWidth
              name="accountName"
              placeholder="Enter account name..."
              value={formik.values.accountName}
              onChange={formik.handleChange}
              error={formik.touched.accountName && Boolean(formik.errors.accountName)}
              helperText={formik.touched.accountName && formik.errors.accountName}
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
              BSB
            </Typography>
            <TextField
              fullWidth
              name="bsb"
              placeholder="000 000"
              value={formik.values.bsb}
              onChange={formik.handleChange}
              error={formik.touched.bsb && Boolean(formik.errors.bsb)}
              helperText={formik.touched.bsb && formik.errors.bsb}
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
              Account number
            </Typography>
            <TextField
              fullWidth
              name="accountNumber"
              placeholder="Enter account number..."
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
              helperText={formik.touched.accountNumber && formik.errors.accountNumber}
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
              Banking institution
            </Typography>
            <TextField
              fullWidth
              name="bankingInstitution"
              placeholder="Enter banking institution..."
              value={formik.values.bankingInstitution}
              onChange={formik.handleChange}
              error={formik.touched.bankingInstitution && Boolean(formik.errors.bankingInstitution)}
              helperText={formik.touched.bankingInstitution && formik.errors.bankingInstitution}
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
              APCA Code
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#6B7280' }}>
              Optional
            </Typography>
            <TextField
              fullWidth
              name="apcaCode"
              placeholder="Enter APCA code..."
              value={formik.values.apcaCode}
              onChange={formik.handleChange}
              error={formik.touched.apcaCode && Boolean(formik.errors.apcaCode)}
              helperText={formik.touched.apcaCode && formik.errors.apcaCode}
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
      </form>
    </Box>
  );
};

export default PayrollDetails; 