<h1 align="center">✨ Full-Stack Realtime Chat App (Mobile + Web + API) ✨</h1>

![Demo App](/web/public/screenshot-for-readme.png)

✨ **Highlights:**

- 📱 Fully Functional Real-Time Chat Mobile App (React Native)
- 💻 Web Chat Application (React) — Same API, Same Features
- 💬 Real-Time Messaging (Built From Scratch — No 3rd Party Services)
- ⌨️ Typing Indicators
- 🟢 Online & Offline Presence
- 🔐 Authentication with Custom JWT (Web, Mobile & Backend)
- 🌐 Shared Backend for Mobile & Web
- 🧠 Custom Socket Server (No Firebase / Pusher / Ably)
- 🚀 Backend with Bun, Express, MongoDB & TypeScript
- 📡 Real-Time Events & WebSocket Communication
- 🎨 Clean, Modern & Production-Ready UI
- 📱 Cross-Platform Development (iOS, Android & Web)
- 🛠️ REST API Design & Implementation
- ☁️ MongoDB Atlas Cloud Database
- 🚀 Docker & Docker Compose Configuration
- 🧰 Real-World Git & GitHub Workflow
- 🌱 Feature Branches, Commits, Pull Requests & Merges
- 🤖 Automated Code Reviews with CodeRabbit
- 🔒 Secure & Scalable Architecture Best Practices
- 📚 Learn React vs React Native by Building a Real Product
- 🎯 From Absolute Beginner to Production-Level Real-Time App

---

## 🧪 `.env` Setup

### 🟦 Backend (`/backend`)

```bash
# MongoDB Atlas (Cloud Database) - Déjà configuré
MONGODB_URI=mongodb+srv://armel:alayi2026@cluster0.aqphibe.mongodb.net/alayi?retryWrites=true&w=majority&appName=Cluster0

PORT=3000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

FRONTEND_URL=http://localhost:5173
```

---

### 🟩 Web Version (/web)

```bash
VITE_API_URL=http://localhost:3000
```

---

### 🟧 Mobile App (/mobile)

Pas de configuration .env nécessaire (API_URL configuré dans axios.ts)

---

## 🐳 Run with Docker (Recommandé)

```bash
# À la racine du projet
docker-compose up -d

# L'application sera disponible sur http://localhost:3000
# Utilise automatiquement MongoDB Atlas (Cloud) ✅
```

**Avantages Docker:**
- ✅ Pas besoin d'installer Node.js, npm, ou MongoDB
- ✅ Configuration identique en dev et prod
- ✅ Démarrage en une seule commande

Voir [DOCKER-CONFIG.md](DOCKER-CONFIG.md) pour plus de détails.

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔧 Run the Admin

```
bash
cd admin
npm install
npm run dev
```

---

## 🔧 Run the Mobile

```
bash
cd mobile
npm install
npx expo start
*And then scan the QR Code from your phone*
```
