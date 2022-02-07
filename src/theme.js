import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  props: {
    // MuiButton: {
    //   disableElevation: true,
    //   disableRipple: true
    // }
  },
  input: {
    border: 'none'
  },
  palette: {
    primary: {
      main: '#2E3A59',
      light: '#3c4e7d',
      dark: '#262d40'
    },
    secondary: {
      main: '#5669FF',
      light: '#94a0ff',
      dark: '#465afa'
    },
    error: {
      main: red.A400,
    },
    mainBackground: '#E5E5E5',
    greyIcon: '#A5A5A5',
    whiteIcon: '#FFFFFF',
    text: {
      primary: '#2E3A59',
      secondary: '#5669FF',
      disabled: '#B8B8B8'
    }
  }
});

export default theme;