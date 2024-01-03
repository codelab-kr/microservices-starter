FROM node:alpine AS builder
WORKDIR /usr/src/app
RUN yarn set version berry
COPY ./.yarnrc.yml ./package*.json ./yarn.lock ./pnp.*  ./
COPY ./.yarn/ ./.yarn/
RUN yarn install --immutable --immutable-cache
COPY . .
RUN yarn build posts


FROM node:alpine AS development
WORKDIR /usr/src/app
RUN yarn set version berry
COPY --from=builder /usr/src/app/ ./
CMD yarn start:dev posts


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
RUN yarn set version berry
COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock /usr/src/app/.yarnrc.yml /usr/src/app/pnp.* ./
COPY --from=builder /usr/src/app/.yarn/ ./.yarn/
RUN yarn install --immutable --immutable-cache
COPY --from=builder /usr/src/app/dist/ ./dist/

CMD ["node", "dist/apps/pai/src/main"]