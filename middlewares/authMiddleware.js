// middlewares/authMiddleware.js
/**
 * Middleware para verificar se o utilizador está autenticado.
 */
function requireLogin(req, res, next) {
    if (!req.session.utilizador) {
      return res.status(401).json({ mensagem: 'Utilizador não autenticado.' });
    }
    next();
  }
  
  /**
   * Middleware para verificar se o utilizador é administrador.
   */
  function requireAdmin(req, res, next) {
    if (!req.session.utilizador || !req.session.utilizador.isAdmin) {
      return res.status(403).json({ mensagem: 'Acesso negado. Apenas administradores podem aceder a esta rota.' });
    }
    next();
  }
  
  module.exports = { requireLogin, requireAdmin };
  