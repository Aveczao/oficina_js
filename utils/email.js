// utils/email.js
const nodemailer = require('nodemailer');

/**
 * Função para criar um transporter utilizando o serviço Ethereal para testes.
 * Em produção, pode-se configurar com um SMTP real (por exemplo, Gmail).
 */
async function createTransporter() {
  // Cria uma conta de testes com o Ethereal
  let testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true para porta 465, false para outras
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

/**
 * Envia um email para o destinatário com o assunto e texto informados.
 */
async function enviarEmail(destinatario, assunto, texto) {
  let transporter = await createTransporter();
  let info = await transporter.sendMail({
    from: '"Oficina" <no-reply@oficina.com>',
    to: destinatario,
    subject: assunto,
    text: texto,
    html: `<p>${texto}</p>`,
  });
  console.log("Mensagem enviada: %s", info.messageId);
  console.log("Visualizar em: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = { enviarEmail };
