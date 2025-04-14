// app.js
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(session({
  secret: 'chave_secreta_sessao',
  resave: false,
  saveUninitialized: true,
}));

// Importa todas as rotas
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const adminRoutes = require('./routes/adminRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const evaluationsRoutes = require('./routes/evaluationsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api', authRoutes);
app.use('/api', clienteRoutes);
app.use('/api', adminRoutes);
app.use('/api', servicoRoutes);
app.use('/api', favoritesRoutes);
app.use('/api', evaluationsRoutes);
app.use('/api', uploadRoutes);

module.exports = app;
