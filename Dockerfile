FROM oven/bun:1-alpine AS base

WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat

COPY package.json bun.lock* ./
COPY packages/api/package.json ./packages/api/
COPY packages/ui/package.json ./packages/ui/
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

RUN bun install --frozen-lockfile

FROM base AS build-packages
COPY --from=deps /app/node_modules ./node_modules
COPY packages/ ./packages/
COPY tsconfig.json ./

RUN bun run build:packages

FROM base AS build-backend
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build-packages /app/packages ./packages
COPY apps/backend/ ./apps/backend/
COPY tsconfig.json ./

WORKDIR /app/apps/backend
RUN bun run build

FROM base AS build-frontend
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build-packages /app/packages ./packages
COPY apps/frontend/ ./apps/frontend/
COPY tsconfig.json ./

WORKDIR /app/apps/frontend
RUN bun run build

FROM base AS backend-runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 app-user && \
    adduser --system --uid 1001 app-user

COPY --from=build-backend --chown=app-user:app-user /app/apps/backend/dist ./dist
COPY --from=build-backend --chown=app-user:app-user /app/apps/backend/package.json ./
COPY --from=deps --chown=app-user:app-user /app/node_modules ./node_modules

USER app-user

EXPOSE 3001

CMD ["bun", "run", "dist/index.js"]

FROM base AS frontend-runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=build-frontend /app/apps/frontend/public ./public
COPY --from=build-frontend --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=build-frontend --chown=nextjs:nodejs /app/apps/frontend/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"] 
