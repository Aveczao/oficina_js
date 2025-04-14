// controllers/clienteController.js
const User = require('../models/User');
const Servico = require('../models/Servico');
const Reserva = require('../models/Reserva');
const { enviarNotificacao } = require('../utils/notificacoes');

exports.addVeiculo = async (req, res) => {
  try {
    const { marca, modelo, matricula } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ mensagem: 'Utilizador não autenticado.' });
    }
    const utilizador = await User.findById(req.user.id);
    if (!utilizador) {
      return res.status(404).json({ mensagem: 'Utilizador não encontrado.' });
    }
    const novoVeiculo = { marca, modelo, matricula };
    utilizador.veiculos.push(novoVeiculo);
    await utilizador.save();
    res.status(201).json({ mensagem: 'Veículo adicionado com sucesso.', veiculo: novoVeiculo });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao adicionar veículo', erro: err.message });
  }
};

exports.reservarServico = async (req, res) => {
  try {
    const { servicoId, dataHora, observacoes } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ mensagem: 'Utilizador não autenticado.' });
    }
    const servico = await Servico.findById(servicoId);
    if (!servico) {
      return res.status(404).json({ mensagem: 'Serviço não encontrado.' });
    }
    const novaReserva = new Reserva({
      idUtilizador: req.user.id,
      servicoId,
      dataHora,
      observacoes,
      estado: 'pendente',
      observacoesTecnicas: ''
    });
    await novaReserva.save();
    const utilizador = await User.findById(req.user.id);
    enviarNotificacao(utilizador.email, `A sua reserva para o serviço "${servico.nome}" foi criada e está pendente de confirmação.`);
    res.status(201).json({ mensagem: 'Reserva criada com sucesso e pendente de confirmação.', reserva: novaReserva });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar reserva', erro: err.message });
  }
};

exports.listarReservas = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ mensagem: 'Utilizador não autenticado.' });
    }
    let reservas = await Reserva.find({ idUtilizador: req.user.id });
    if (req.query.estado) {
      reservas = reservas.filter(r => r.estado === req.query.estado);
    }
    if (req.query.sort === 'asc') {
      reservas.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));
    } else if (req.query.sort === 'desc') {
      reservas.sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora));
    }
    res.json({ reservas });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar reservas', erro: err.message });
  }
};

exports.getReserva = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ mensagem: 'Utilizador não autenticado.' });
    }
    const reserva = await Reserva.findOne({ _id: req.params.id, idUtilizador: req.user.id });
    if (!reserva) {
      return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
    }
    res.json({ reserva });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao obter reserva', erro: err.message });
  }
};
