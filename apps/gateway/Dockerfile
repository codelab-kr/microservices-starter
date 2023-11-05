FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build gateway


FROM node:alpine AS development
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ ./
RUN mkdir -p /usr/src/app/dist/apps/gateway/views
RUN mkdir -p /usr/src/app/dist/apps/gateway/public

CMD npx wait-port mongodb-primary:27017 && \
    npx wait-port rabbitmq:5672 &&  \
    npx wait-port redis:6379 && \
    yarn start:dev gateway



# FROM node:alpine AS production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production
# COPY --from=builder /usr/src/app/dist/ ./dist/
# COPY ./src/views/ ./dist/views/
# COPY ./public ./public

# CMD ["node", "dist/apps/gateway/main"]