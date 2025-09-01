#!/bin/bash

# Script para conectar ao PostgreSQL via linha de comando
# Uso: ./scripts/connect-db.sh [database_name]

set -e

# Configurações do banco
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="senhasegura"
DEFAULT_DB="open_banking"

# Verifica se o container está rodando
if ! docker ps | grep -q "open-banking-db"; then
    echo "❌ Container do PostgreSQL não está rodando!"
    echo "Execute: docker-compose up -d db"
    exit 1
fi

# Usa o database especificado ou o padrão
DB_NAME=${1:-$DEFAULT_DB}

echo "🔌 Conectando ao PostgreSQL..."
echo "📊 Host: $DB_HOST"
echo "🚪 Porta: $DB_PORT"
echo "👤 Usuário: $DB_USER"
echo "🗄️  Database: $DB_NAME"
echo ""

# Tenta conectar via psql local primeiro
if command -v psql >/dev/null 2>&1; then
    echo "✅ Usando psql local..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME
else
    echo "🐳 psql não encontrado localmente, usando container Docker..."
    echo "💡 Para instalar psql localmente: sudo apt-get install postgresql-client"
    echo ""
    
    # Conecta via container Docker
    docker exec -it open-banking-db psql -U $DB_USER -d $DB_NAME
fi
