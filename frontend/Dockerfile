# Use an official Node runtime as a parent image
FROM node:14
 
# Set the working directory to /app
WORKDIR /app
 
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
 
# Install the application dependencies
RUN npm install
 
# Copy the content of the local src directory to the working directory
COPY . .
 
# Make port 3000 available to the world outside this container
EXPOSE 3000
 
# Define the command to run your application
CMD ["npm", "start"]

     