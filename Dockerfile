FROM node:10-alpine

RUN mkdir -p /var/www/pellwood/client/node_modules && chown -R node:node /var/www/pellwood/client

WORKDIR /var/www/pellwood/client

COPY package*.json ./
RUN yarn install
COPY --chown=node:node . .

RUN yarn sitemap
RUN yarn feed
RUN yarn build

EXPOSE 3001

CMD [ "npm", "start" ]
