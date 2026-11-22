const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const ejs = require('ejs');

const caminho = path.join(__dirname, '../src/views/index.ejs');

async function renderizar(tarefas = []) {
  return ejs.renderFile(caminho, {
    tarefas,
    erro: null
  });
}

test('Frontend apresenta o titulo da pagina', async () => {
  const html = await renderizar();

  assert.match(html, /<title>Minhas Tarefas<\/title>/);
  assert.match(html, /<h1>Minhas tarefas<\/h1>/);
});

test('Frontend apresenta formulario de cadastro', async () => {
  const html = await renderizar();

  assert.match(html, /action="\/tarefas"/);
  assert.match(html, /method="post"/);
  assert.match(html, /name="titulo"/);
  assert.match(html, /Adicionar/);
});

test('Frontend apresenta mensagem quando nao existem tarefas', async () => {
  const html = await renderizar([]);

  assert.match(html, /Nenhuma tarefa cadastrada/);
});

test('Frontend exibe uma tarefa cadastrada', async () => {
  const html = await renderizar([
    {
      id: 1,
      titulo: 'Estudar Node.js',
      concluida: false,
      criada_em: new Date('2026-11-22T12:00:00Z')
    }
  ]);

  assert.match(html, /Estudar Node\.js/);
  assert.match(html, /\/tarefas\/1\/alternar/);
  assert.match(html, /\/tarefas\/1\/excluir/);
});

test('Frontend identifica tarefa concluida', async () => {
  const html = await renderizar([
    {
      id: 2,
      titulo: 'Finalizar atividade',
      concluida: true,
      criada_em: new Date('2026-11-22T12:00:00Z')
    }
  ]);

  assert.match(html, /class="tarefa concluida"/);
});

test('Frontend apresenta limite de 120 caracteres', async () => {
  const html = await renderizar();

  assert.match(html, /maxlength="120"/);
  assert.match(html, /required/);
});