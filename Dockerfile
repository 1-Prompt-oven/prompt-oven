# Stage 1: Build environment
FROM node:20-alpine AS builder
WORKDIR /app

# Install jq
RUN apk update && \
    apk add --no-cache jq

# Disable husky and next telemetry
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true

# Install pnpm and turbo
RUN npm install -g pnpm@9.12.2
RUN npm install -g turbo@2.2.1
RUN pnpm store prune

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/client/package.json ./apps/client/package.json
COPY apps/admin/package.json ./apps/admin/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/config-tailwind/package.json ./packages/config-tailwind/package.json
COPY packages/config-typescript/package.json ./packages/config-typescript/package.json
COPY packages/config-eslint/package.json ./packages/config-eslint/package.json
COPY packages/config-prettier/package.json ./packages/config-prettier/package.json

# Modify package.json to remove husky prepare script
RUN cat package.json | jq 'del(.scripts.prepare)' > temp.json && mv temp.json package.json

# Install dependencies
RUN pnpm install --ignore-scripts --recursive

# Copy source code
COPY . .

# Build applications
RUN pnpm turbo build

# Stage 2: Production environment
FROM node:20-alpine AS runner
WORKDIR /app

# Disable husky and next telemetry
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1

# Install pnpm and turbo
RUN npm install -g pnpm@9.12.2
RUN npm install -g turbo@2.2.1
RUN pnpm store prune

# Copy package files and node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/client/node_modules ./apps/client/node_modules
COPY --from=builder /app/apps/admin/node_modules ./apps/admin/node_modules
COPY --from=builder /app/packages/ui/node_modules ./packages/ui/node_modules

# Copy built assets
COPY --from=builder /app/apps/client/.next ./apps/client/.next
COPY --from=builder /app/apps/admin/.next ./apps/admin/.next

# Copy package files
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/client/package.json ./apps/client/package.json
COPY apps/admin/package.json ./apps/admin/package.json
COPY packages/ui/package.json ./packages/ui/package.json

# Copy .env file for ensure apply .env to production mode running
COPY --from=builder /app/apps/client/.env ./apps/client/.env
COPY --from=builder /app/apps/admin/.env ./apps/admin/.env

# Copy public directories if they exist
COPY --from=builder /app/apps/client/public ./apps/client/public
COPY --from=builder /app/apps/admin/public ./apps/admin/public

EXPOSE 3000 3001
# Start both applications
CMD ["sh", "-c", "pnpm --filter client start & pnpm --filter admin start"]
