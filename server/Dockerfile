#  Dockerfile for Node Express Backend

FROM node:18.2.0-alpine

WORKDIR /usr/immeln/server

# Install Dependencies (trouble finding a correct version)
COPY package*.json ./

RUN npm install
RUN npm install nodemon -g --save

# Copy app source code
COPY . .

CMD ["npm","start"]