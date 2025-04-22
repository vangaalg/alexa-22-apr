FROM node:16

WORKDIR /app

# COPY ALEXA/package.json .iles and install dependencies
COPY ALEXA/package.json .
COPY ALEXA/admin-ui/package.json ./admin-ui/
RUN npm install --only=production
RUN cd admin-ui && npm install --only=production

# Copy source files
COPY . .

# Start the application
CMD ["npm", "start"]

EXPOSE 3000 
