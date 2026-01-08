# Use latest Node.js 22 image
FROM node:22

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first and install
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose backend port
EXPOSE 3000

# Start the backend with nodemon (dev) or node (prod)
CMD ["npm", "run", "dev"]
