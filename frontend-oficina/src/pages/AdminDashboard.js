// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import api from '../services/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registro dos componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/relatorios');
        setStats(response.data.relatorio);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <Container><Typography>Carregando estatísticas...</Typography></Container>;

  // Preparação dos dados para o gráfico
  const data = {
    labels: ['Serviços Mês Atual', 'Média Avaliação'],
    datasets: [
      {
        label: 'Estatísticas',
        data: [stats.totalServicosMes, stats.mediaAvaliacao],
        backgroundColor: ['#4caf50', '#2196f3'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estatísticas do Mês',
      },
    },
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Admin
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Bar data={data} options={options} />
      </Box>
    </Container>
  );
};

export default AdminDashboard;
