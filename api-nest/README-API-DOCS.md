# 🏦 Open Banking API - Documentação Completa

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Características](#características)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando a API](#executando-a-api)
- [Documentação da API](#documentação-da-api)
- [Endpoints](#endpoints)
- [Autenticação](#autenticação)
- [Modelos de Dados](#modelos-de-dados)
- [Exemplos de Uso](#exemplos-de-uso)
- [Testes](#testes)
- [Deploy](#deploy)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 🎯 Visão Geral

A **Open Banking API** é uma solução completa para gerenciamento de serviços bancários digitais, desenvolvida com NestJS e TypeScript. Esta API oferece funcionalidades robustas para autenticação de usuários, gerenciamento de contas bancárias e processamento de transações financeiras.

### 🎯 Objetivos

- **Digitalização Bancária**: Transformar serviços bancários tradicionais em soluções digitais
- **Segurança**: Implementar autenticação JWT e validação robusta de dados
- **Escalabilidade**: Arquitetura modular e preparada para crescimento
- **Padrões Abertos**: Seguir especificações Open Banking para interoperabilidade

---

## ✨ Características

### 🔐 **Segurança**
- Autenticação JWT com refresh tokens
- Validação de dados com class-validator
- Guards de autorização baseados em roles
- Criptografia de senhas com bcrypt

### 🏗️ **Arquitetura**
- Arquitetura modular com NestJS
- Padrão Repository para acesso a dados
- Injeção de dependências
- Interceptors para logging e transformação

### 📊 **Banco de Dados**
- PostgreSQL com TypeORM
- Migrações automáticas
- Relacionamentos entre entidades
- Transações ACID

### 🧪 **Qualidade**
- Testes unitários com Jest
- Testes e2e com Supertest
- Cobertura de código
- Validação de schemas

---

## 🛠️ Tecnologias

### **Backend**
- **Framework**: NestJS 10.x
- **Linguagem**: TypeScript 5.x
- **Runtime**: Node.js 20.x
- **ORM**: TypeORM 0.3.x
- **Validação**: class-validator, class-transformer

### **Banco de Dados**
- **SGBD**: PostgreSQL 15
- **Cliente**: pgAdmin4
- **Migrações**: TypeORM CLI

### **Testes**
- **Framework**: Jest
- **E2E**: Supertest
- **Cobertura**: Jest Coverage

### **DevOps**
- **Containerização**: Docker & Docker Compose
- **Gerenciamento**: Makefile
- **Monitoramento**: Logs estruturados

---

## 📋 Pré-requisitos

### **Sistema**
- Linux/macOS/Windows
- Docker 20.10+
- Docker Compose 2.0+
- Node.js 20.x (para desenvolvimento local)
- Yarn 1.22+ ou npm 8+

### **Portas Disponíveis**
- **3000**: API NestJS
- **5432**: PostgreSQL
- **5050**: pgAdmin4

---

## 🚀 Instalação

### 1. **Clone o Repositório**
```bash
git clone <repository-url>
cd open-banking/api-nest
```

### 2. **Configuração do Ambiente**
```bash
# Copiar arquivo de configuração
cp .env.example .env

# Editar variáveis de ambiente
nano .env
```

### 3. **Instalação de Dependências**
```bash
# Com Yarn (recomendado)
yarn install

# Ou com npm
npm install
```

---

## ⚙️ Configuração

### **Variáveis de Ambiente (.env)**
```env
# Aplicação
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=open_banking

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Swagger
SWAGGER_TITLE=Open Banking API
SWAGGER_DESCRIPTION=API para serviços bancários digitais
SWAGGER_VERSION=1.1.1
```

### **Configurações do Banco**
```typescript
// src/config/database.config.ts
export const databaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
};
```

---

## 🚀 Executando a API

### **Opção 1: Docker (Recomendado)**
```bash
# Build e inicialização completa
make iniciar

# Ou comandos individuais
docker compose up -d
docker compose logs -f app
```

### **Opção 2: Desenvolvimento Local**
```bash
# Instalar dependências
yarn install

# Executar migrações
yarn migration:run

# Iniciar em modo desenvolvimento
yarn start:dev
```

### **Comandos Úteis (Makefile)**
```bash
make ajuda          # Lista todos os comandos disponíveis
make iniciar        # Inicia todos os serviços
make parar          # Para todos os serviços
make restart        # Reinicia todos os serviços
make logs           # Mostra logs da aplicação
make test           # Executa testes
make test:cov       # Executa testes com cobertura
```

---

## 📚 Documentação da API

### **Swagger UI**
- **URL**: http://localhost:3000/api/v1/docs
- **Descrição**: Interface interativa para testar endpoints
- **Autenticação**: Bearer Token JWT

### **Health Check**
- **URL**: http://localhost:3000/api/v1/health
- **Método**: GET
- **Resposta**: Status da aplicação e timestamp

---

## 🔗 Endpoints

### **🏠 App Module**
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/v1/health` | Status da aplicação | ❌ |

### **👤 Users Module**
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/v1/users` | Criar usuário | ❌ |
| GET | `/api/v1/users/:id` | Buscar usuário por ID | ✅ |

### **🔐 Auth Module**
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/v1/auth/login` | Login do usuário | ❌ |

### **🏦 Accounts Module**
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/v1/accounts` | Criar conta bancária | ✅ |
| GET | `/api/v1/accounts` | Listar contas do usuário | ✅ |
| GET | `/api/v1/accounts/:id` | Buscar conta por ID | ✅ |

### **💳 Transactions Module**
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/v1/accounts/:accountId/transactions` | Criar transação | ✅ |
| GET | `/api/v1/accounts/:accountId/transactions` | Listar transações da conta | ✅ |

---

## 🔐 Autenticação

### **JWT (JSON Web Token)**
A API utiliza autenticação baseada em JWT para proteger endpoints sensíveis.

#### **Fluxo de Autenticação**
1. **Login**: POST `/api/v1/auth/login`
2. **Receber Token**: JWT no corpo da resposta
3. **Usar Token**: Incluir no header `Authorization: Bearer <token>`

#### **Exemplo de Login**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### **Resposta de Login**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 86400,
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "João Silva"
  }
}
```

#### **Usando Token Autenticado**
```bash
curl -X GET http://localhost:3000/api/v1/accounts \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📊 Modelos de Dados

### **👤 User Entity**
```typescript
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'USER' })
  role: string;

  @OneToMany(() => Account, account => account.user)
  accounts: Account[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
```

### **🏦 Account Entity**
```typescript
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  accountNumber: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'enum', enum: AccountType, default: AccountType.CHECKING })
  type: AccountType;

  @ManyToOne(() => User, user => user.accounts)
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.account)
  transactions: Transaction[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
```

### **💳 Transaction Entity**
```typescript
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Account, account => account.transactions)
  account: Account;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
```

### **📝 Enums**
```typescript
export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  INVESTMENT = 'INVESTMENT',
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
}
```

---

## 💡 Exemplos de Uso

### **1. Criar Usuário**
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@example.com",
    "password": "senha123"
  }'
```

### **2. Fazer Login**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "password": "senha123"
  }'
```

### **3. Criar Conta Bancária**
```bash
curl -X POST http://localhost:3000/api/v1/accounts \
  -H "Authorization: Bearer <seu-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CHECKING"
  }'
```

### **4. Fazer Depósito**
```bash
curl -X POST http://localhost:3000/api/v1/accounts/<account-id>/transactions \
  -H "Authorization: Bearer <seu-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000.00,
    "type": "deposit",
    "description": "Salário"
  }'
