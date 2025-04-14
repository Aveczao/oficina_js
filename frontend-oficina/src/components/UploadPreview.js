// src/components/UploadPreview.js
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import api from '../services/api';

const UploadPreview = ({ onUploadSuccess }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMensagem(response.data.mensagem);
      if (onUploadSuccess) onUploadSuccess(response.data.filePath);
    } catch (error) {
      setMensagem('Erro no upload.');
      console.error(error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Upload de Imagem</Typography>
      <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
      {preview && (
        <Box sx={{ mt: 2 }}>
          <img src={preview} alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </Box>
      )}
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpload}>
        Enviar Imagem
      </Button>
      {mensagem && <Typography variant="body1" color="secondary" sx={{ mt: 1 }}>{mensagem}</Typography>}
    </Box>
  );
};

export default UploadPreview;
