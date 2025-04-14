// routes/favoritesRoutes.js
const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const { requireJWT } = require('../middlewares/authJWT');

router.post('/favorites', requireJWT, favoritesController.addFavorite);
router.get('/favorites', requireJWT, favoritesController.getFavorites);
router.delete('/favorites/:id', requireJWT, favoritesController.deleteFavorite);

module.exports = router;
