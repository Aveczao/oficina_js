// controllers/evaluationsController.js
const Evaluation = require('../models/Evaluation');

exports.addEvaluation = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ mensagem: 'Utilizador não autenticado.' });
    }
    const evaluation = new Evaluation({
      userId: req.user.id,
      serviceId,
      rating,
      comment
    });
    await evaluation.save();
    res.status(201).json({ mensagem: 'Avaliação adicionada com sucesso.', evaluation });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao adicionar avaliação', erro: err.message });
  }
};

exports.getEvaluations = async (req, res) => {
  try {
    const { serviceId } = req.query;
    if (!serviceId) {
      return res.status(400).json({ mensagem: 'serviceId é necessário.' });
    }
    const evaluations = await Evaluation.find({ serviceId });
    res.json({ evaluations });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar avaliações', erro: err.message });
  }
};

exports.deleteEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    await Evaluation.findByIdAndDelete(id);
    res.json({ mensagem: 'Avaliação removida com sucesso.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao remover avaliação', erro: err.message });
  }
};
