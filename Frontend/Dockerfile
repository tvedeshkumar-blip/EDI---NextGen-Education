# ==============================================================================
# NextGen Education - Production Multi-Stage Dockerfile
# Stage 1: Build the Vite + React Single Page Application
# Stage 2: Serve compiled static assets via high-performance Nginx
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build Environment
# ------------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first for optimal Docker layer caching
COPY package.json package-lock.json ./

# Install exact dependencies using clean install
RUN npm ci

# Copy application source code
COPY . .

# Compile optimized production bundle into /app/dist
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production Nginx Server
# ------------------------------------------------------------------------------
FROM nginx:alpine AS runner

# Remove default Nginx welcome assets
RUN rm -rf /usr/share/nginx/html/*

# Copy production build artifacts from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom SPA Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
