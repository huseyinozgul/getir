FROM node:alpine

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000
