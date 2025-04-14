// src/pages/ServiceDetail.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ServiceDetail = () => {
  const { id } = useParams();
  const [servico, setServico] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchServico = async () => {
      try {
        const response = await api.get(`/servicos/${id}`);
        setServico(response.data.servico || response.data); // ajusta conforme o formato da resposta
      } catch (error) {
        setErro('Erro ao buscar detalhes do serviço.');
      }
    };
    fetchServico();
  }, [id]);

  if (erro) return <Container><Typography color="error">{erro}</Typography></Container>;
  if (!servico) return <Container><Typography>Carregando...</Typography></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4">{servico.nome}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {servico.fabricante} - {servico.categoria}
          </Typography>
          <Typography variant="body1">{servico.descricao}</Typography>
          <Typography variant="h6">Preço: R$ {servico.preco}</Typography>
          <Typography variant="h6">Tempo Estimado: {servico.tempoEstimado}h</Typography>
          {servico.tags && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Tags:</Typography>
              {servico.tags.map((tag, idx) => (
                <Typography key={idx} variant="body2" component="span" sx={{ mr: 1 }}>
                  #{tag}
                </Typography>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ServiceDetail;
