# 🏦 Open Banking - Sistema Bancário Digital

<div align="center">

![Open Banking](https://img.shields.io/badge/Open%20Banking-API-blue?style=for-the-badge&logo=banking)
![NestJS](https://img.shields.io/badge/NestJS-10.0-red?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-20.10+-blue?style=for-the-badge&logo=docker)

**Sistema completo de Open Banking com API REST, autenticação JWT e gerenciamento de transações financeiras**

[🚀 Começar](#-começar-rapidamente) • [📚 Documentação](#-documentação) • [🔧 Tecnologias](#-tecnologias) • [🏗️ Arquitetura](#️-arquitetura)

</div>

---

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Começar Rapidamente](#-começar-rapidamente)
- [🔧 Tecnologias](#-tecnologias)
- [🏗️ Arquitetura](#️-arquitetura)
- [📊 Banco de Dados](#-banco-de-dados)
- [🔐 Segurança](#-segurança)
- [🧪 Testes](#-testes)
- [📚 Documentação](#-documentação)
- [🚀 Deploy](#-deploy)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## 🎯 Sobre o Projeto

**Open Banking** é uma solução completa de sistema bancário digital que implementa os princípios de **Open Banking** - permitindo que instituições financeiras compartilhem dados e funcionalidades através de APIs padronizadas.

### 🌟 **Visão e Missão**

Nossa missão é **democratizar o acesso a serviços financeiros** através de uma API robusta, segura e escalável que permite:

- **Interoperabilidade** entre diferentes sistemas bancários
- **Inovação** em produtos e serviços financeiros
- **Transparência** no acesso a dados bancários
- **Segurança** no compartilhamento de informações financeiras

### 🎯 **Objetivos Principais**

- ✅ **Digitalização Bancária**: Transformar serviços tradicionais em soluções digitais
- ✅ **Padrões Abertos**: Implementar especificações Open Banking
- ✅ **Segurança Financeira**: Autenticação robusta e criptografia de dados
- ✅ **Escalabilidade**: Arquitetura preparada para crescimento
- ✅ **Compliance**: Seguir regulamentações financeiras

---

## ✨ Funcionalidades

### 🔐 **Autenticação e Segurança**
- **JWT (JSON Web Tokens)** para autenticação segura
- **Criptografia de senhas** com bcrypt
- **Guards de autorização** baseados em roles
- **Validação robusta** de dados com class-validator
- **Rate limiting** para proteção contra ataques

### 👥 **Gestão de Usuários**
- **Cadastro de usuários** com validação de dados
- **Perfis de usuário** com roles personalizáveis
- **Gestão de sessões** e tokens de acesso
- **Recuperação de senha** (em desenvolvimento)

### 🏦 **Contas Bancárias**
- **Múltiplos tipos de conta**: Corrente, Poupança, Investimento
- **Geração automática** de números de conta
- **Gestão de saldos** em tempo real
- **Histórico de transações** completo
- **Limites de operação** configuráveis

### 💳 **Transações Financeiras**
- **Depósitos e saques** com validação de saldo
- **Transferências entre contas** com auditoria
- **Histórico detalhado** de todas as operações
- **Notificações** de transações (em desenvolvimento)
- **Relatórios financeiros** personalizáveis

### 📊 **Monitoramento e Analytics**
- **Health checks** em tempo real
- **Logs estruturados** para auditoria
- **Métricas de performance** da API
- **Monitoramento** de transações
- **Alertas** de sistema (em desenvolvimento)

---

## 🚀 Começar Rapidamente

### 📋 **Pré-requisitos**

- **Docker** 20.10+ e **Docker Compose** 2.0+
- **Node.js** 20.x (para desenvolvimento local)
- **Git** para clonar o repositório

### 🚀 **Instalação em 3 Passos**

#### **1. Clone o Repositório**
```bash
git clone https://github.com/username/open-banking.git
cd open-banking/api-nest
```

#### **2. Inicie com Docker (Recomendado)**
```bash
# Inicialização completa automática
make iniciar

# Ou comandos manuais
docker compose up -d
```

#### **3. Acesse a Aplicação**
```bash
# 🌐 Swagger UI (Documentação da API)
http://localhost:3000/api/v1/docs

# ❤️ Health Check
http://localhost:3000/api/v1/health

# 🗄️ pgAdmin4 (Banco de Dados)
http://localhost:5050
```

### 🎯 **Primeiros Passos**

1. **Acesse o Swagger UI** para ver todos os endpoints disponíveis
2. **Crie um usuário** usando o endpoint `/api/v1/users`
3. **Faça login** para obter um token JWT
4. **Crie uma conta bancária** e comece a usar a API

---

## 🔧 Tecnologias

### **🔄 Backend**
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **NestJS** | 10.x | Framework principal da aplicação |
| **TypeScript** | 5.x | Linguagem de programação |
| **Node.js** | 20.x | Runtime JavaScript |
| **TypeORM** | 0.3.x | ORM para banco de dados |
| **class-validator** | - | Validação de dados |

### **🗄️ Banco de Dados**
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **PostgreSQL** | 15 | SGBD principal |
| **pgAdmin4** | - | Interface de administração |
| **TypeORM CLI** | - | Migrações e seeds |

### **🔐 Segurança**
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **JWT** | - | Autenticação stateless |
| **bcrypt** | - | Criptografia de senhas |
| **Passport** | - | Estratégias de autenticação |
| **Helmet** | - | Headers de segurança |

### **🧪 Testes**
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Jest** | - | Framework de testes |
| **Supertest** | - | Testes de integração |
| **TypeORM Testing** | - | Testes de banco |

### **🐳 DevOps**
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Docker** | 20.10+ | Containerização |
| **Docker Compose** | 2.0+ | Orquestração |
| **Makefile** | - | Automação de tarefas |

---

## 🏗️ Arquitetura

### **📐 Visão Geral da Arquitetura**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cliente Web   │    │   Cliente API   │    │   Cliente App   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      API Gateway          │
                    │    (NestJS + Express)    │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      Módulos NestJS       │
                    │  ┌─────┐ ┌─────┐ ┌─────┐ │
                    │  │Auth │ │Users│ │Acc. │ │
                    │  └─────┘ └─────┘ └─────┘ │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      TypeORM Layer        │
                    │   (Repositories + ORM)    │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      PostgreSQL 15        │
                    │   (Dados + Transações)    │
                    └───────────────────────────┘
```

### **🏛️ Padrão Arquitetural**

#### **1. Camada de Apresentação**
- **Controllers**: Recebem requisições HTTP
- **DTOs**: Validação e transformação de dados
- **Interceptors**: Logging e transformação de respostas

#### **2. Camada de Negócio**
- **Services**: Lógica de negócio e regras
- **Guards**: Autorização e autenticação
- **Pipes**: Validação e transformação

#### **3. Camada de Dados**
- **Repositories**: Acesso a dados
- **Entities**: Modelos de domínio
- **Migrations**: Controle de versão do banco

### **🔗 Comunicação entre Módulos**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Auth     │    │   Users     │    │  Accounts   │
│  Module    │◄──►│  Module     │◄──►│   Module    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   JWT      │    │  Password   │    │ Transaction │
│  Service   │    │  Service    │    │   Service   │
└─────────────┘    └─────────────┘    └─────────────┘
```

---

## 📊 Banco de Dados

### **🗄️ Estrutura do Banco**

#### **📋 Tabelas Principais**

| Tabela | Descrição | Registros |
|--------|-----------|-----------|
| **users** | Usuários do sistema | Dinâmico |
| **accounts** | Contas bancárias | 1:N com users |
| **transactions** | Transações financeiras | N:1 com accounts |
| **migrations** | Controle de versão | Automático |

#### **🔗 Relacionamentos**

```sql
-- Usuário pode ter múltiplas contas
users (1) ──── (N) accounts

-- Conta pode ter múltiplas transações
accounts (1) ──── (N) transactions

-- Transação pertence a uma conta
transactions (N) ──── (1) accounts
```

### **📊 Esquema do Banco**

```sql
-- Tabela de Usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Contas
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    type VARCHAR(20) DEFAULT 'CHECKING',
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Transações
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount DECIMAL(15,2) NOT NULL,
    type VARCHAR(20) NOT NULL,
    description TEXT,
    account_id UUID REFERENCES accounts(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **🔧 Ferramentas de Administração**

#### **pgAdmin4**
- **URL**: http://localhost:5050
- **Usuário**: admin@admin.com
- **Senha**: admin123
- **Funcionalidades**: Gestão visual do banco, queries, backups

#### **Comandos de Linha**
```bash
# Conectar ao banco
make db-connect

# Status dos serviços
make db-status

# Backup do banco
make db-backup

# Logs do banco
make db-logs
```

---

## 🔐 Segurança

### **🛡️ Camadas de Segurança**

#### **1. Autenticação JWT**
- **Tokens stateless** para sessões
- **Expiração configurável** (padrão: 24h)
- **Refresh tokens** para renovação automática
- **Blacklist** de tokens revogados

#### **2. Criptografia**
- **Senhas hasheadas** com bcrypt (salt rounds: 12)
- **Comunicação HTTPS** em produção
- **Headers de segurança** com Helmet
- **CORS configurado** para origens específicas

#### **3. Validação de Dados**
- **DTOs com validação** usando class-validator
- **Sanitização** de inputs
- **Rate limiting** por IP
- **Validação de schemas** JSON

### **🔒 Políticas de Segurança**

#### **Usuários**
- **Senhas mínimas** de 8 caracteres
- **Complexidade obrigatória** (maiúsculas, números, símbolos)
- **Bloqueio temporário** após tentativas falhadas
- **Logs de auditoria** para todas as ações

#### **Transações**
- **Validação de saldo** antes de operações
- **Limites diários** configuráveis
- **Notificação** de transações suspeitas
- **Rollback automático** em caso de erro

---

## 🧪 Testes

### **📊 Cobertura de Testes**

| Tipo | Cobertura | Status |
|------|-----------|--------|
| **Unitários** | 85%+ | ✅ Ativo |
| **Integração** | 75%+ | ✅ Ativo |
| **E2E** | 60%+ | 🔄 Em desenvolvimento |
| **Performance** | 0% | 📋 Planejado |

### **🧪 Executando Testes**

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

### **📁 Estrutura de Testes**

```
test/
├── app.e2e-spec.ts           # Testes end-to-end
├── auth/                      # Testes de autenticação
│   ├── auth.controller.spec.ts
│   └── auth.service.spec.ts
├── users/                     # Testes de usuários
│   ├── users.controller.spec.ts
│   └── users.service.spec.ts
├── accounts/                  # Testes de contas
│   ├── accounts.controller.spec.ts
│   └── accounts.service.spec.ts
└── transactions/              # Testes de transações
    ├── transactions.controller.spec.ts
    └── transactions.service.spec.ts
```

---

## 📚 Documentação

### **📖 Documentação Disponível**

| Documento | Descrição | Link |
|-----------|-----------|------|
| **README-API-DOCS.md** | Documentação completa da API | [Ver Documentação](api-nest/README-API-DOCS.md) |
| **README-DATABASE.md** | Guia do banco de dados | [Ver Documentação](api-nest/README-DATABASE.md) |
| **Swagger UI** | Interface interativa da API | http://localhost:3000/api/v1/docs |

### **🔍 Como Usar a Documentação**

#### **1. Swagger UI (Recomendado para Desenvolvedores)**
- **Interface interativa** para testar endpoints
- **Exemplos de requisição** e resposta
- **Autenticação integrada** com JWT
- **Schemas** de todas as entidades

#### **2. READMEs Especializados**
- **README-API-DOCS.md**: Guia completo da API
- **README-DATABASE.md**: Gestão do banco de dados
- **README.md**: Visão geral do projeto

---

## 🚀 Deploy

### **🌍 Ambientes Disponíveis**

| Ambiente | URL | Status | Propósito |
|----------|-----|--------|-----------|
| **Desenvolvimento** | localhost:3000 | ✅ Ativo | Desenvolvimento local |
| **Staging** | staging.openbanking.com | 📋 Planejado | Testes de integração |
| **Produção** | api.openbanking.com | 📋 Planejado | Ambiente de produção |

### **🐳 Deploy com Docker**

#### **Desenvolvimento**
```bash
# Build e execução
docker compose up -d

# Logs em tempo real
docker compose logs -f app
```

#### **Produção**
```bash
# Build para produção
docker build -f Dockerfile.prod -t open-banking:prod .

# Execução em produção
docker run -d -p 3000:3000 --env-file .env.prod open-banking:prod
```

### **☁️ Deploy na Nuvem**

#### **AWS (Recomendado)**
- **ECS/Fargate** para containers
- **RDS** para PostgreSQL
- **CloudWatch** para monitoramento
- **API Gateway** para roteamento

#### **Google Cloud**
- **Cloud Run** para containers
- **Cloud SQL** para PostgreSQL
- **Stackdriver** para monitoramento

---

## 🤝 Contribuição

### **🌟 Como Contribuir**

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **📋 Padrões de Contribuição**

#### **Código**
- **TypeScript strict mode** habilitado
- **ESLint** para qualidade de código
- **Prettier** para formatação
- **Conventional Commits** para mensagens

#### **Testes**
- **Cobertura mínima** de 80%
- **Testes unitários** para todas as funções
- **Testes de integração** para APIs
- **Testes e2e** para fluxos críticos

#### **Documentação**
- **READMEs atualizados** para mudanças
- **Swagger** sempre sincronizado
- **Exemplos de uso** para novas funcionalidades

### **🎯 Áreas para Contribuição**

- **🔐 Segurança**: Implementar 2FA, OAuth2
- **📊 Analytics**: Dashboards e relatórios
- **🔔 Notificações**: Email, SMS, Push
- **📱 Mobile**: App nativo ou PWA
- **🌐 Web**: Interface administrativa

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

### **📜 Termos da Licença MIT**

- ✅ **Uso comercial** permitido
- ✅ **Modificação** permitida
- ✅ **Distribuição** permitida
- ✅ **Uso privado** permitido
- ❌ **Responsabilidade** limitada
- ❌ **Garantias** não fornecidas

---

## 📞 Suporte e Comunidade

### **💬 Canais de Ajuda**

| Canal | Descrição | Link |
|-------|-----------|------|
| **GitHub Issues** | Reportar bugs e solicitar features | [Issues](https://github.com/username/open-banking/issues) |
| **GitHub Discussions** | Discussões e perguntas | [Discussions](https://github.com/username/open-banking/discussions) |
| **Wiki** | Documentação colaborativa | [Wiki](https://github.com/username/open-banking/wiki) |
| **Email** | Suporte direto | suporte@openbanking.com |

### **🌐 Recursos Adicionais**

- **📚 Swagger UI**: http://localhost:3000/api/v1/docs
- **🗄️ pgAdmin4**: http://localhost:5050
- **📊 Health Check**: http://localhost:3000/api/v1/health
- **🔧 Makefile**: Comandos úteis para desenvolvimento

---

## 🎉 Agradecimentos

### **👥 Equipe e Contribuidores**

- **Desenvolvedores Core** pela arquitetura robusta
- **Comunidade NestJS** pelo framework incrível
- **Contribuidores Open Source** pelas melhorias
- **Testadores** pela qualidade e estabilidade

### **🛠️ Tecnologias e Ferramentas**

- **NestJS Team** pelo framework modular
- **TypeORM Team** pela ORM robusta
- **PostgreSQL** pelo banco de dados confiável
- **Docker** pela containerização eficiente

---

## 📈 Roadmap

### **🚀 Próximas Versões**

#### **v1.2.0 (Q1 2025)**
- [ ] **2FA (Two-Factor Authentication)**
- [ ] **OAuth2 Integration**
- [ ] **Webhook System**
- [ ] **Rate Limiting Avançado**

#### **v1.3.0 (Q2 2025)**
- [ ] **Microservices Architecture**
- [ ] **Event-Driven Architecture**
- [ ] **Caching com Redis**
- [ ] **Message Queue (RabbitMQ)**

#### **v2.0.0 (Q3 2025)**
- [ ] **GraphQL API**
- [ ] **Real-time com WebSockets**
- [ ] **Machine Learning para Fraud Detection**
- [ ] **Multi-tenancy**

---

<div align="center">

**🏦 Open Banking - Transformando o Futuro das Finanças Digitais**

[⭐ Star no GitHub](https://github.com/username/open-banking) • [📖 Documentação](api-nest/README-API-DOCS.md) • [🐛 Reportar Bug](https://github.com/username/open-banking/issues)

**Última atualização**: Janeiro 2025  
**Versão**: 1.1.1  
**Status**: ✅ Ativo e Funcionando

</div>
