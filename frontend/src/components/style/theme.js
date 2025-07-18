 import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark' for dark mode
    primary: {
      main: '#2563eb',     // Blue-600 (Modern Blue)
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981',     // Emerald-500 (Vibrant Green)
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb',  // Soft Gray
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',  // Slate-900
      secondary: '#6b7280' // Gray-500
    },
    error: {
      main: '#ef4444',     // Red-500
    },
    warning: {
      main: '#f59e0b',     // Amber-500
    },
    info: {
      main: '#3b82f6',     // Blue-500
    },
    success: {
      main: '#22c55e',     // Green-500
    },
  },
  typography: {
    fontFamily: `'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif`,
    h1: {
      fontSize: '2.2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
    breakpoints: {
    values: {
      xs: 0,
      sm: 600,   // mobile
      md: 900,   // tablet
      lg: 1200,
      xl: 1536,
    },
  },
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& label.Mui-focused': {
          color: '#2563eb',
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#2563eb',
          },
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#2563eb',
          boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      outlined: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#2563eb',
        },
      },
    },
  },
},



});

export default theme;
