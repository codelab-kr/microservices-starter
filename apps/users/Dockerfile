FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn set version berry
RUN yarn set version stable
RUN yarn install
RUN yarn build users


FROM node:alpine AS development
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ ./


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock /usr/src/app/.yarnrc.yml /usr/src/app/.pnp.* /usr/src/app/start.prod.js ./
COPY --from=builder /usr/src/app/.yarn ./.yarn
RUN yarn set version berry
RUN yarn set version stable
RUN yarn install --immutable
COPY --from=builder /usr/src/app/dist/ ./dist/
# ENTRYPOINT [ "yarn", "start:prod"]
