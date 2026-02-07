# Multi-stage build: Backend + Web + Mobile (React Native Web)
FROM node:20-alpine AS base

# =====================================
# Stage 1: Build Web Frontend
# =====================================
FROM base AS web-builder
WORKDIR /app/web

COPY web/package*.json ./
RUN npm ci

COPY web/ ./
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# =====================================
# Stage 2: Build Mobile (React Native Web)
# =====================================
FROM base AS mobile-builder
WORKDIR /app/mobile

COPY mobile/package*.json ./
RUN npm ci

COPY mobile/ ./
RUN npm run web

# =====================================
# Stage 3: Backend with all static files
# =====================================
FROM base AS production
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Copy built web frontend
COPY --from=web-builder /app/web/dist ./public/web

# Copy built mobile web
COPY --from=mobile-builder /app/mobile/dist ./public/mobile

# Expose ports
EXPOSE 3000

# Environment variables (can be overridden)
ENV PORT=3000
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb+srv://armel:alayi2026@cluster0.aqphibe.mongodb.net/alayi?retryWrites=true&w=majority&appName=Cluster0
ENV FRONTEND_URL=http://localhost:5173

# Start the application
CMD ["node", "index.js"]
