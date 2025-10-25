FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies
COPY package*.json ./
RUN npm install

# Copy rest of app
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2 — Run the app
FROM node:20-alpine

WORKDIR /app

# Copy built output from builder
COPY --from=builder /app ./

# Expose port 3000
EXPOSE 3000

# Start Next.js server
CMD ["npm", "run", "start"]
