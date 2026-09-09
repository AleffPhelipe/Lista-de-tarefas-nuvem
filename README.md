# Lista de Tarefas na Nuvem

Aplicação acadêmica com front-end, back-end e acesso a banco de dados, preparada
para publicação em PaaS (Render) e IaaS (AWS EC2).

## Tecnologias

- Node.js e Express no back-end
- EJS, HTML e CSS no front-end
- PostgreSQL como banco de dados
- Docker e Docker Compose para a implantação em máquina virtual

## Execução local com Docker

```bash
docker compose up --build
```

Depois, acesse `http://localhost:3000`.

## Execução sem Docker

1. Crie um banco PostgreSQL chamado `lista_tarefas`.
2. Copie `.env.example` para `.env` e confira a conexão.
3. Execute:

```bash
npm install
npm start
```

A tabela é criada automaticamente na primeira inicialização.

## Variáveis de ambiente

| Variável | Finalidade |
| --- | --- |
| `PORT` | Porta HTTP da aplicação |
| `DATABASE_URL` | Endereço de conexão do PostgreSQL |
| `DATABASE_SSL` | Use `true` quando o provedor exigir SSL |

## Funcionalidades

- Cadastrar tarefa
- Marcar ou desmarcar como concluída
- Excluir tarefa
- Armazenar os dados permanentemente no PostgreSQL
- Endpoint de verificação em `/health`
