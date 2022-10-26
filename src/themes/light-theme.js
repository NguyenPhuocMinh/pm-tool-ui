import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light'
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          standardSuccess: {
            color: '#fff',
            background:
              'linear-gradient(to bottom left, #ffffff 0%, #00ff00 100%) !important'
          },
          standardError: {
            color: 'red',
            background: 'red'
          }
        }
      }
    }
  })
);

export default lightTheme;
