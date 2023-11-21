codelab-master/nest-star-docker.git-2310

# 개요
  ## 기술스택

- 백엔드서버 (port: 개발 4000, 운영 8000)

  - 프레임워크: nest.js

  - 적용스택

    - TypeScript
    - prettier, eslint
    - typeORM
    - Swagger
    - husky

  <br>

- DB 서버

  - MySQL (port: 컨테이너 3306, 호스트 13306)

  <br>

## 특징

- 프레임워크가 제공하는 객체지향 개발적 구조를 활용하기 위해 NestJS 를 선택

- filfer 및 message 파일을 통해 error handling 표준화

- enum type, decorator 활용으로 공통요소 적용

- jwt, cookie, passport, guard 적용으로 인증 강화

- 환경설정 파일, 도커 파일 별도 분리

- swagger api document 제공

  <br>

## 데이터 구성

![erd](/.etc/erd.png)
  <br>
  <br>
# 상세기능

## 회원

- 가입 (이메일, 비밀번호, 이름)

  이메일 중복 체크, 비밀번호 암호화(bcrypt), 가입 시 '가입축하 적립금' 부여

- 로그인 (이메일, 비밀번호)

  암호화된 비밀번호화 비교, Cookie에 jwt 저장 (JWT Authority, Guard, Strategy 사용, 유효기간 5분)

- 로그아웃

  쿠키 삭제 및 유효기간 0으로 설정

- 비밀번호 변경

  이전 비밀번호와 같으면 에러

- 탈퇴

  탈퇴사유는 enum으로 저장, 상세사유 추가 저장 가능, 탈퇴한 계정은 로그인 및 검색되지 않음, 적립금 소멸

- 검색

  이메일 일부로 검색

- 회원 인증, 관리자 권한 확인

  Header의 Authorization 값(Bearer +jwt)으로 인증

## 관계

- 팔로우 (다른 유저의 이메일)

- 언팔로우 (다른 유저의 이메일)

- 차단

  - 유저는 팔로우한 친구를 차단할 수 있으며

  - 차단된 친구는 차단한 친구를 다시 팔로우할 수 없음

## 포스트

- 작성자만 수정하거나 삭제

- 공개권한 설정 (공개/친구 공개/비공개)

- 제목 검색

## 포인트

- 회원별 적립금 합계 조회

- 회원별 적립금 적립/사용 내역 조회

  - 페이징 처리

- 회원별 적립금 적립

  - 적립금의 유효기간 구현 (1년)

- 회원별 적립금 사용

  - 적립금 사용시 우선순위는 먼저 적립된 순서로 사용(FIFO)

- 회원별 적립금 사용취소

  - 적립금 사용 API 호출하는 쪽에서 Rollback 처리를 위한 용도

## 기타

- 헬스 체크

<br><br>

# 개발환경 구성

## 설치 및 구성

```bash
# 1. 프로젝트 생성

git clone git@github.com:bmmaker/nestjs-star.git

# 2. 프로젝트 폴더로 이동
cd nestjs-star

# 3. .env 파일 생성
`.env.example` 파일명을 `.env`로 수정합니다.
`.env`를 본인이 사용하려는 DB 연결 정보에 맞게 수정하면 됩니다. 
현재 `.env`의 `DB_HOST`는 Docker 컨테이너에서 실행되는 데이터베이스를 가리키고 있습니다.
```

<br>

## Docker 환경

Dockerfile.dev 는 개발 환경으로 사용하는 목적이고
Dockerfile.prod 는 운영 환경에서 사용할 수 있도록 최적화하였습니다.
DB와 node.js(nest.js) 모두 docker 환경으로 사용하도록 하였습니다.
dev 환경에서는 호스트의 현재 경로를 볼륨 마운트하여 코드 수정시 자동으로 서버를 재시작하도록 하였습니다.

<br>

## Docker 설치

- https://www.docker.com \
  운영체제에 맞는 docker 다운로드 및 설치

- 터미널(cmd 등)에서 정상 설치 확인

```bash
$ docker -v
Docker version 20.10.22, build 3a2c30b
```
<br>

## 개발 환경
```bash
# 실행
$ docker-compose --profile dev up -d  

# 프로세스 확인
$ docker-compose --profile dev ps

# 로그 확인
$ docker-compose --profile dev logs -f

## DB migration
$ docker exec -it star-server bash
> 컨테이너ID:/usr/src/app# yarn run migration:generate CreateTables
> 컨테이너ID:/usr/src/app# yarn run migration:run

# 재시작
$ docker-compose --profile dev restart

# 중지
$ docker-compose --profile dev down

# 중지 (도커 볼륨 삭제)
$ docker-compose down --profile dev -v
```
<br>

## 운영 환경
```bash
# 실행
$ docker-compose --profile prod up -d 
```

<br>

## 테스트

```bash
$ yarn test
```
<br>

## API Documents

### Swagger
- 개발
  http://localhost:4300/api-docs

- 운영
  http://localhost:8000/api-docs

<br>
<br>

# cf. 로컬 실행
```bash
$ npm isntall -g yarn
$ yarn install
$ DEBUG=star-server:* yarn run start:debug

http://localhost:3000/api-docs
```
<br>
<br>

## 6/20 할일
[√] 다단계 빌드 적용  \
https://www.notion.so/wishty/Use-Node-js-with-Docker-and-Docker-Compose-to-improve-DX-2eebf0f4b0d646bfbe2e58596609f477
