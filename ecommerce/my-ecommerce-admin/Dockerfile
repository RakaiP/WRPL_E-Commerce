FROM node:18-alpine

WORKDIR /app

# Copy prisma schema first
COPY prisma ./prisma

# Copy package files but skip postinstall script
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# Copy all other files
COPY . .

# Now run prisma generate manually
RUN npx prisma generate

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV development

EXPOSE 3000

# Run in development mode
CMD ["npm", "run", "dev"]
