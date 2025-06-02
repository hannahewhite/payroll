import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '-apple-system, "SF Pro Display", "SF Pro Text", BlinkMacSystemFont, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    h5: {
      fontWeight: 600,
      fontSize: '24px',
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '14px',
      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    body1: {
      color: '#6B7280',
      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    body2: {
      color: '#6B7280',
      fontSize: '0.875rem',
      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: '#E5E7EB',
          color: '#374151',
        },
        contained: {
          backgroundColor: '#3D1CBA',
          '&:hover': {
            backgroundColor: '#3415A0',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            height: '32px',
            borderRadius: 8,
            backgroundColor: '#fff',
            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '14px',
            '& fieldset': {
              borderColor: '#E5E7EB',
            },
            '&:hover fieldset': {
              borderColor: '#3D1CBA',
            },
            '& input': {
              padding: '6px 12px',
              fontSize: '14px',
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '14px',
          },
          '& .MuiSelect-select': {
            fontSize: '14px',
            padding: '6px 12px',
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          width: '24px',
          height: '24px',
          color: '#FCFCFE',
          borderRadius: '50%',
          '&.Mui-active': {
            color: '#3D1CBA',
          },
          '&.Mui-completed': {
            backgroundColor: '#EFF0F3',
            '& path': {
              fill: '#232329',
            }
          },
        },
        text: {
          fill: '#B6B8C6',
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
          '.Mui-active &': {
            fill: '#FFFFFF',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#3D1CBA',
    },
  },
});

export default theme; 