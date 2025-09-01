# 🗄️ Guia do Banco de Dados - Open Banking API

Este documento explica como gerenciar e acessar o banco de dados PostgreSQL do projeto Open Banking API.

## 🚀 Início Rápido

### 1. Iniciar os Serviços
```bash
# Iniciar apenas o banco de dados
docker-compose up -d db

# Iniciar banco + pgAdmin4
docker-compose up -d db pgadmin

# Iniciar projeto completo
make iniciar
```

### 2. Conectar ao PostgreSQL
```bash
# Via linha de comando (psql)
make db-connect

# Ou diretamente
./scripts/connect-db.sh
```

### 3. Acessar pgAdmin4
```bash
# Informações de acesso
make db-pgadmin

# URL: http://localhost:5050
# Email: admin@admin.com
# Senha: admin123
```

## 🔌 Conexões Disponíveis

### PostgreSQL
- **Host:** localhost (ou db dentro do Docker)
- **Porta:** 5432
- **Usuário:** postgres
- **Senha:** senhasegura
- **Database:** open_banking

### pgAdmin4
- **URL:** http://localhost:5050
- **Email:** admin@admin.com
- **Senha:** admin123

## 📋 Comandos Disponíveis

### Via Makefile
```bash
# Conexões
make db-connect          # Conecta ao PostgreSQL via psql
make db-pgadmin          # Mostra informações do pgAdmin4

# Gerenciamento
make db-status           # Status dos containers
make db-logs             # Logs do banco
make db-backup           # Cria backup
make db-restore file=... # Restaura backup
make db-reset            # Reseta banco (cuidado!)
```

### Via Scripts Diretos
```bash
# Conectar ao banco
./scripts/connect-db.sh

# Comandos do banco
./scripts/db-commands.sh [comando]

# Comandos disponíveis:
./scripts/db-commands.sh connect    # Conectar
./scripts/db-commands.sh pgadmin    # pgAdmin4
./scripts/db-commands.sh status     # Status
./scripts/db-commands.sh logs       # Logs
./scripts/db-commands.sh backup     # Backup
./scripts/db-commands.sh restore    # Restaurar
./scripts/db-commands.sh reset      # Resetar
```

## 🗄️ Estrutura do Banco

### Tabelas Principais
- `users` - Usuários do sistema
- `accounts` - Contas bancárias
- `transactions` - Transações financeiras
- `migrations` - Histórico de migrações

### Verificar Estrutura
```bash
# Conectar e listar tabelas
make db-connect
# Dentro do psql:
\dt                    # Lista tabelas
\d users              # Descreve tabela users
\d accounts           # Descreve tabela accounts
\d transactions       # Descreve tabela transactions
```

## 💾 Backup e Restauração

### Criar Backup
```bash
make db-backup
# Arquivo salvo em: backups/backup_open_banking_YYYYMMDD_HHMMSS.sql
```

### Restaurar Backup
```bash
make db-restore file=backups/backup_open_banking_20250101_120000.sql
```

### Backup Manual
```bash
# Backup completo
pg_dump -h localhost -p 5432 -U postgres -d open_banking > backup.sql

# Backup apenas estrutura
pg_dump -h localhost -p 5432 -U postgres -d open_banking --schema-only > estrutura.sql

# Backup apenas dados
pg_dump -h localhost -p 5432 -U postgres -d open_banking --data-only > dados.sql
```

## 🔍 Monitoramento

### Status dos Containers
```bash
make db-status
# Mostra:
# - Status dos containers
# - Portas em uso
# - Informações do banco
```

### Logs do Banco
```bash
make db-logs
# Mostra logs em tempo real do PostgreSQL
```

### Verificar Saúde
```bash
# Verificar se o banco está respondendo
docker exec open-banking-db pg_isready -U postgres

# Verificar conexões ativas
docker exec open-banking-db psql -U postgres -c "SELECT * FROM pg_stat_activity;"
```

## 🛠️ Troubleshooting

### Problemas Comuns

#### 1. Container não inicia
```bash
# Verificar logs
docker logs open-banking-db

# Verificar se a porta 5432 está livre
sudo netstat -tlnp | grep :5432

# Reiniciar container
docker restart open-banking-db
```

#### 2. Erro de conexão
```bash
# Verificar se o container está rodando
docker ps | grep open-banking-db

# Verificar variáveis de ambiente
docker exec open-banking-db env | grep POSTGRES

# Testar conexão interna
docker exec open-banking-db psql -U postgres -d open_banking
```

#### 3. pgAdmin4 não acessa o banco
- **Host:** Use `db` (nome do container) em vez de `localhost`
- **Port:** 5432
- **Username:** postgres
- **Password:** senhasegura
- **Database:** open_banking

### Resetar Banco
```bash
# ⚠️ ATENÇÃO: Isso apaga todos os dados!
make db-reset

# Ou manualmente:
docker-compose down -v
docker volume rm open-banking_postgres-data
docker-compose up -d db
```

## 📚 Comandos SQL Úteis

### Dentro do psql
```sql
-- Listar databases
\l

-- Conectar a um database
\c open_banking

-- Listar tabelas
\dt

-- Descrever tabela
\d nome_tabela

-- Verificar tamanho das tabelas
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Verificar conexões ativas
SELECT * FROM pg_stat_activity;

-- Sair
\q
```

## 🔐 Segurança

### Variáveis de Ambiente
- As credenciais estão definidas no `docker-compose.yml`
- Para produção, use variáveis de ambiente ou secrets
- Nunca commite senhas reais no código

### Acesso ao Banco
- O banco só aceita conexões locais (localhost)
- Para acesso externo, configure firewall adequadamente
- Use SSL em produção

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs: `make db-logs`
2. Consulte o status: `make db-status`
3. Verifique se os containers estão rodando: `docker ps`
4. Consulte a documentação do PostgreSQL e Docker

---

**⚠️ Lembre-se:** Sempre faça backup antes de operações destrutivas!
