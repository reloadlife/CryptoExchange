FROM oven/bun:1-alpine AS base

FROM base AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY ../../package.json ../../bun.lock* ./
COPY ../../packages/api/package.json ./packages/api/
COPY ../../packages/ui/package.json ./packages/ui/
COPY package.json ./apps/frontend/

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
COPY . ./apps/frontend/

WORKDIR /app/apps/frontend
RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/frontend/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"] 
