# Dockerfile
# Multi-stage build for QuizMaster SvelteKit app

# Stage 1: Build
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Production
FROM oven/bun:1-slim AS production

WORKDIR /app

# Copy built application
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Copy static data files
COPY --from=builder /app/static/data ./static/data

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Expose port
EXPOSE 3000

# Run the application
CMD ["bun", "./build/index.js"]
