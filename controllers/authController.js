// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const TokenConfirmacao = require('../models/TokenConfirmacao');
const { enviarEmail } = require('../utils/email');

// Chave secreta para assinatura dos tokens JWT
const SECRET_KEY = 'minha_chave_secreta_jwt';

/**
 * Login do utilizador.
 * Se as credenciais estiverem corretas, gera um token de confirmação (válido por 5 minutos)
 * que é armazenado e enviado por email ao utilizador para confirmação.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const utilizador = await User.findOne({ email });
    if (!utilizador) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas.' });
    }
    const passwordValida = await bcrypt.compare(password, utilizador.password);
    if (!passwordValida) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas.' });
    }
    
    // Gera um token de confirmação com 5 minutos de expiração e um jwtid único
    const tokenConfirmacao = jwt.sign(
      { id: utilizador._id, email: utilizador.email },
      SECRET_KEY,
      { expiresIn: '5m', jwtid: crypto.randomBytes(16).toString("hex") }
    );
    
    // Armazena o token na coleção TokenConfirmacao
    const tokenRegistro = new TokenConfirmacao({
      token: tokenConfirmacao,
      idUtilizador: utilizador._id,
      utilizado: false,
    });
    await tokenRegistro.save();
    
    // Prepara o link de confirmação
    const linkConfirmacao = `http://localhost:3000/api/confirmar-login?token=${tokenConfirmacao}`;
    
    // Envia o email com o token de confirmação
    await enviarEmail(utilizador.email, 'Confirmação de Login', `Clique no link para confirmar o seu login: ${linkConfirmacao}`);
    
    res.json({ mensagem: 'Token de confirmação enviado por email. Por favor, confirme o login.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no login', erro: err.message });
  }
};

/**
 * Confirma o login do utilizador.
 * Valida o token de confirmação, verifica se não foi utilizado e, em caso positivo,
 * gera um novo token de acesso com validade prolongada (24 horas).
 */
exports.confirmarLogin = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ mensagem: 'Token é necessário.' });
    }
    
    // Verifica o token JWT de confirmação
    let payload;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return res.status(400).json({ mensagem: 'Token inválido ou expirado.' });
    }
    
    // Consulta a coleção TokenConfirmacao para verificar se o token existe e não foi utilizado
    const tokenRegistro = await TokenConfirmacao.findOne({ token });
    if (!tokenRegistro) {
      return res.status(400).json({ mensagem: 'Token não encontrado.' });
    }
    if (tokenRegistro.utilizado) {
      return res.status(400).json({ mensagem: 'Token já utilizado.' });
    }
    
    // Marca o token como utilizado
    tokenRegistro.utilizado = true;
    await tokenRegistro.save();
    
    // Gera um novo token de acesso com validade de 24 horas para autenticar o utilizador
    const tokenAcesso = jwt.sign(
      { id: payload.id, email: payload.email },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    
    res.json({ mensagem: 'Login confirmado com sucesso.', token: tokenAcesso });
    
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro na confirmação do login', erro: err.message });
  }
};

// O resto das funções (registo, logout, alteração e recuperação de password)
// permanecem inalteradas ou adaptadas conforme a necessidade de JWT.
