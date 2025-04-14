// models/TokenConfirmacao.js
const mongoose = require('./db');
const Schema = mongoose.Schema;

/**
 * Schema para armazenar tokens de confirmação enviados por email.
 * Cada token é de uso único e tem um tempo de expiração curto.
 */
const TokenConfirmacaoSchema = new Schema({
  token: { type: String, required: true },
  idUtilizador: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  utilizado: { type: Boolean, default: false },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TokenConfirmacao', TokenConfirmacaoSchema);
