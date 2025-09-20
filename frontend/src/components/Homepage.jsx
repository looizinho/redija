import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao Redija
      </Typography>
      <Typography variant="body1" gutterBottom>
        Uma plataforma simples de edição de texto com Material You.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/editor"
          variant="contained"
          size="large"
        >
          Entrar no Editor
        </Button>
      </Box>
    </Container>
  );
}