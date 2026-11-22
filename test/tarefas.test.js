const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');

async function iniciarServidor() {
  const server = createApp().listen(0, '127.0.0.1');

  await new Promise(resolve =>
    server.once('listening', resolve)
  );

  return server;
}

async function fecharServidor(server) {
  await new Promise((resolve, reject) =>
    server.close(error =>
      error ? reject(error) : resolve()
    )
  );
}

test('Nao permite cadastrar tarefa vazia', async () => {
  const server = await iniciarServidor();

  try {
    const { port } = server.address();

    const response = await fetch(
      `http://127.0.0.1:${port}/tarefas`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'titulo='
      }
    );

    assert.equal(response.status, 400);
  } finally {
    await fecharServidor(server);
  }
});

test('Nao permite titulo com mais de 120 caracteres', async () => {
  const server = await iniciarServidor();

  try {
    const { port } = server.address();

    const response = await fetch(
      `http://127.0.0.1:${port}/tarefas`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          titulo: 'A'.repeat(121)
        })
      }
    );

    assert.equal(response.status, 400);
  } finally {
    await fecharServidor(server);
  }
});