FROM node:18.16.0-alpine3.17 as builder
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./ ./
RUN yarn build


FROM node:18.16.0-alpine3.17 as base
ENV TZ=Asia/Seoul
ENV LANG=ko_KR.UTF-8 \
   LANGUAGE=ko_KR.UTF-8

# bash install
RUN apk add --no-cache --update bash

# Set the timezone in docker
RUN apk --no-cache add tzdata && \
   cp /usr/share/zoneinfo/$TZ /etc/localtime && \
   echo $TZ > /etc/timezone \
   apk del tzdata

# Korean Fonts
RUN apk --update add fontconfig
RUN mkdir -p /usr/share/fonts/nanumfont
RUN wget http://cdn.naver.com/naver/NanumFont/fontfiles/NanumFont_TTF_ALL.zip
RUN unzip NanumFont_TTF_ALL.zip -d /usr/share/fonts/nanumfont
RUN fc-cache -f && rm -rf /var/cache/*
RUN rm -rf NanumFont_TTF_ALL.zip

# Only copy the package.json file to work directory
WORKDIR /usr/src/app
COPY package*.json yarn.lock .env ./

# Docker Demon Port Mapping
EXPOSE 3000


FROM base as production
ENV NODE_ENV production
RUN yarn install --frozen-lockfile --production
# Copy dist files into the image
COPY --from=builder /usr/src/app/dist/ ./dist/
# wait-for-it.sh
COPY ./wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh


FROM base as development
ENV NODE_ENV development
RUN yarn install --frozen-lockfile
# Copy all local files into the image
COPY ./ ./
# wait-for-it.sh
RUN chmod +x ./wait-for-it.sh
