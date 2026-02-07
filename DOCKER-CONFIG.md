# Configuration Docker - Alayi Chat App

## 🚀 Démarrage rapide avec Docker

### Prérequis
- Docker installé
- Docker Compose installé
- MongoDB Atlas (base de données cloud) - déjà configurée ✅

### Lancer l'application complète

```bash
# Construire et lancer l'application
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

### Accès aux services

- **API Backend**: http://localhost:3000/api
- **Web App**: http://localhost:3000/web
- **Mobile Web**: http://localhost:3000/mobile
- **MongoDB**: MongoDB Atlas (Cloud) - cluster0.aqphibe.mongodb.net

## 📦 Structure Docker

Le Dockerfile centralisé gère 3 parties :

1. **Stage 1**: Build du frontend Web (React + Vite)
2. **Stage 2**: Build du mobile Web (React Native Web + Expo)
3. **Stage 3**: Backend Node.js avec les fichiers statiques

### Base de données

✅ **MongoDB Atlas (Cloud)** - Base de données distante hébergée sur le cloud
- Pas besoin de MongoDB local
- Connexion automatique à votre cluster MongoDB Atlas
- Même base de données en développement et production

## 🔧 Configuration

### Variables d'environnement

Modifiez le fichier `docker-compose.yml` pour changer les configurations :

```yaml
environment:
  PORT: 3000
  NODE_ENV: production
  # MongoDB Atlas (Cloud)
  MONGODB_URI: mongodb+srv://armel:alayi2026@cluster0.aqphibe.mongodb.net/alayi?retryWrites=true&w=majority&appName=Cluster0
  JWT_SECRET: your-super-secret-jwt-key
```

### MongoDB Atlas (Cloud)

Votre application utilise MongoDB Atlas hébergé sur le cloud :
- **Cluster**: cluster0.aqphibe.mongodb.net
- **Database**: alayi
- **Avantages**: 
  - ✅ Pas besoin d'installer MongoDB localement
  - ✅ Sauvegarde automatique
  - ✅ Même base en dev et prod
  - ✅ Accessible depuis n'importe où

## 🛠️ Développement local (sans Docker)

### Backend
```bash
cd backend
npm install
npm run dev
```

### Web
```bash
cd web
npm install
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npm start
```

## 🔄 Changements récents

✅ **Nettoyage et optimisation** :
- ❌ Retrait complet de Sentry
- ❌ Retrait des références à Sevalla
- ✅ Configuration localhost pour développement
- ✅ Dockerfile centralisé (Backend + Web + Mobile)
- ✅ MongoDB Atlas distant (Cloud) - pas de MongoDB local

## 📝 Notes importantes

- Les configurations utilisent maintenant `localhost` au lieu de Sevalla
- Sentry a été complètement retiré du projet
- Un seul Dockerfile gère tout le projet
- **MongoDB Atlas** utilisé partout (dev et prod)
- Pas besoin d'installer MongoDB localement

## 🐛 Dépannage

### Le port 3000 est déjà utilisé
```bash
# Trouver le processus
netstat -ano | findstr :3000
# Tuer le processus
taskkill /PID <PID> /F
```

### Problèmes de connexion MongoDB Atlas
```bash
# Vérifier les logs de l'application
docker-compose logs app

# Vérifier que votre IP est autorisée dans MongoDB Atlas
# Allez sur https://cloud.mongodb.com/ > Network Access
# Et ajoutez votre IP ou autorisez 0.0.0.0/0 pour accès depuis partout
```

### Rebuild complet
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```
