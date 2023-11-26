FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build gateway


FROM node:alpine AS development
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ ./
# RUN mkdir -p ./dist/apps/gateway/public
# RUN mkdir -p ./dist/apps/gateway/src/views
CMD npx wait-port mongodb-primary:27017 && \
    npx wait-port rabbitmq:5672 &&  \
    npx wait-port redis:6379 && \
    yarn start:dev gateway


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY --from=builder ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --omit dev
COPY --from=builder /usr/src/app/dist/ ./dist/
RUN mkdir -p ./dist/apps/gateway/public
RUN mkdir -p ./dist/apps/gateway/src/views
COPY --from=builder /usr/src/app/apps/gateway/public/ ./dist/apps/gateway/public/
COPY --from=builder /usr/src/app/apps/gateway/src/views/ ./dist/apps/gateway/src/views/

CMD ["node", "dist/apps/gateway/src/main"]