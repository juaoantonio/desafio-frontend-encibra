# Documentação do Projeto - Plataforma de Perfil de Colaboradores

Este documento descreve o projeto de desenvolvimento de uma plataforma de Perfil de Colaboradores para uma empresa de tecnologia, atendendo às Regras de Negócio e Requisitos Técnicos definidos. A plataforma tem como objetivo organizar perfis de colaboradores em diversas áreas de atuação e permitir o acesso, gestão e alocação de colaboradores em projetos. O desenvolvimento será realizado utilizando React/Next.js (Versão 13).

Acesse o projeto em produção [aqui](https://https://desafio-encibra.joaobarbosa.dev.br/).

## Iniciando o projeto localmente

Para rodar o projeto na sua máquina, depois de ter feito o clone do repositório, você deve instalar as dependências do projeto com o comando:

```bash
$ npm install
```

Depois, para rodar o projeto localmente, você deve executar o comando:

```bash
$ npm run dev
```

Esse comando irá:

- Criar um arquivo .env com base no arquivo .env-example contendo as variáveis de ambiente necessárias para o projeto
- Levantar um container postgresql com docker
- Fazer a conexão do orm Prisma com o banco de dados
- Inserir dados iniciais no banco de dados
- Levantar o servidor Next.js na porta 3000

Se não quiser que os dados sejam reinseridos no banco de dados, você pode executar o comando:

```bash
$ npm run dev:without-seed
```

Para fazer login, você pode utilizar os seguintes dados:

- Admin (Gestor):

  - Email: admin@admin.com
  - Senha: admin

- Alice Johnson (Colaboradora):
  - Email: alice.johnson@example.com
  - Senha: senha123

## Documentação

### Estrutura Geral

O projeto segue uma arquitetura que separa as camadas de Frontend e Backend, utilizando o Next.js como framework para o Frontend e Backend, junto do Prisma para a conexão. O Frontend é responsável por renderizar as páginas e fazer as requisições para o Backend, que é responsável por fazer a conexão com o banco de dados e retornar os dados para o Frontend, via API REST.

#### Backend

Temos as seguintes rotas para a API REST do Backend:

Para operações relacionadas a colaboradores:

- GET /api/collaborators
- GET /api/collaborators/:id
- POST /api/collaborators
- PUT /api/collaborators/:id
- DELETE /api/collaborators/:id

Para operações relacionadas a projetos:

- GET /api/projects
- GET /api/projects/:id
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id

Para uma melhor abstração, a comunicação com o banco não é feita diretamente nas rotas, mas sim em um arquivo de **services**, que é responsável por fazer a conexão com o banco de dados e retornar os dados para as rotas.

#### Banco de Dados

Para o desenvolvimento dessa plataforma, foi utilizado o banco de dados Postgresql, com o ORM Prisma para fazer a conexão com o banco de dados. O Prisma é um ORM que permite a conexão com diversos bancos de dados, como Postgresql, MySQL, MongoDB, etc. Para o desenvolvimento, foi utilizado o Postgresql, mas o Prisma permite a troca do banco de dados de forma simples, apenas alterando as configurações no arquivo `.env`.

##### Tabelas do banco de dados:

Project:

- `id -> Inteiro, chave primária`
- `name -> String`
- `description -> String`
- `deadline -> Date`
- `technologies -> String[]`

Collaborator:

- `id -> Inteiro, chave primária`
- `name -> String`
- `email -> String`
- `phone -> String`
- `fieldsOfWork -> String[]`
- `gender -> String`
- `manager -> Boolean`
- `password -> String`
- `gender -> String`
- `imgUrl -> String`
- `adress -> String`

#### Frontend

No Frontend, temos as seguintes páginas:

- /login (Público)
- /dashboard (Requer autenticação)

  - /collaborators

    - /collaborators/:id (Requer autorização)
    - /collaborators/:id/editar (Requer autorização)
    - /collaborators/criar (Requer autorização)

  - /projects
    - /projects/:id/editar (Requer autorização)
    - /projects/criar (Requer autorização)

### Regras de Negócio

- **Associação de Colaboradores:**

  - Cada Colaborador deve estar associado a uma ou mais áreas de atuação.
  - Os Colaboradores devem conter informações identificativas (Nome, Idade, regime de contratação, etc.).

- **Colaboradores e Gestores:**

  - O sistema distingue entre Colaboradores Normais e Colaboradores Gestores.
  - Colaboradores Gestores podem realizar ações em outros Colaboradores, como atualizar seus dados.

- **Alocação em Projetos:**

  - Colaboradores Gestores podem alocar um ou mais Colaboradores em um ou mais Projetos.

- **Projetos:**

  - Cada Projeto deve conter informações identificativas (Nome, Prazo, Descrição, Tecnologias, etc.).
  - Cada Projeto deve ter, no mínimo, um Colaborador de Gestão, um de Backend e um de Frontend.

- **Restrições de Acesso:**
  - Colaboradores de Gestão têm acesso a dados sensíveis, como o Regime de Contratação.
  - Colaboradores Normais não podem realizar ações em outros Colaboradores; apenas Colaboradores Gestores podem fazê-lo.
    git
