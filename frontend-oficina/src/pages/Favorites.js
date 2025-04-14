// src/pages/Favorites.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);
      fetchFavorites();
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meus Favoritos
      </Typography>
      <List>
        {favorites.map((fav) => (
          <ListItem key={fav._id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(fav._id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={`Serviço: ${fav.serviceId}`} secondary={`Adicionado em: ${new Date(fav.createdAt).toLocaleString()}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Favorites;