```

### **5. Consultar Saldo**
```bash
curl -X GET http://localhost:3000/api/v1/accounts/<account-id> \
  -H "Authorization: Bearer <seu-token>"
```

---

## 🧪 Testes

### **Executar Testes**
```bash
# Testes unitários
yarn test

# Testes com cobertura
yarn test:cov

# Testes e2e
yarn test:e2e

# Testes em modo watch
yarn test:watch
```

### **Cobertura de Código**
```bash
# Gerar relatório de cobertura
yarn test:cov

# Abrir relatório no navegador
open coverage/lcov-report/index.html
```

### **Estrutura de Testes**
```
test/
├── app.e2e-spec.ts           # Testes e2e da aplicação
├── auth/                      # Testes do módulo de autenticação
├── users/                     # Testes do módulo de usuários
├── accounts/                  # Testes do módulo de contas
└── transactions/              # Testes do módulo de transações
```

---

## 🚀 Deploy

### **Ambiente de Produção**
```bash
# Build para produção
yarn build

# Executar migrações
yarn migration:run

# Iniciar aplicação
yarn start:prod
```

### **Docker Production**
```dockerfile
# Dockerfile.prod
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

### **Variáveis de Produção**
```env
NODE_ENV=production
PORT=3000
DB_HOST=production-db-host
DB_PASSWORD=strong-production-password
JWT_SECRET=very-long-and-secure-jwt-secret
```

