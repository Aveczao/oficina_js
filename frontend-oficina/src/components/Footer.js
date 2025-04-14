// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ backgroundColor: '#f5f5f5', p: 2, mt: 4, textAlign: 'center' }}>
    <Typography variant="body2" color="textSecondary">
      © 2024 Oficina. Todos os direitos reservados.
    </Typography>
  </Box>
);

export default Footer;
