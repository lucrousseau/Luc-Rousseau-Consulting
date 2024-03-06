# Use Node.js version 18 as the base image
FROM node:18 

# Set the working directory inside the container
WORKDIR /app

# ARG will declare a build-time variable named GITHUB_TOKEN
ARG GITHUB_TOKEN

# Use the build argument to clone your project from a private GitHub repository
# Note: The URL format here inserts the GITHUB_TOKEN into the clone URL
RUN git clone https://$GITHUB_TOKEN@github.com/lucrousseau/Frontend.git .

# Install dependencies
RUN npm install

# Build the Next.js project (this step is often necessary for a Next.js project)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

# docker build --build-arg GITHUB_TOKEN=your_personal_access_token_here -t luc-frontend .
# docker run -p 3000:3000 luc-frontend