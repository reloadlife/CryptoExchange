FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./
# Copy workspace root files
COPY ../../package.json ../../bun.lockb* ../../

# Install dependencies
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 bun-user
RUN adduser --system --uid 1001 bun-user

# Copy built application
COPY --from=builder --chown=bun-user:bun-user /app/dist ./dist
COPY --from=builder --chown=bun-user:bun-user /app/package.json ./
COPY --from=deps --chown=bun-user:bun-user /app/node_modules ./node_modules

USER bun-user

EXPOSE 3001

ENV PORT=3001

CMD ["bun", "run", "dist/index.js"] 
