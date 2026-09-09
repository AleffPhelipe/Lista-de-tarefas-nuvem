require('dotenv').config();
const { createApp } = require('./app');
const { initializeDatabase } = require('./database');

const port = Number(process.env.PORT) || 3000;

async function start() {
  await initializeDatabase();
  createApp().listen(port, '0.0.0.0', () => {
    console.log(`Aplicação disponível na porta ${port}`);
  });
}

start().catch((error) => {
  console.error('Falha ao iniciar a aplicação:', error);
  process.exit(1);
});
