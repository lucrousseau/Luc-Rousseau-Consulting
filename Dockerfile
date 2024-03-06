# Use Node.js version 18 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Clone your project from Git
RUN git clone https://github.com/lucrousseau/Frontend.git .

# Install dependencies
RUN npm install

# Build the Next.js project (this step is often necessary for a Next.js project)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3131

# Start the application
CMD ["npm", "run", "start"]
