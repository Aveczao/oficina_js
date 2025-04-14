// models/Reserva.js

// Importa o módulo mongoose, que foi previamente configurado para a ligação à base de dados (em './db')
const mongoose = require('./db');
// Cria um atalho para o construtor Schema do mongoose
const Schema = mongoose.Schema;

// Define o esquema para a coleção de reservas
const ReservaSchema = new Schema({
  // Campo que armazena o ID do utilizador que fez a reserva.
  // O tipo é ObjectId, que referencia o modelo 'User'. Este campo é obrigatório.
  idUtilizador: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // Campo que armazena o ID do serviço reservado.
  // O tipo é ObjectId, que referencia o modelo 'Servico'. Este campo é obrigatório.
  servicoId: { type: Schema.Types.ObjectId, ref: 'Servico', required: true },
  // Campo que guarda a data e hora da reserva. É do tipo Date e é obrigatório.
  dataHora: { type: Date, required: true },
  // Campo para armazenar observações fornecidas pelo utilizador durante a reserva.
  observacoes: { type: String },
  // Campo que representa o estado da reserva. O valor por defeito é 'pendente'.
  estado: { type: String, default: 'pendente' },
  // Campo para armazenar observações técnicas, como notas de manutenção.
  // Por defeito, é uma string vazia.
  observacoesTecnicas: { type: String, default: '' }
}, { timestamps: true }); // A opção timestamps adiciona automaticamente os campos 'createdAt' e 'updatedAt'.

// Exporta o modelo 'Reserva', permitindo interagir com a coleção de reservas na base de dados
module.exports = mongoose.model('Reserva', ReservaSchema);
