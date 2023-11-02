FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build videos


FROM node:alpine AS development

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/ ./

CMD npx wait-port mongodb-primary:27017 && \
  npx wait-port rabbitmq:5672 &&  \
  npx wait-port redis:6379 && \
  yarn start:dev videos


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/videos/main"]