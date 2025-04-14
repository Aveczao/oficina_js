// routes/servicoRoutes.js

// Importa o módulo express para criar as rotas da aplicação.
const express = require('express');
// Cria uma instância do router do express para definir as rotas relacionadas com os serviços.
const router = express.Router();
// Importa o controlador de administrador, que contém a função para listar os serviços.
const adminController = require('../controllers/adminController');

// Rota pública para listagem de serviços com pesquisa e ordenação.
// Esta rota permite aos clientes consultar a lista de serviços disponíveis sem necessidade de autenticação.
router.get('/servicos', adminController.listarServicos);

// Exporta o router para que possa ser integrado na aplicação principal.
module.exports = router;
