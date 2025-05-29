FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install curl for healthchecks
RUN apk add --no-cache curl
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies with regular npm install instead of ci
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
# Install curl for healthchecks
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Add build-time environment variables
ENV NEXT_PUBLIC_API_URL=http://admin:3000
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
# Install curl for healthchecks
RUN apk add --no-cache curl
WORKDIR /app

ENV NODE_ENV production

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts ./scripts

# Allow scripts to be executable
RUN chmod +x ./scripts/*.sh || true

EXPOSE 3001

ENV HOSTNAME="0.0.0.0"
ENV PORT=3001

CMD ["node", ".next/standalone/server.js"]
