// frontend/src/theme.js
import { createTheme } from '@mui/material/styles';

export function makeTheme(seedHex = '#6750A4') {
  return createTheme({
    palette: {
      primary: { main: seedHex },
      background: { default: '#fafafa' },
    },
    components: {
      MuiButton: { defaultProps: { variant: 'contained' } }
    }
  });
}