FROM node:alpine AS builder
WORKDIR /usr/src/app
RUN yarn set version berry
COPY ./.yarnrc.yml ./package.json ./yarn.lock ./pnp.* ./
RUN yarn install 
COPY . .
RUN yarn build gateway


FROM node:alpine AS development
WORKDIR /usr/src/app
RUN yarn set version berry
COPY --from=builder /usr/src/app/ ./
CMD npx wait-port mongodb-primary:27017 && \
    npx wait-port rabbitmq:5672 &&  \
    npx wait-port redis:6379 && \
    yarn start:dev gateway


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
RUN yarn set version berry
COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/.yarnrc.yml  /usr/src/app/pnp.* ./
RUN yarn install --omit dev
RUN mkdir -p ./public
COPY --from=builder /usr/src/app/dist/ ./dist/
COPY --from=builder /usr/src/app/public/ ./public/

CMD ["node", "dist/apps/gateway/src/main"]