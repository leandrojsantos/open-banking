# Open Banking API - Documentação Técnica

## 📋 Índice

[Arquitetura](#arquitetura) • [Stack Tecnológica](#stack-tecnológica) • [Estrutura do Projeto](#estrutura-do-projeto) • [Configuração](#configuração) • [Endpoints](#endpoints) • [Autenticação](#autenticação) • [Banco de Dados](#banco-de-dados) • [Testes](#testes) • [Deploy](#deploy) • [Monitoramento](#monitoramento) • [Troubleshooting](#troubleshooting) • [Referências](#referências)

## 🏗️ Arquitetura

### Padrão Arquitetural
- **Clean Architecture** com separação de responsabilidades
- **Modular** por domínio (Auth, Users, Accounts, Transactions)
- **Repository Pattern** com Prisma ORM
- **Dependency Injection** com NestJS
- **BaseService Pattern**
- **DRY (Don't Repeat Yourself)** aplicado em validações comuns
- **KISS (Keep It Simple, Stupid)** para código limpo e direto

### Diagrama de Arquitetura

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[Auth Controller]
        B[Users Controller]
        C[Accounts Controller]
        D[Transactions Controller]
        E[Health Controller]
    end
    
    subgraph "Business Layer"
        F[Auth Service]
        G[Users Service]
        H[Accounts Service]
        I[Transactions Service]
    end
    
    subgraph "Infrastructure Layer"
        J[Prisma Service]
        K[PostgreSQL Database]
        L[JWT Strategy]
        M[Local Strategy]
    end
    
    subgraph "Security"
        N[JWT Guard]
        O[Local Guard]
        P[Roles Guard]
    end
    
    A --> F
    B --> G
    C --> H
    D --> I
    E --> E
    
    F --> J
    G --> J
    H --> J
    I --> J
    
    J --> K
    
    F --> L
    F --> M
    
    A --> N
    B --> P
    C --> P
    D --> P
```

### Estrutura de Camadas

```mermaid
graph LR
    subgraph "src/"
        A[auth/]
        B[users/]
        C[accounts/]
        D[transactions/]
        E[infrastructure/]
        F[health/]
        G[types/]
    end
    
    subgraph "infrastructure/"
        H[database/]
    end
    
    E --> H
```

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** v20+ (LTS)
- **NestJS** v10.4.0 - Framework Node.js
- **TypeScript** v5.7.2 - Linguagem tipada
- **Prisma** v5.8.1 - ORM moderno

### Banco de Dados
- **PostgreSQL** v15 - Banco relacional
- **Prisma Client** - Cliente ORM
- **Prisma Migrate** - Migrações

### Autenticação & Segurança
- **JWT** (JSON Web Tokens)
- **Passport.js** - Estratégias de autenticação
- **bcrypt** - Hash de senhas
- **Helmet** - Headers de segurança
- **class-validator** - Validação de dados

### Containerização
- **Podman** - Container runtime
- **Podman Compose** - Orquestração
- **Alpine Linux** - Imagem base

### Qualidade de Código
- **ESLint** - Linting
- **Prettier** - Formatação
- **Jest** - Testes unitários
- **Supertest** - Testes de integração

## 📁 Estrutura do Projeto

```
open-banking-api-nest/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts      # Controlador de autenticação
│   │   ├── auth.service.ts         # Serviço de autenticação
│   │   ├── auth.module.ts          # Módulo de autenticação
│   │   ├── strategies/             # Estratégias Passport
│   │   │   ├── local.strategy.ts   # Estratégia local
│   │   │   └── jwt.strategy.ts     # Estratégia JWT
│   │   └── guards/                 # Guards de autenticação
│   │       ├── local-auth.guard.ts
│   │       └── jwt-auth.guard.ts
│   ├── users/
│   │   ├── users.controller.ts     # Controlador de usuários
│   │   ├── users.service.ts        # Serviço de usuários
│   │   └── users.module.ts         # Módulo de usuários
│   ├── accounts/
│   │   ├── accounts.controller.ts  # Controlador de contas
│   │   ├── accounts.service.ts     # Serviço de contas
│   │   └── accounts.module.ts      # Módulo de contas
│   ├── transactions/
│   │   ├── transactions.controller.ts # Controlador de transações
│   │   ├── transactions.service.ts    # Serviço de transações
│   │   └── transactions.module.ts     # Módulo de transações
│   ├── common/
│   │   ├── services/
│   │   │   └── base.service.ts      # Serviço base com validações comuns
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts   # Decorator de roles
│   │   └── guards/
│   │       └── roles.guard.ts       # Guard de autorização
│   ├── infrastructure/
│   │   └── database/
│   │       └── prisma.service.ts   # Serviço Prisma
│   ├── health/
│   │   └── health.controller.ts    # Health checks
│   ├── app.module.ts               # Módulo principal
│   └── main.ts                     # Ponto de entrada
├── prisma/
│   ├── schema.prisma               # Schema do banco
│   └── seed.ts                     # Dados iniciais
├── test/
│   ├── setup.ts                    # Configuração de testes
│   └── app.e2e-spec.ts             # Testes E2E
├── Containerfile.dev               # Container de desenvolvimento
├── podman-compose.dev.yml          # Orquestração
├── .eslintrc.js                    # Configuração ESLint
├── .prettierrc                     # Configuração Prettier
├── .gitignore                      # Arquivos ignorados no Git
├── jest.config.js                  # Configuração Jest
├── package.json                    # Dependências
└── tsconfig.json                   # Configuração TypeScript
```

## ⚙️ Configuração

### Variáveis de Ambiente

```bash
# .env
DATABASE_URL="postgresql://postgres:senhasegura@localhost:5432/open_banking_dev?schema=public"
JWT_SECRET="dev-jwt-secret-key-change-in-production"
NODE_ENV="development"
PORT=3000
```

### Scripts Disponíveis

```json
{
  "start": "node dist/main",
  "start-dev": "nest start --watch",
  "build": "nest build",
  "test": "jest",
  "test-watch": "jest --watch",
  "test-coverage": "jest --coverage",
  "test-verbose": "jest --verbose",
  "test-watch-verbose": "jest --watch --verbose",
  "test-coverage-verbose": "jest --coverage --verbose",
  "test-watch-coverage": "jest --watch --coverage",
  "podman-up": "lsof -ti:3000 | xargs -r kill -9 2>/dev/null || true && lsof -ti:5432 | xargs -r kill -9 2>/dev/null || true && podman-compose -f podman-compose.dev.yml up -d",
  "podman-down": "podman stop $(podman ps -aq) 2>/dev/null || true && podman rm $(podman ps -aq) 2>/dev/null || true && podman rmi -f $(podman images -q) 2>/dev/null || true && podman volume rm $(podman volume ls -q) 2>/dev/null || true && podman network rm $(podman network ls -q) 2>/dev/null || true && podman system prune -af",
  "prisma-generate": "prisma generate",
  "prisma-migrate": "prisma migrate dev",
  "prisma-seed": "ts-node prisma/seed.ts"
}
```

### Comandos Principais

```bash
# Desenvolvimento
yarn start-dev              # Inicia em modo watch
yarn build                  # Build da aplicação

# Testes
yarn test                   # Executa todos os testes
yarn test-watch             # Testes em modo watch
yarn test-coverage          # Testes com coverage
yarn test-verbose           # Testes verbosos
yarn test-watch-verbose     # Testes watch + verbose
yarn test-coverage-verbose  # Testes coverage + verbose
yarn test-watch-coverage    # Testes watch + coverage

# Containerização
yarn podman-up              # Sobe containers (com kill automático de portas)
yarn podman-down            # Para e limpa containers

# Banco de Dados
yarn prisma-generate        # Gera cliente Prisma
yarn prisma-migrate         # Executa migrações
yarn prisma-seed            # Popula banco com dados iniciais
```

## 🔗 Endpoints

### Autenticação

#### POST /auth/register
Registra um novo usuário
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "João",
  "lastName": "Silva"
}
```

#### POST /auth/login
Autentica um usuário
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### POST /auth/logout
Desautentica o usuário atual

#### POST /auth/profile
Obtém perfil do usuário autenticado

### Usuários

#### GET /users
Lista todos os usuários (ADMIN)

#### GET /users/:id
Obtém usuário por ID

#### PUT /users/:id
Atualiza usuário

#### PUT /users/:id/change-password
Altera senha do usuário

#### PUT /users/:id/deactivate
Desativa usuário

### Contas

#### POST /accounts
Cria nova conta bancária
```json
{
  "type": "CURRENT",
  "initialBalance": 1000.00
}
```

#### GET /accounts
Lista contas do usuário

#### GET /accounts/my-accounts
Lista contas do usuário autenticado

#### GET /accounts/:id
Obtém conta por ID

#### PUT /accounts/:id
Atualiza conta

#### GET /accounts/:id/balance
Obtém saldo da conta

#### GET /accounts/:id/transactions
Lista transações da conta

### Transações

#### POST /transactions/deposit
Realiza depósito
```json
{
  "accountId": "account-uuid",
  "amount": 500.00,
  "description": "Depósito inicial"
}
```

#### POST /transactions/withdrawal
Realiza saque
```json
{
  "accountId": "account-uuid",
  "amount": 100.00,
  "description": "Saque"
}
```

#### POST /transactions/transfer
Realiza transferência
```json
{
  "fromAccountId": "account-uuid-1",
  "toAccountId": "account-uuid-2",
  "amount": 200.00,
  "description": "Transferência"
}
```

#### GET /transactions
Lista todas as transações

#### GET /transactions/my-transactions
Lista transações do usuário

#### GET /transactions/:id
Obtém transação por ID

### Health Check

#### GET /health
Status da aplicação
```json
{
  "status": "ok",
  "timestamp": "2025-09-25T23:00:00.000Z",
  "uptime": 3600.123,
  "database": "connected",
  "version": "1.1.1"
}
```

## 🔐 Autenticação

### Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant C as Client
    participant AC as Auth Controller
    participant AS as Auth Service
    participant US as Users Service
    participant PS as Prisma Service
    participant DB as Database
    
    Note over C,DB: Login Process
    C->>AC: POST /auth/login
    AC->>AS: validateUser(email, password)
    AS->>PS: findUnique({ email })
    PS->>DB: SELECT user WHERE email
    DB-->>PS: user data
    PS-->>AS: user
    AS->>AS: bcrypt.compare(password)
    AS-->>AC: user (without password)
    AC->>AC: generate JWT token
    AC-->>C: { access_token, user }
    
    Note over C,DB: Protected Route Access
    C->>AC: GET /users (with Bearer token)
    AC->>AC: JWT Guard validates token
    AC->>US: findAll()
    US->>PS: findMany()
    PS->>DB: SELECT users
    DB-->>PS: users data
    PS-->>US: users
    US-->>AC: users
    AC-->>C: users list
```

### Estratégias

#### Local Strategy
- Validação de email/senha
- Hash bcrypt para senhas
- Retorna usuário sem senha

#### JWT Strategy
- Token JWT no header Authorization
- Formato: `Bearer <token>`
- Expiração configurável

### Guards

#### LocalAuthGuard
- Protege rotas de login
- Valida credenciais locais

#### JwtAuthGuard
- Protege rotas autenticadas
- Valida token JWT

#### RolesGuard
- Autorização baseada em roles
- Roles: ADMIN, USER, BANKER

### Decorators

#### @Roles('ADMIN', 'USER')
- Define roles permitidos
- Usado em controladores

#### @Public()
- Marca rota como pública
- Bypass de autenticação

## 🗄️ Banco de Dados

### Diagrama ER (Entity Relationship)

```mermaid
erDiagram
    User {
        string id PK
        string email UK
        string password
        string firstName
        string lastName
        UserRole role
        boolean isActive
        boolean emailVerified
        datetime createdAt
        datetime updatedAt
    }
    
    Account {
        string id PK
        string accountNumber UK
        AccountType type
        decimal balance
        boolean isActive
        datetime createdAt
        datetime updatedAt
        string userId FK
    }
    
    Transaction {
        string id PK
        TransactionType type
        decimal amount
        string description
        string reference UK
        TransactionStatus status
        datetime createdAt
        datetime updatedAt
        string userId FK
        string accountId FK
        string fromAccountId FK
        string toAccountId FK
    }
    
    User ||--o{ Account : "owns"
    User ||--o{ Transaction : "performs"
    Account ||--o{ Transaction : "has"
    Account ||--o{ Transaction : "from"
    Account ||--o{ Transaction : "to"
```

### Schema Prisma

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  firstName     String
  lastName      String
  role          UserRole  @default(USER)
  isActive      Boolean   @default(true)
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  transactions  Transaction[]
  sessions      Session[]
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id              String      @id @default(uuid())
  userId          String
  accountNumber   String      @unique
  accountType     AccountType
  balance         Decimal     @default(0) @db.Decimal(15, 2)
  isActive        Boolean     @default(true)
  dailyLimit      Decimal     @default(10000) @db.Decimal(15, 2)
  monthlyLimit    Decimal     @default(100000) @db.Decimal(15, 2)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  user            User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions    Transaction[]
  transferFrom    Transaction[] @relation("TransferFrom")
  transferTo      Transaction[] @relation("TransferTo")
}

model Transaction {
  id              String            @id @default(uuid())
  userId          String
  accountId       String
  type            TransactionType
  status          TransactionStatus @default(PENDING)
  amount          Decimal           @db.Decimal(15, 2)
  description     String?
  reference       String?           @unique
  
  // Para transferências
  fromAccountId   String?
  toAccountId     String?
  
  // Metadados
  metadata        Json?
  processedAt     DateTime?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  account         Account   @relation(fields: [accountId], references: [id], onDelete: Cascade)
  fromAccount     Account?  @relation("TransferFrom", fields: [fromAccountId], references: [id])
  toAccount       Account?  @relation("TransferTo", fields: [toAccountId], references: [id])
}

model AuditLog {
  id          String   @id @default(uuid())
  userId      String?
  action      String
  resource    String
  resourceId  String?
  details     Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())
}
```

### Enums

```prisma
enum UserRole {
  ADMIN
  USER
  BANKER
}

enum AccountType {
  CURRENT
  SAVINGS
  INVESTMENT
}

enum TransactionType {
  DEPOSIT
  WITHDRAWAL
  TRANSFER
}

enum TransactionStatus {
  PENDING
  COMPLETED
  FAILED
  CANCELLED
}
```

### Migrações

```bash
# Criar nova migração
yarn prisma-migrate

# Aplicar migrações
yarn prisma-generate

# Reset do banco
yarn prisma-migrate reset
```

## 🧪 Testes

### Configuração Jest

```javascript
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  setupFilesAfterEnv: ['<rootDir>/../test/setup.ts'],
  testTimeout: 30000,
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
};
```

### Tipos de Teste

#### Testes Unitários
- Serviços isolados
- Mocks de dependências
- Validação de lógica de negócio

#### Testes de Integração
- Controladores com serviços
- Validação de DTOs
- Fluxos completos

#### Testes E2E
- Aplicação completa
- Banco de dados real
- Cenários de usuário

### Executar Testes

```bash
# Todos os testes
yarn test

# Com coverage
yarn test --coverage

# Modo watch
yarn test --watch

# Testes específicos
yarn test auth.service.spec.ts
```

## 🚀 Deploy

### Pipeline de Deploy

```mermaid
flowchart TD
    A[Source Code] --> B[Build Application]
    B --> C[Run Tests]
    C --> D{Tests Pass?}
    D -->|No| E[Fix Issues]
    E --> B
    D -->|Yes| F[Build Container Image]
    F --> G[Push to Registry]
    G --> H[Deploy to Production]
    H --> I[Health Check]
    I --> J{Health OK?}
    J -->|No| K[Rollback]
    J -->|Yes| L[Deploy Success]
    
    style A fill:#e1f5fe
    style L fill:#c8e6c9
    style E fill:#ffcdd2
    style K fill:#ffcdd2
```

### Desenvolvimento

```bash
# Subir containers
yarn podman-up

# Aplicar migrações
yarn prisma-migrate

# Popular banco
yarn prisma-seed

# Acessar API
curl http://localhost:3000/health
```

### Produção

```bash
# Build da aplicação
yarn build

# Subir containers de produção
podman-compose -f podman-compose.prod.yml up -d

# Verificar saúde
curl http://localhost:3000/health
```

### Variáveis de Produção

```bash
# .env.production
DATABASE_URL="postgresql://user:pass@prod-db:5432/open_banking_prod"
JWT_SECRET="super-secure-jwt-secret-key"
NODE_ENV="production"
PORT=3000
```

## 📊 Monitoramento

### Arquitetura de Monitoramento

```mermaid
graph TB
    subgraph "Application Layer"
        A[NestJS App]
        B[Health Controller]
        C[Logs]
    end
    
    subgraph "Infrastructure Layer"
        D[Podman Containers]
        E[PostgreSQL]
        F[System Metrics]
    end
    
    subgraph "Monitoring Tools"
        G[Health Checks]
        H[Log Aggregation]
        I[Metrics Collection]
        J[Alerting]
    end
    
    A --> B
    A --> C
    B --> G
    C --> H
    D --> F
    E --> F
    F --> I
    G --> J
    H --> J
    I --> J
```

### Health Checks

- **GET /health** - Status geral
- **Database** - Conexão com PostgreSQL
- **Uptime** - Tempo de execução
- **Version** - Versão da aplicação

### Logs

- **Console** - Desenvolvimento
- **Structured** - Produção
- **Levels** - error, warn, info, debug

### Métricas

- **Response Time** - Tempo de resposta
- **Throughput** - Requisições por segundo
- **Error Rate** - Taxa de erro
- **Memory Usage** - Uso de memória

## 🔧 Troubleshooting

### Problemas Comuns

#### Erro de Conexão com Banco
```bash
# Verificar se PostgreSQL está rodando
podman ps | grep postgres

# Verificar logs
podman logs api-nest_db_1

# Testar conexão
psql -h localhost -p 5432 -U postgres -d open_banking_dev
```

#### Erro de Build
```bash
# Limpar cache
yarn cache clean

# Reinstalar dependências
rm -rf node_modules
yarn install

# Rebuild
yarn build
```

#### Erro de Testes
```bash
# Limpar coverage
rm -rf coverage

# Executar testes com verbose
yarn test --verbose

# Executar teste específico
yarn test --testNamePattern="deve ser definido"
```

### Logs Úteis

```bash
# Logs da aplicação
podman logs api-nest_app_1

# Logs do banco
podman logs api-nest_db_1

# Logs em tempo real
podman logs -f api-nest_app_1
```

## ✨ Melhorias Implementadas

### Clean Code & DRY
- **BaseService**: Criado serviço base com validações comuns para eliminar código duplicado
- **Validações Centralizadas**: Métodos `validateAccount`, `validateUser`, `checkPermission` reutilizáveis
- **Geração de Referências**: Método `generateReference` centralizado para transações
- **Paginação Padronizada**: Método `createPagination` para estrutura consistente

### KISS (Keep It Simple, Stupid)
- **Código Simplificado**: Removidos comentários desnecessários e código redundante
- **Métodos Concisos**: Funções menores e mais focadas em uma única responsabilidade
- **Imports Otimizados**: Apenas imports necessários em cada arquivo
- **Tratamento de Erros**: Exceções padronizadas e mensagens claras

### Testes
- **100% de Aprovação**: Todos os testes passando sem erros
- **Cobertura Mantida**: Funcionalidades testadas e validadas
- **Mocks Eficientes**: Testes unitários com mocks apropriados

### Estrutura
- **Organização Melhorada**: Pasta `common/services` para código compartilhado
- **Separação de Responsabilidades**: Cada serviço com responsabilidade única
- **Herança Eficiente**: BaseService estendido pelos serviços específicos

## 📚 Referências

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Podman Documentation](https://docs.podman.io/)


