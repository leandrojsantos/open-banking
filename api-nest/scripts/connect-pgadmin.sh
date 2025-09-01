#!/bin/bash

# Script para acessar o pgAdmin4 via linha de comando
# Uso: ./scripts/connect-pgadmin.sh

set -e

# Verifica se o container está rodando
if ! docker ps | grep -q "open-banking-pgadmin"; then
    echo "❌ Container do pgAdmin4 não está rodando!"
    echo "Execute: docker-compose up -d pgadmin"
    exit 1
fi

echo "🔌 Acessando pgAdmin4..."
echo "🌐 URL: http://localhost:5050"
echo "📧 Email: admin@admin.com"
echo "🔑 Senha: admin123"
echo ""

# Abre o pgAdmin4 no navegador padrão (opcional)
if command -v xdg-open > /dev/null; then
    echo "🚀 Abrindo pgAdmin4 no navegador..."
    xdg-open http://localhost:5050
elif command -v open > /dev/null; then
    echo "🚀 Abrindo pgAdmin4 no navegador..."
    open http://localhost:5050
else
    echo "📋 Copie e cole esta URL no seu navegador:"
    echo "   http://localhost:5050"
fi

echo ""
echo "📊 Para conectar ao banco no pgAdmin4:"
echo "   1. Faça login com admin@admin.com / admin123"
echo "   2. Clique com botão direito em 'Servers' → 'Register' → 'Server'"
echo "   3. Na aba 'General':"
echo "      - Name: Open Banking DB"
echo "   4. Na aba 'Connection':"
echo "      - Host: db (ou open-banking-db)"
echo "      - Port: 5432"
echo "      - Username: postgres"
echo "      - Password: senhasegura"
echo "      - Database: open_banking"
echo ""

# Mostra informações dos containers
echo "🐳 Status dos containers:"
docker ps --filter "name=open-banking" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
