# Open Banking API

API de Open Banking com NestJS, Prisma e PostgreSQL.
Objetivos Principais Promover Competição: Facilitar a entrada de novas empresas (fintechs) no mercado, quebrando o monopólio de dados dos grandes bancos.
A API é a ponte tecnológica que permite essa comunicação padronizada.

## Stack

- **Backend**: NestJS + Prisma + PostgreSQL
- **Auth**: JWT + Passport
- **Docs**: Swagger
- **Container**: Podman

## Como Executar

```bash
# Em modo Desenvolvimento
# Instalar dependências
yarn install

# Configurar banco
cp .env.example .env

# Subir com Podman
yarn podman-up

# Migrações
yarn prisma-migrate

# Popular banco
yarn prisma-seed

# Start App
yarn start-dev

```

## Scripts

```bash
yarn start-dev     # Desenvolvimento
yarn build         # Build
yarn test          # Testes
yarn podman-up     # Subir containers
yarn podman-down   # Parar containers
```

## Funcionalidades

- ✅ Autenticação JWT
- ✅ Gestão de usuários
- ✅ Contas bancárias
- ✅ Transações financeiras
- ✅ Swagger docs

## URLs

- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api/docs
- **Health**: http://localhost:3000/health
