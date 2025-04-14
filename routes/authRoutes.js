const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/registo', authController.registar);
router.post('/login', authController.login);
router.get('/confirmar-login', authController.confirmarLogin);
router.post('/logout', authController.logout);
router.put('/alterar-password', authController.alterarPassword);
router.post('/recuperar-password', authController.recuperarPassword);

module.exports = router;
