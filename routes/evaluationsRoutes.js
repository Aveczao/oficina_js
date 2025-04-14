// routes/evaluationsRoutes.js
const express = require('express');
const router = express.Router();
const evaluationsController = require('../controllers/evaluationsController');
const { requireJWT } = require('../middlewares/authJWT');

// Endpoint para adicionar uma avaliação (protege com JWT)
router.post('/evaluations', requireJWT, evaluationsController.addEvaluation);
// Endpoint para listar avaliações, recebendo serviceId via query
router.get('/evaluations', evaluationsController.getEvaluations);
// Endpoint para remover uma avaliação (protege com JWT)
router.delete('/evaluations/:id', requireJWT, evaluationsController.deleteEvaluation);

module.exports = router;
