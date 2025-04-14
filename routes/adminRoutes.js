// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireJWT } = require('../middlewares/authJWT');

// Rotas protegidas para administradores (verifica também se o utilizador é admin no controlador, se necessário)
router.post('/servicos', requireJWT, adminController.addServico);
router.put('/servicos/:id', requireJWT, adminController.atualizarServico);
router.delete('/servicos/:id', requireJWT, adminController.eliminarServico);
router.put('/reservas/:id', requireJWT, adminController.updateReserva);
router.get('/clientes', requireJWT, adminController.listarClientes);
router.get('/relatorios', requireJWT, adminController.gerarRelatorio);

module.exports = router;
