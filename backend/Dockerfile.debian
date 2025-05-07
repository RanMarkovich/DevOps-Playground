FROM node:18-slim

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json* ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"] 