# Use official Node.js LTS image as base
FROM node:current-alpine3.22

# Set working directory
WORKDIR /quick-student-tracker-lite

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Expose application port (change if needed)
EXPOSE 8080

# Start the application
CMD ["npm", "run", "dev"]