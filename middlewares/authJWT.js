// middlewares/authJWT.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'minha_chave_secreta_jwt';

/**
 * Middleware para proteger rotas que requerem autenticação via JWT.
 * Verifica se o header Authorization contém um token válido.
 */
function requireJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ mensagem: 'Token mal formatado.' });
  }
  
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ mensagem: 'Token mal formatado.' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { requireJWT };
