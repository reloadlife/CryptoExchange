FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/api/package.json ./packages/api/
COPY apps/api/package.json ./apps/api/

RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm
RUN pnpm build --filter=@crypto-exchange/shared
RUN pnpm build --filter=@crypto-exchange/api...
RUN pnpm build --filter=@crypto-exchange/api

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 bun
RUN adduser --system --uid 1001 bun

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/api/dist ./packages/api/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./package.json

USER bun

EXPOSE 3001

ENV PORT=3001
ENV HOST=0.0.0.0

CMD ["bun", "run", "dist/index.js"] 
