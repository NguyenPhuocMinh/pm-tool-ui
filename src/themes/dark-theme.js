import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey, amber } from '@mui/material/colors';

const darkText = {
  primary: 'rgb(255,255,255)',
  secondary: grey[500],
  disabled: 'rgb(156, 163, 175)'
};

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#C2C2C3',
        main: amber[700],
        dark: amber[600]
      },
      secondary: {
        light: '#B8E1D9',
        main: '#129B7F',
        dark: '#056D4F',
        contrastText: '#FFFFFF'
      },
      common: {
        black: '#000',
        white: 'rgb(255, 255, 255)'
      },
      success: {
        main: '#bedd9a',
        light: '#a2cf6e',
        dark: '#27632a'
      },
      error: {
        main: '#f4511e',
        light: '#ffa733',
        dark: '#a02725'
      },
      background: {
        paper: '#262526',
        default: '#1E1D1E'
      },
      action: {
        selected: 'rgba(255, 255, 255, 0.1)'
      }
    },
    typography: {
      fontFamily: ['Josefin Sans', 'sans-serif'].join(',')
    }
  })
);

export default darkTheme;
