#!/bin/bash

echo "🚀 Déploiement de l'application ECO2TRIP..."

# Arrêter et supprimer les containers existants
docker-compose down

# Rebuild et démarrage des services
docker-compose up --build -d

echo "✅ Application déployée avec succès !"
echo "🔗 Accès au frontend : http://localhost"
echo "🔗 Accès au backend : http://localhost:5000"
