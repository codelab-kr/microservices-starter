# 알림
이 저장소는 스타터 키트 복사본이 아닙니다 :) \
한타 한타(?) 직접 만들었습니다.

<br>

# For Developers

## 0. Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)

- [Docker Compose](https://docs.docker.com/compose/install/)

- Git

<br>

## 1. Clone the repository

```bash
# git Clone
git clone https://github.com/codelab-kr/microservices-starter.git && cd microservices-starter

# databases/mongo/mongodb.key
openssl rand -base64 756 > ./databases/mongo/mongodb.key && chmod 400 ./databases/mongo/mongodb.key

# .env
cp ./.env.example ./.env
cp ./apps/api/.env.example ./apps/api/.env && vi ./apps/api/.env
```

<br>

## 2. Start the project

```bash
# Activate Docker BiuldKit
export DOCKER_BUILDKIT=1

# Start DBs for the project
docker compose -f docker-compose.db.yaml up --build -V -d

# Start the project
docker compose up --build -V -d
```

<br>

## 3. Stop the project

```bash
# Stop the project
docker compose down

# Stop the project and remove volumes and images and networks
docker compose down -v --rmi all --remove-orphans

# Stop all for the project
docker compose -f docker-compose.yaml -f docker-compose.db.yaml  down  -v --rmi all --remove-orphans
```

<br>
