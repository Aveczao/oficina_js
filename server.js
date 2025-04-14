// server.js

// Importa a aplicação Express configurada no ficheiro app.js
const app = require('./app');
// Importa o módulo bcryptjs para encriptar a palavra-passe
const bcrypt = require('bcryptjs');
// Importa o modelo User para interagir com a coleção de utilizadores na base de dados
const User = require('./models/User');
const nodemailer = require('nodemailer');


// Define a porta na qual o servidor irá correr
const PORT = 3000;

// Inicia o servidor, a escuta na porta definida e executa uma função assíncrona ao iniciar
app.listen(PORT, async () => {
  console.log(`Servidor a correr na porta ${PORT}`);
  try {
    // Verifica se já existe um utilizador administrador com o email 'admin@example.com'
    let adminExistente = await User.findOne({ email: 'admin@example.com' });
    if (!adminExistente) {
      // Se não existir, encripta a palavra-passe 'admin123' com 10 salt rounds
      const passwordCriptografada = await bcrypt.hash('admin123', 10);
      // Cria um novo registo de administrador com os dados fornecidos
      const novoAdmin = new User({
        nome: 'Administrador',
        email: 'admin@example.com',
        password: passwordCriptografada,
        contacto: '123456789',
        // Define o utilizador como administrador (atributo isAdmin)
        isAdmin: true,
        // Inicializa o array de veículos como vazio
        veiculos: []
      });
      // Guarda o novo administrador na base de dados
      await novoAdmin.save();
      console.log('Utilizador administrador criado: admin@example.com / admin123');
    }
  } catch (err) {
    // Em caso de erro na criação do administrador, regista o erro no console
    console.error('Erro ao criar admin:', err.message);
  }

  
});
