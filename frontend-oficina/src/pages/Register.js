// src/pages/Register.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contacto, setContacto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/registo', { nome, email, password, contacto });
      setMensagem(response.data.mensagem);
      // Após o registo, redirecione para a página de login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMensagem(error.response?.data?.mensagem || 'Erro no registo.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Registo
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nome"
          variant="outlined"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Contacto"
          variant="outlined"
          required
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Registar
        </Button>
        {mensagem && <Typography color="secondary">{mensagem}</Typography>}
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Já tens conta? <Link to="/login">Fazer Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
