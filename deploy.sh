#!/bin/bash
set -e

echo "🏗️  Construyendo para producción..."

# 1. Copiar ejemplos a archivos reales (solo si no existen)
[ ! -f .env.prod ] && cp .env.prod.example .env.prod && echo "⚠️  Edita .env.prod con valores reales"
[ ! -f .env.mysql ] && cp .env.mysql.example .env.mysql && echo "⚠️  Edita .env.mysql con valores reales"

# 2. Construir y levantar
echo "🚀 Desplegando contenedores..."
docker-compose -f docker-compose.prod.yml up -d --build

echo "✅ Despliegue completado!"
echo "📋 Comandos útiles:"
echo "   Ver logs: docker logs classroom_api_prod -f"
echo "   Reiniciar: docker-compose -f docker-compose.prod.yml restart"
echo "   Detener: docker-compose -f docker-compose.prod.yml down"
