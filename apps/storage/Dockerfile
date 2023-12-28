FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build storage


FROM node:alpine AS development
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ ./
CMD npx wait-port mongodb-primary:27017 && \
  npx wait-port rabbitmq:5672 &&  \
  npx wait-port redis:6379 && \
  yarn start:dev storage


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock ./
RUN yarn install --frozen-lockfile --omit dev
COPY --from=builder /usr/src/app/dist/ ./dist/
RUN mkdir -p ./public/video
COPY --from=builder /usr/src/app/public/video/ ./public/video/

CMD ["node", "dist/apps/storage/src/main"]