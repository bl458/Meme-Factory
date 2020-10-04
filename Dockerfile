FROM node:10

WORKDIR /srv/app

COPY package*.json ./
COPY ormconfig.js ./

RUN npm ci --only=production

COPY build/ ./build/

EXPOSE 8000
ENTRYPOINT npm run run:remote:prod
