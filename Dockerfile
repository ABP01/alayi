# use the official Bun image
FROM oven/bun:latest

WORKDIR /app

# build web frontend
WORKDIR /app/web
COPY web/package.json web/bun.lock* ./
RUN bun install --frozen-lockfile
COPY web/ ./

ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL
RUN bun run build

# install backend dependencies
WORKDIR /app/backend
COPY backend/package.json backend/bun.lock* ./
RUN bun install --frozen-lockfile
COPY backend/ ./

# expose port
EXPOSE 3000
# set non-sensitive defaults 
ENV PORT=3000
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb+srv://armel:alayi2026@cluster0.aqphibe.mongodb.net/?appName=Cluster0
ENV FRONTEND_URL=http://localhost:5173

# start the application
CMD ["bun", "index.ts"]
