# 1. Use an official runtime as a parent image (Example for Node.js)
FROM node:18-slim

# 2. Set the working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your code
COPY . .

# 5. Expose the port your app runs on (usually 8080 for GCP)
EXPOSE 8080

# 6. Command to run the app
CMD [ "npm", "start" ]
