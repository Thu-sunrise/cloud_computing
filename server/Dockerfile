FROM node:18-alpine AS base
WORKDIR /usr/src/app

# Install production dependencies
COPY package*.json ./
RUN npm ci 

# Copy application source
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

# Start the server 
CMD ["node", "src/server.js"]
