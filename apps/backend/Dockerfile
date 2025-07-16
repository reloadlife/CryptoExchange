FROM oven/bun:1-alpine AS base

FROM base AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY ../../package.json ../../bun.lock* ./
COPY ../../packages/api/package.json ./packages/api/
COPY ../../packages/ui/package.json ./packages/ui/
COPY package.json ./apps/backend/

RUN bun install --frozen-lockfile

FROM base AS build-packages
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ../../packages/ ./packages/
COPY ../../tsconfig.json ./

RUN bun run --filter='@crypto-exchange/*' build

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build-packages /app/packages ./packages
COPY . ./apps/backend/

WORKDIR /app/apps/backend
RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 app-user && \
    adduser --system --uid 1001 app-user

COPY --from=builder --chown=app-user:app-user /app/apps/backend/dist ./dist
COPY --from=builder --chown=app-user:app-user /app/apps/backend/package.json ./
COPY --from=deps --chown=app-user:app-user /app/node_modules ./node_modules

USER app-user

EXPOSE 3001

ENV PORT=3001

CMD ["bun", "run", "dist/index.js"] 
