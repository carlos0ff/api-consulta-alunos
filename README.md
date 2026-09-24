<h1 align="center">API de Alunos — Consulta por ID</h1>

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge\&logo=express\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.4-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=for-the-badge\&logo=zod\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)

</div>

<div align="center">

<strong>Disciplina:</strong> Programação para Frameworks Web  ·  <strong>Professor:</strong> <a href="https://github.com/southiagorm">Thiago Rodrigues</a>

</div>

---

## 📚 Sobre o projeto

Atividade desenvolvida para a disciplina **Programação para Frameworks Web**.

A aplicação implementa o endpoint `GET /alunos/:id`, permitindo consultar um aluno cadastrado a partir do seu ID.

O projeto utiliza **Zod** para validação do parâmetro recebido pela URL, **Prisma** para acesso ao banco de dados por meio do método `findUnique` e uma **exceção personalizada** para tratar alunos não encontrados.

O ambiente de desenvolvimento é executado com **Docker**, utilizando containers para a API e o banco de dados MySQL.

## 👨‍💻 Informações acadêmicas



## 🚀 Tecnologias

* **Node.js 22**
* **Express 5**
* **Prisma 7**
* **MariaDB Adapter**
* **MySQL 8.4**
* **Zod 4**
* **Docker**
* **Docker Compose**

## 📁 Estrutura do projeto

```text
src/
├── index.js
├── routes/
│   └── alunoRoutes.js
├── middlewares/
│   ├── validarId.js
│   └── errorHandler.js
├── schemas/
│   └── idParamSchema.js
├── controllers/
│   └── AlunoController.js
├── services/
│   └── AlunoService.js
├── errors/
│   ├── ApiError.js
│   └── AlunoNaoEncontradoError.js
└── databases/
    └── prisma.js

prisma/
├── schema.prisma
├── migrations/
└── seed.js
```

### Responsabilidade dos componentes

| Camada           | Responsabilidade                                     |
| ---------------- | ---------------------------------------------------- |
| **Zod**          | Valida o parâmetro `id` recebido pela URL            |
| **Middleware**   | Intercepta e valida o ID antes do controller         |
| **Controller**   | Recebe a requisição e retorna a resposta HTTP        |
| **Service**      | Contém a regra de negócio e realiza a busca do aluno |
| **Prisma**       | Realiza o acesso ao banco utilizando `findUnique`    |
| **Exceções**     | Representam erros específicos da aplicação           |
| **errorHandler** | Converte exceções em respostas HTTP adequadas        |

## 🐳 Como executar

### Pré-requisitos

* Docker
* Docker Compose
* Node.js 22+ para execução de comandos do Prisma fora do container

> **WSL:** caso utilize WSL, habilite a integração da distribuição no Docker Desktop em **Settings → Resources → WSL Integration**.

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar as variáveis de ambiente

```bash
cp .env.example .env
```

Exemplo de configuração:

| Variável       | Descrição                     | Padrão                                  |
| -------------- | ----------------------------- | --------------------------------------- |
| `DATABASE_URL` | URL utilizada pelo Prisma CLI | `mysql://root:root@localhost:3307/univ` |
| `DB_HOST`      | Host do MySQL                 | `localhost`                             |
| `DB_PORT`      | Porta do MySQL                | `3307`                                  |
| `DB_USER`      | Usuário do banco              | `root`                                  |
| `DB_PASSWORD`  | Senha do banco                | `root`                                  |
| `DB_NAME`      | Nome do banco                 | `univ`                                  |
| `PORT`         | Porta da API                  | `3000`                                  |

> Dentro do Docker, as configurações de conexão são sobrescritas pelo `docker-compose.yml` para que a API utilize o container `db`.

### 3. Executar com Docker

```bash
docker compose up -d --build
```

Após a inicialização, a API estará disponível em:

```text
http://localhost:3000
```

O container da API aguarda o MySQL ficar saudável, aplica as migrations, executa o seed e inicia o servidor.

## 🔌 Endpoint

### `GET /alunos/:id`

Consulta um aluno cadastrado pelo seu ID.

### Aluno encontrado

```http
GET /alunos/1
```

**Status:** `200 OK`

```json
{
  "id": 1,
  "nome": "João da Silva",
  "email": "joao@email.com"
}
```

### Aluno não encontrado

```http
GET /alunos/999
```

**Status:** `404 Not Found`

```json
{
  "message": "Aluno não encontrado"
}
```

### ID inválido

```http
GET /alunos/abc
```

**Status:** `400 Bad Request`

```json
{
  "message": "ID deve ser numérico"
}
```

## 🧪 Testando a API

### Aluno existente

```bash
curl -i http://localhost:3000/alunos/1
```

### Aluno inexistente

```bash
curl -i http://localhost:3000/alunos/999
```

### ID inválido

```bash
curl -i http://localhost:3000/alunos/abc
```

## 🛠️ Executando fora do Docker

Para executar a API localmente e manter somente o banco no Docker:

```bash
docker compose up -d db
```

Depois:

```bash
npx prisma generate
npx prisma migrate deploy
npm run seed
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## 📦 Comandos úteis

```bash
# Ver status dos containers
docker compose ps

# Visualizar logs da API
docker compose logs -f api

# Parar os containers
docker compose down

# Parar e remover os dados do banco
docker compose down -v

# Criar uma nova migration
npx prisma migrate dev --name nome-da-migration

# Abrir o Prisma Studio
npx prisma studio
```

## ⚠️ Problemas comuns

| Erro                                         | Possível causa                                   | Solução                                            |
| -------------------------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| `no configuration file provided`             | `docker-compose.yml` não encontrado              | Execute o comando na raiz do projeto               |
| `P1001: Can't reach database server`         | MySQL não está disponível                        | Execute `docker compose up -d db`                  |
| `The table Aluno does not exist`             | Migrations não aplicadas                         | Execute `npx prisma migrate deploy`                |
| `ERR_CONNECTION_REFUSED` em `localhost:3307` | Tentativa de acessar o MySQL como se fosse a API | Utilize `http://localhost:3000` para acessar a API |

---

<div align="center">

**Programação para Frameworks Web**

**API de Alunos — Consulta por ID**

</div>
