// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Verde
    },
    background: {
      default: '#ffffff', // Branco
    },
    text: {
      primary: '#000000', // Preto (para contraste)
    },
  },
});

export default theme;
