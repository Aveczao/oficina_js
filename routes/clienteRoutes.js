// routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { requireJWT } = require('../middlewares/authJWT');

// Agora, para rotas protegidas, usa requireJWT para verificar o token
router.post('/veiculos', requireJWT, clienteController.addVeiculo);
router.post('/reservas', requireJWT, clienteController.reservarServico);
router.get('/reservas', requireJWT, clienteController.listarReservas);
router.get('/reservas/:id', requireJWT, clienteController.getReserva);

module.exports = router;
