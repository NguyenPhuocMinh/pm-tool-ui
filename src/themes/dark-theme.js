import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      fontFamily: ['Josefin Sans', 'sans-serif'].join(',')
    }
  })
);

export default darkTheme;
