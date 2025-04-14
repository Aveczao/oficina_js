// models/User.js
const mongoose = require('./db');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contacto: { type: String, required: true },
  veiculos: [{
    marca: String,
    modelo: String,
    matricula: String,
  }],
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
