// utils/notificacoes.js

/**
 * Função para simular o envio de notificações (por exemplo, via email).
 * 
 * Nesta implementação, a função apenas regista a notificação no console,
 * permitindo simular o envio sem efetivamente utilizar um serviço real.
 * Em aplicações reais, esta função poderá ser adaptada para enviar notificações
 * através de outros canais, como SMS, push notifications ou email.
 *
 * @param {string} email - O endereço de email do destinatário.
 * @param {string} mensagem - A mensagem que se pretende enviar como notificação.
 */
function enviarNotificacao(email, mensagem) {
  console.log(`Notificação para ${email}: ${mensagem}`);
}

// Exporta a função enviarNotificacao para que possa ser utilizada noutras partes da aplicação.
module.exports = { enviarNotificacao };
