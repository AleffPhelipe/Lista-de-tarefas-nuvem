const express = require('express');
const path = require('path');
const { getPool } = require('./database');

function createApp() {
  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

  app.get('/', async (_req, res, next) => {
    try {
      const { rows } = await getPool().query(
        'SELECT id, titulo, concluida, criada_em FROM tarefas ORDER BY criada_em DESC'
      );
      res.render('index', { tarefas: rows, erro: null });
    } catch (error) {
      next(error);
    }
  });

  app.post('/tarefas', async (req, res, next) => {
    const titulo = String(req.body.titulo || '').trim();
    if (!titulo || titulo.length > 120) {
      return res.status(400).send('Informe uma tarefa entre 1 e 120 caracteres.');
    }

    try {
      await getPool().query('INSERT INTO tarefas (titulo) VALUES ($1)', [titulo]);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  });

  app.post('/tarefas/:id/alternar', async (req, res, next) => {
    try {
      await getPool().query(
        'UPDATE tarefas SET concluida = NOT concluida WHERE id = $1',
        [req.params.id]
      );
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  });

  app.post('/tarefas/:id/excluir', async (req, res, next) => {
    try {
      await getPool().query('DELETE FROM tarefas WHERE id = $1', [req.params.id]);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  });

  app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).send('Não foi possível acessar o banco de dados. Verifique a configuração.');
  });

  return app;
}

module.exports = { createApp };
