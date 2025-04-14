// src/pages/AdminServices.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Chip } from '@mui/material';
import api from '../services/api';

const AdminServices = () => {
  const [servicos, setServicos] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    tempoEstimado: '',
    fabricante: '',
    categoria: '',
    tags: ''
  });

  const fetchServices = async () => {
    try {
      const response = await api.get('/servicos');
      setServicos(response.data.servicos);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Converte tags para array (supondo que sejam separadas por vírgula)
    const dataToSend = { 
      ...formData,
      preco: Number(formData.preco),
      tempoEstimado: Number(formData.tempoEstimado),
      tags: formData.tags.split(',').map(tag => tag.trim())
    };
    try {
      const response = await api.post('/servicos', dataToSend);
      alert(response.data.mensagem);
      setFormData({ nome: '', descricao: '', preco: '', tempoEstimado: '', fabricante: '', categoria: '', tags: '' });
      fetchServices();
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Serviços
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
        <TextField label="Descrição" name="descricao" value={formData.descricao} onChange={handleChange} multiline rows={3} required />
        <TextField label="Preço" name="preco" type="number" value={formData.preco} onChange={handleChange} required />
        <TextField label="Tempo Estimado (h)" name="tempoEstimado" type="number" value={formData.tempoEstimado} onChange={handleChange} required />
        <TextField label="Fabricante" name="fabricante" value={formData.fabricante} onChange={handleChange} />
        <TextField label="Categoria" name="categoria" value={formData.categoria} onChange={handleChange} />
        <TextField label="Tags (separadas por vírgula)" name="tags" value={formData.tags} onChange={handleChange} />
        <Button variant="contained" color="primary" type="submit">
          Criar Serviço
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Lista de Serviços
      </Typography>
      <Grid container spacing={2}>
        {servicos.map((servico) => (
          <Grid item xs={12} sm={6} md={4} key={servico._id}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6">{servico.nome}</Typography>
              <Typography variant="body2">{servico.descricao}</Typography>
              <Typography variant="subtitle1">R$ {servico.preco}</Typography>
              <Typography variant="subtitle2">Tempo: {servico.tempoEstimado}h</Typography>
              <Typography variant="body2">Fabricante: {servico.fabricante}</Typography>
              <Typography variant="body2">Categoria: {servico.categoria}</Typography>
              <Box sx={{ mt: 1 }}>
                {servico.tags && servico.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" sx={{ mr: 0.5 }} />
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminServices;