---

## 📊 Monitoramento

### **Health Checks**
- **Endpoint**: `/api/v1/health`
- **Frequência**: A cada 30 segundos
- **Métricas**: Status da aplicação, timestamp, versão

### **Logs**
```typescript
// Estrutura de logs
{
  timestamp: "2025-01-01T12:00:00.000Z",
  level: "info",
  message: "User created successfully",
  userId: "123e4567-e89b-12d3-a456-426614174000",
  operation: "CREATE_USER"
}
```

### **Métricas Recomendadas**
- Taxa de requisições por segundo
- Tempo de resposta médio
- Taxa de erro
- Uso de memória e CPU
- Conexões ativas do banco

---

## 🔧 Troubleshooting

### **Problemas Comuns**

#### **1. Erro de Conexão com Banco**
```bash
# Verificar status dos containers
docker compose ps

# Ver logs do banco
docker compose logs db

# Testar conexão
make db-connect
```

#### **2. Erro de Autenticação JWT**
```bash
# Verificar variável JWT_SECRET
echo $JWT_SECRET

# Verificar expiração do token
# Tokens expiram em 24h por padrão
```

#### **3. Erro de Validação de Dados**
```bash
# Verificar logs da aplicação
docker compose logs app

# Validar formato dos dados enviados
# Usar Swagger UI para exemplos corretos
```

#### **4. Erro de Porta em Uso**
```bash
# Verificar portas ocupadas
netstat -tulpn | grep :3000

# Parar serviços conflitantes
docker compose down
```

### **Comandos de Debug**
```bash
# Status dos serviços
make db-status

# Logs em tempo real
make logs

# Conectar ao banco
make db-connect

# Backup do banco
make db-backup
```

---

## 🤝 Contribuição

### **Como Contribuir**
1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **Padrões de Código**
- **TypeScript**: Strict mode habilitado
- **ESLint**: Configuração personalizada
- **Prettier**: Formatação automática
- **Commits**: Conventional Commits

### **Checklist de Pull Request**
- [ ] Código segue padrões do projeto
- [ ] Testes passam localmente
- [ ] Cobertura de testes mantida
- [ ] Documentação atualizada
- [ ] Changelog atualizado

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 📞 Suporte

### **Canais de Ajuda**
- **Issues**: [GitHub Issues](https://github.com/username/open-banking/issues)
- **Documentação**: [Wiki do Projeto](https://github.com/username/open-banking/wiki)
- **Email**: suporte@openbanking.com

### **Recursos Adicionais**
- **Swagger UI**: http://localhost:3000/api/v1/docs
- **pgAdmin4**: http://localhost:5050
- **Documentação do Banco**: [README-DATABASE.md](README-DATABASE.md)

---

## 🎉 Agradecimentos

- **NestJS Team** pelo framework incrível
- **TypeORM Team** pela ORM robusta
- **PostgreSQL** pelo banco de dados confiável
- **Comunidade Open Source** pelas contribuições

---

**Última atualização**: Janeiro 2025  
**Versão da API**: 1.1.1  
**Status**: ✅ Ativo e Funcionando

