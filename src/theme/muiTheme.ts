import { createTheme } from '@mui/material/styles';

export const whiteMuiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0A0A0A',
      secondary: '#525252',
    },
    divider: '#E5E5E5',
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
    borderRadius: 0,
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'none',
          border: '1px solid #000000',
          borderRadius: 0,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
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
          backgroundColor: '#FFFFFF',
          borderRadius: 0,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
            borderRadius: 0,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
            borderWidth: 2,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 24px',
          fontWeight: 600,
          fontSize: '0.875rem',
        },
      },
    },
  },
});

export const darkMuiTheme = whiteMuiTheme;
export const getMuiTheme = () => whiteMuiTheme;
