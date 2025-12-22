# Dockerfile

# --- Stage 1: Build ---
# Pin specific version for reproducibility
FROM oven/bun:1.3.5 AS builder

WORKDIR /app

# Copy dependency definitions
COPY package.json bun.lock ./

# Install ALL dependencies (including devDependencies needed for building)
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the SvelteKit app
RUN bun run build

# Prune dependencies to keep image small
# This removes devDependencies, leaving only what is needed for production
RUN rm -rf node_modules && \
  bun install --frozen-lockfile --production

# --- Stage 2: Production ---
FROM oven/bun:1.3.5-slim AS production

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
# Don't use "localhost"; 0.0.0.0 is required for Docker networking
ENV HOST=0.0.0.0

# Copy only necessary files from builder
# 1. The built app
COPY --from=builder /app/build ./build
# 2. Production dependencies (CRITICAL STEP YOU MISSED)
COPY --from=builder /app/node_modules ./node_modules
# 3. Package.json (sometimes needed by SvelteKit adapters)
COPY --from=builder /app/package.json ./
# 4. Static data
COPY --from=builder /app/static/data ./static/data

# Security: Run as non-root user (Bun images include a 'bun' user)
USER bun

# Expose port
EXPOSE 3000

# Run the application
CMD ["bun", "./build/index.js"]
