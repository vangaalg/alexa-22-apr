FROM node:16

WORKDIR /app

<<<<<<< HEAD
# Copy package.json files and install dependencies
COPY package.json .
COPY admin-ui/package.json ./admin-ui/
=======
# COPY ALEXA/package.json .iles and install dependencies
COPY ALEXA/package.json .
COPY ALEXA/admin-ui/package.json ./admin-ui/
>>>>>>> be64f12a554e4331e109a2d75cd1411ab379e8f5
RUN npm install --only=production
RUN cd admin-ui && npm install --only=production

# Copy source files
COPY . .

# Start the application
CMD ["npm", "start"]

<<<<<<< HEAD
EXPOSE 3000 
=======
EXPOSE 3000 
>>>>>>> be64f12a554e4331e109a2d75cd1411ab379e8f5
