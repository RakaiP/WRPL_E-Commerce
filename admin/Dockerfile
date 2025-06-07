FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Install dependencies (including dev for build)
RUN npm install

# Copy all files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Install ESLint if needed
RUN npm install --save-dev eslint eslint-config-next || true

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["npm", "start"]
