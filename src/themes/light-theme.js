import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { blueGrey, lightGreen } from '@mui/material/colors';

const lightText = {
  primary: 'rgb(17, 24, 39)',
  secondary: blueGrey[500],
  disabled: 'rgb(149, 156, 169)'
};

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#D2EFF2',
        main: lightGreen[500],
        dark: lightGreen[600]
      },
      secondary: {
        light: '#FFF2C6',
        main: '#FED441',
        dark: '#FDB91C',
        contrastText: '#1E1F23'
      },
      common: {
        black: '#000',
        white: 'rgb(255, 255, 255)'
      },
      success: {
        main: '#aed581',
        light: '#bedd9a',
        dark: '#27632a'
      },
      error: {
        main: '#f4511e',
        light: '#ff8a65',
        dark: '#a02725'
      },
      background: {
        paper: '#FAF6F3',
        default: '#FFFFFF'
      },
      action: {
        selected: 'rgb(0, 0, 0, 0.05)'
      }
    },
    typography: {
      fontFamily: 'Josefin Sans'
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
