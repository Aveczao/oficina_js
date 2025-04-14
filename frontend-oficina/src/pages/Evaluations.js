// src/pages/Evaluations.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, TextField, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import api from '../services/api';
import { useParams } from 'react-router-dom';

const Evaluations = () => {
  // Se a página for acessada via URL com serviceId, por exemplo /evaluations/:serviceId
  const { serviceId } = useParams();
  const [evaluations, setEvaluations] = useState([]);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  /**
   * Função para buscar avaliações para um serviço específico.
   * Usamos useCallback para memorizar a função com serviceId como dependência,
   * garantindo que ela só seja recriada quando serviceId mudar.
   */
  const fetchEvaluations = useCallback(async () => {
    try {
      const response = await api.get('/evaluations', { params: { serviceId } });
      setEvaluations(response.data.evaluations);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
    }
  }, [serviceId]);

  // useEffect que chama a função fetchEvaluations sempre que ela mudar
  useEffect(() => {
    fetchEvaluations();
  }, [fetchEvaluations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia a avaliação para o backend
      await api.post('/evaluations', { serviceId, rating: Number(rating), comment });
      // Limpa os campos
      setRating('');
      setComment('');
      // Atualiza a lista de avaliações
      fetchEvaluations();
    } catch (error) {
      console.error('Erro ao adicionar avaliação:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Avaliações do Serviço
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nota (1 a 5)"
          type="number"
          inputProps={{ min: 1, max: 5 }}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <TextField
          label="Comentário"
          multiline
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar Avaliação
        </Button>
      </Box>

      <List>
        {evaluations.map((evalItem) => (
          <ListItem key={evalItem._id}>
            <ListItemText
              primary={`Nota: ${evalItem.rating} - ${new Date(evalItem.createdAt).toLocaleString()}`}
              secondary={evalItem.comment}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Evaluations;
