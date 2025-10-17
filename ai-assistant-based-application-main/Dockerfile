# Use Node.js 20 as the base image to support NestJS 11
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Disable Husky hook installation in CI / containers
ENV HUSKY=0

# Copy root package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies (skip prepare scripts to avoid Husky errors)
RUN npm ci --omit=dev --ignore-scripts

# Copy Nest workspace package files
COPY server/nest/package*.json ./server/nest/

# Install the Nest workspace dependencies
RUN npm --prefix server/nest ci --omit=dev --ignore-scripts

# Copy the rest of the application code
COPY . ./

# Build both Next.js and NestJS applications
RUN npm run build

# Ensure we run with production optimization
RUN npm prune --production

# Expose the port your app runs on
EXPOSE 3001

# Command to run your app in production mode
CMD ["npm", "start"]
