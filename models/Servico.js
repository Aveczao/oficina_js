// models/Servico.js
const mongoose = require('./db');
const Schema = mongoose.Schema;

const ServicoSchema = new Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  tempoEstimado: { type: Number, required: true },
  fabricante: { type: String },
  categoria: { type: String },
  tags: { type: [String] }
}, { timestamps: true });

module.exports = mongoose.model('Servico', ServicoSchema);
