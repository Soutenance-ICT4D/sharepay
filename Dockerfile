# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — Installation des dépendances
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — Build
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# URL de l'API backend — à passer en argument au moment du `docker build`
# ex : docker build --build-arg NEXT_PUBLIC_API_URL=https://api.example.com/api/v1 .
ARG NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 3 — Image de production (standalone Next.js)
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Utilisateur non-root pour la sécurité
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
USER nextjs

# Copie du build standalone + assets statiques
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
