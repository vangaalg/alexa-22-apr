FROM node:16

WORKDIR /app

# Copy package.json files and install dependencies
COPY package.json .
COPY admin-ui/package.json ./admin-ui/
RUN npm install --only=production
RUN cd admin-ui && npm install --only=production

# Copy source files
COPY . .

# Start the application
CMD ["npm", "start"]

EXPOSE 3000 