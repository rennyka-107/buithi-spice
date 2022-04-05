FROM node:16.5.0-alpine3.13

# Set working directory
WORKDIR /var/www/html

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY . /var/www/html/
COPY ./package*.json var/www/html/

# Install dependencies
RUN npm install --production

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
# USER asus

# Launch app with PM2
CMD [ "npm", "start" ]