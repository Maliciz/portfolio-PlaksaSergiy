import { createTheme } from '@mui/material/styles';

export const darkMuiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0284C7', // Industrial Blue
      light: '#38BDF8',
      dark: '#0369A1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D97706', // Copper / Brass
      light: '#F59E0B',
      dark: '#B45309',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0B1320',
      paper: '#111D33',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: [
      'Plus Jakarta Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0F1A2E',
          backgroundImage: 'none',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          borderRadius: 16,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 26, 46, 0.6)',
          borderRadius: 10,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.12)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(56, 189, 248, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0284C7',
            borderWidth: 2,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 22px',
          fontWeight: 600,
        },
      },
    },
  },
});
