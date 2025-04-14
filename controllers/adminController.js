// controllers/adminController.js
const Servico = require('../models/Servico');
const Reserva = require('../models/Reserva');
const User = require('../models/User');
const { enviarNotificacao } = require('../utils/notificacoes');

exports.addServico = async (req, res) => {
  try {
    const { nome, descricao, preco, tempoEstimado, fabricante, categoria, tags } = req.body;
    const novoServico = new Servico({ nome, descricao, preco, tempoEstimado, fabricante, categoria, tags });
    await novoServico.save();
    res.status(201).json({ mensagem: 'Serviço criado com sucesso.', servico: novoServico });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar serviço', erro: err.message });
  }
};

exports.atualizarServico = async (req, res) => {
  try {
    const servico = await Servico.findById(req.params.id);
    if (!servico) {
      return res.status(404).json({ mensagem: 'Serviço não encontrado.' });
    }
    const { nome, descricao, preco, tempoEstimado, fabricante, categoria, tags } = req.body;
    if (nome) servico.nome = nome;
    if (descricao) servico.descricao = descricao;
    if (preco) servico.preco = preco;
    if (tempoEstimado) servico.tempoEstimado = tempoEstimado;
    if (fabricante) servico.fabricante = fabricante;
    if (categoria) servico.categoria = categoria;
    if (tags) servico.tags = tags;
    await servico.save();
    res.json({ mensagem: 'Serviço atualizado com sucesso.', servico });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar serviço', erro: err.message });
  }
};

exports.eliminarServico = async (req, res) => {
  try {
    const servico = await Servico.findByIdAndDelete(req.params.id);
    if (!servico) {
      return res.status(404).json({ mensagem: 'Serviço não encontrado.' });
    }
    res.json({ mensagem: 'Serviço eliminado com sucesso.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao eliminar serviço', erro: err.message });
  }
};

exports.updateReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) {
      return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
    }
    const { estado, observacoesTecnicas } = req.body;
    if (estado) reserva.estado = estado;
    if (observacoesTecnicas) reserva.observacoesTecnicas = observacoesTecnicas;
    await reserva.save();
    const utilizador = await User.findById(reserva.idUtilizador);
    enviarNotificacao(utilizador.email, `O estado da sua reserva foi atualizado para "${reserva.estado}".`);
    res.json({ mensagem: 'Reserva atualizada com sucesso.', reserva });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar reserva', erro: err.message });
  }
};

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await User.find({});
    const clientesFiltrados = clientes.map(u => ({
      id: u._id,
      nome: u.nome,
      email: u.email,
      contacto: u.contacto,
      isAdmin: u.isAdmin,
      veiculos: u.veiculos
    }));
    res.json({ clientes: clientesFiltrados });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar clientes', erro: err.message });
  }
};

exports.gerarRelatorio = async (req, res) => {
  try {
    // Estatísticas: número de serviços prestados no mês atual e média de avaliação geral.
    // Para número de serviços prestados no mês atual:
    const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const reservasMes = await Reserva.find({ 
      estado: 'concluído',
      createdAt: { $gte: inicioMes }
    });
    const totalServicos = reservasMes.length;

    // Para a média de avaliação geral:
    const evaluations = await require('../models/Evaluation').find({});
    let totalRating = 0, countRating = 0;
    evaluations.forEach(e => {
      totalRating += e.rating;
      countRating++;
    });
    const mediaAvaliacao = countRating > 0 ? totalRating / countRating : 0;

    res.json({ 
      relatorio: {
        totalServicosMes: totalServicos,
        mediaAvaliacao: mediaAvaliacao.toFixed(2)
      }
    });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: err.message });
  }
};

exports.listarServicos = async (req, res) => {
  try {
    let servicos = await require('../models/Servico').find({});
    if (req.query.search) {
      const termo = req.query.search.toLowerCase();
      servicos = servicos.filter(s => s.nome.toLowerCase().includes(termo));
    }
    if (req.query.sort === 'asc') {
      servicos.sort((a, b) => a.preco - b.preco);
    } else if (req.query.sort === 'desc') {
      servicos.sort((a, b) => b.preco - a.preco);
    }
    res.json({ servicos });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar serviços', erro: err.message });
  }
};
