#!/bin/bash

# Script com comandos úteis para gerenciar o banco de dados
# Uso: ./scripts/db-commands.sh [comando]

set -e

# Configurações do banco
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="senhasegura"
DB_NAME="open_banking"

# Função para mostrar ajuda
show_help() {
    echo "🔧 Comandos disponíveis para o banco de dados:"
    echo ""
    echo "📊 CONEXÕES:"
    echo "  connect     - Conecta ao PostgreSQL via psql"
    echo "  pgadmin     - Acessa o pgAdmin4"
    echo ""
    echo "🗄️  GERENCIAMENTO:"
    echo "  status      - Mostra status dos containers"
    echo "  logs        - Mostra logs do banco"
    echo "  backup      - Cria backup do banco"
    echo "  restore     - Restaura backup do banco"
    echo "  reset       - Reseta o banco (cuidado!)"
    echo ""
    echo "📋 EXEMPLOS:"
    echo "  ./scripts/db-commands.sh connect"
    echo "  ./scripts/db-commands.sh status"
    echo "  ./scripts/db-commands.sh backup"
}

# Função para conectar ao banco
connect_db() {
    echo "🔌 Conectando ao PostgreSQL..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME
}

# Função para mostrar status
show_status() {
    echo "🐳 Status dos containers:"
    docker ps --filter "name=open-banking" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    echo ""
    echo "📊 Informações do banco:"
    echo "   Host: $DB_HOST"
    echo "   Porta: $DB_PORT"
    echo "   Usuário: $DB_USER"
    echo "   Database: $DB_NAME"
}

# Função para mostrar logs
show_logs() {
    echo "📋 Logs do banco de dados:"
    docker logs open-banking-db --tail 50 -f
}

# Função para criar backup
create_backup() {
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="backup_${DB_NAME}_${timestamp}.sql"
    
    echo "💾 Criando backup: $backup_file"
    PGPASSWORD=$DB_PASSWORD pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > "backups/$backup_file"
    
    if [ $? -eq 0 ]; then
        echo "✅ Backup criado com sucesso: backups/$backup_file"
    else
        echo "❌ Erro ao criar backup"
        exit 1
    fi
}

# Função para restaurar backup
restore_backup() {
    if [ -z "$1" ]; then
        echo "❌ Especifique o arquivo de backup:"
        echo "   ./scripts/db-commands.sh restore backups/backup_arquivo.sql"
        exit 1
    fi
    
    local backup_file="$1"
    
    if [ ! -f "$backup_file" ]; then
        echo "❌ Arquivo de backup não encontrado: $backup_file"
        exit 1
    fi
    
    echo "🔄 Restaurando backup: $backup_file"
    echo "⚠️  ATENÇÃO: Isso irá sobrescrever o banco atual!"
    read -p "Confirma? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME < "$backup_file"
        
        if [ $? -eq 0 ]; then
            echo "✅ Backup restaurado com sucesso"
        else
            echo "❌ Erro ao restaurar backup"
            exit 1
        fi
    else
        echo "❌ Operação cancelada"
    fi
}

# Função para resetar banco
reset_db() {
    echo "⚠️  ATENÇÃO: Isso irá APAGAR TODOS os dados do banco!"
    read -p "Confirma? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗑️  Resetando banco de dados..."
        
        # Para o container da aplicação
        docker stop open-banking-app 2>/dev/null || true
        
        # Remove o volume do banco
        docker-compose down -v
        docker volume rm open-banking_postgres-data 2>/dev/null || true
        
        # Recria o banco
        docker-compose up -d db
        
        echo "⏳ Aguardando banco ficar pronto..."
        sleep 10
        
        echo "✅ Banco resetado com sucesso!"
        echo "🚀 Execute: docker-compose up -d app"
    else
        echo "❌ Operação cancelada"
    fi
}

# Função para acessar pgAdmin
access_pgadmin() {
    echo "🔌 Acessando pgAdmin4..."
    echo "🌐 URL: http://localhost:5050"
    echo "📧 Email: admin@admin.com"
    echo "🔑 Senha: admin123"
    echo ""
    echo "📊 Para conectar ao banco:"
    echo "   Host: db (ou open-banking-db)"
    echo "   Port: 5432"
    echo "   Username: postgres"
    echo "   Password: senhasegura"
    echo "   Database: open_banking"
}

# Cria pasta de backups se não existir
mkdir -p backups

# Processa comandos
case "${1:-help}" in
    "connect")
        connect_db
        ;;
    "pgadmin")
        access_pgadmin
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs
        ;;
    "backup")
        create_backup
        ;;
    "restore")
        restore_backup "$2"
        ;;
    "reset")
        reset_db
        ;;
    "help"|*)
        show_help
        ;;
esac
