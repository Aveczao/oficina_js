// controllers/favoritesController.js
const Favorite = require('../models/Favorite');

exports.addFavorite = async (req, res) => {
  try {
    const { serviceId } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ mensagem: 'Utilizador não autenticado.' });
    }
    const favorite = new Favorite({
      userId: req.user.id,
      serviceId
    });
    await favorite.save();
    res.status(201).json({ mensagem: 'Favorito adicionado com sucesso.', favorite });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao adicionar favorito', erro: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const id = req.query.userId || (req.user && req.user.id);
    if (!id) {
      return res.status(401).json({ mensagem: 'Utilizador não autenticado.' });
    }
    const favorites = await Favorite.find({ userId: id });
    res.json({ favorites });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar favoritos', erro: err.message });
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.json({ mensagem: 'Favorito removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao remover favorito', erro: err.message });
  }
};
