# Build stage
FROM docker.io/oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Copy env file if exists
COPY .env* ./

# Build the app
RUN bunx vite build

# Production stage
FROM docker.io/oven/bun:alpine

# Copy built app
COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD ["bun", "run", "preview",  "--port=3000"]
