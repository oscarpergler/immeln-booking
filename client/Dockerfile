# Dockerfile for React client

# Build react client
FROM node:18.2.0-alpine

WORKDIR /usr/immeln/client

COPY package*.json ./

# copy local files to app folder
COPY . .

RUN npm install

CMD ["npm","start"]