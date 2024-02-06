# For Developers

## 1. Prerequisites

````bash
# Clone the repository
git clone ....
```

.env 파일은 .env.example 파일을 복사해서 사용한다.
mongodb.key 파일은 예시 파일이므로 실제 서비스 시에는 보안 상 다른 키를 사용해야 한다.

```bash
openssl rand -base64 756 > ./databases/mongo/mongodb.key

chmod 400 ./databases/mongo/mongodb.key
````

## 2. Start the project

```bash
# Start DBs for the project
docker compose -f docker-compose.db.yaml up --build -V -d
docker compose -f docker-compose.db.yaml up -d

# Start the project
docker compose up --build -V -d
docker compose up -d
```

## 3. Stop the project

```bash
# Stop the project
docker compose down

# Stop the project and remove volumes and images and networks
docker compose down -v --rmi all --remove-orphans

# Stop all for the project
docker compose -f docker-compose.yaml -f docker-compose.db.yaml  down  -v --rmi all --remove-orphans
```

## 4. Test the project

```bash
docker build -t ap-seoul-1.ocir.io/cnqphqevfxnp/development-storage:0.9 -f apps/storage/Dockerfile --target development .
docker run -d -p 4001:80 -e PORT=80 -e SERVICE_NAME=storage --name development-storage ap-seoul-1.ocir.io/cnqphqevfxnp/development-storage:0.9

```

# TODO

1/16

- 오라클 클라우드 결제 정보 재등록 -완료
- 에러 처리 마무리 -완료
- 허스키 적용 -완료
- 테스트 코드 작성 시작

1/17

- users, posts (typeorm + mysql) 테스트 코드 작성 -완료

1/18 ~ 1/19

- 1개만 젠킨스 CI/CD 연결
- 1개만 테스트와 젠킨스 연결
- 1개만 아르고 CD 연결
- 1개만 아르고 CD와 젠킨스 연결

- payments (typeorm + mysql), history (mongoose + mongo), storage 테스트 코드 작성
- api-gateway 테스트 코드 작성
- 통합테스트 작성

1/21

- 캐시 전체 적용
- 캐시 테스트 코드 작성?

1/23~24 자잘한 기능 추가

- 회원정보 수정 기능 추가
- 회원정보 수정 테스트 코드 작성
- 회원정보 삭제 기능 추가
- 사진 업로드 기능 추가
- 페이지네이션 적용
- 페이지네이션 테스트 코드 작성
- 검색 적용
- 검색 테스트 코드 작성
- 히스토리 카운트 적용
- 히스토리 카운트 테스트 코드 작성

1/25 ~ 26

- 마이크로서비스 간 gql 연결 및 통합 ?
  Apollo Federation: MSA for GraphQL
  https://devstarsj.github.io/development/2023/03/12/Apollo.Federation/
- 마이크로서비스 간 통합 테스트 코드 작성

1/27 ~ 28

- 그림 그리기
- 메뉴얼 정리
- 버그 수정
- 메뉴얼 따라서 테스트

1/29 ~ 31

- 최종 마무리

# MongoDB

https://velog.io/@youngeui_hong/Docker를-사용하여-MongoDB-Replica-Set-구축하기 \
https://blog.devgenius.io/ how-to-deploy-a-mongodb-replicaset-using-docker-compose-a538100db471

# docker restart microservices-starter-auth-1

# docker restart microservices-starter-history-1

# docker restart microservices-starter-videos-1

# docker restart microservices-starter-stars-1

rs.status()

docker-compose up --build -V -d
docker-compose up posts --build -V -d

````

<br>

# Test

http://localhost:3000/api-docs
http://localhost:3001/api-docs
http://localhost:3009/api-docs

# GraphQL

http://localhost:3001/graphql

jwt.strategy.ts

```typescript
...
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET'),
    });
  }
	...
}
````

Http Headers

```bash
{
  "Authorization": "Bearer your-token-goes-here"
}
```

query & mutation

```bash
# getUser
query {
  user(_id: "65531ef505d8e17bf4b10196") {
    email
    username
    password
  }
}

# getUsers
query {
  users(email: "test@test.com") {
    email
    username
    password
  }
}

# createUser
mutation {
  createUser(createUserData: { username: "John Doe3", email: "john.doe3@example.com", password: "abcd1234" }) {
    username
    email
  }
}

# updateUser
mutation {
  updateUser(updateUserData: { _id:"655235bd083e3149d3a77777", username: "John Doe", password: "abcd1234111" }) {
    # _id
    username
    email
  }
}

# deleteUser
mutation{
  deleteUser(deleteUserData: {_id: "65531ef505d8e17bf4b10196"}){
    email

  }
}





```

```bash
query {
  getUsers {
    id
    email
    payments {
      id
      amount
    }
  }
}
```

```bash
mutation {
  CreatePayment(createPaymentDto: { amount: 120000, userId: "cb4ab319-00c6-4026-b18b-04f3013008fb"  }) {
    id
    amount
  }
}
```

```bash
mutation {
  CreateUser (createUserDto: {email: "ddd@dd.com", password: "abcd1234", username: "ddd", isSubscribed: true}) {
    id
    username
  }
}
```

```typescript
function addTwoTodoItems() {
  const maxId = todoItems;
}
```

순서

1. jest.mock() - 테스팅을 위해 모킹할 서비스 생성 <- users/**mocks** 폴더에 서비스 목킹 생성 <- users/test/stubs/유저 스텁 생성
2. beforeEach() - 컨트롤러 테스트를 위한 테스팅 모듈(컨트롤러, 프로바이더(서비스) 세팅 ) 생성 & 컴파일
3. describe() - 엔드포인트 별로 테스트 케이스 생성
   beforeEach() 로 테스트할 메소드를 실행하고 test() 에서는 해당 실행결과를 기대되는 상태나 값과 비교한다.
   컨트롤러는 매칭되는 서비스를 파라미터와 함께 잘 불러오는지 확인하고 결과값이 맞는지 확인한다.

mysql

docker exec -it mysql mysql -uroot -p # testtest 입력
CREATE USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'testtest';

docker exec -it test-mysql mysql -uroot -p # testtest 입력
CREATE USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'testtest';

# redis + express session + passport

아래 redis + express session 참고
https://medium.com/@aashisingh640/securing-your-express-typescript-apps-using-sessions-and-redis-f3818e0c1e17

(+) passport 추가
(+) 인증 방식 선택 기능 추가 (.env 파일 'SESSION' true(A) 또는 false(B)로 설정)
Allows to choose authentication method between Redis Session and JWT Cookie

- A: redis + express session + passport
- B: jwt + cookie + passport
  참고: .env 파일 변경사항 적용 시 재빌드해야 함
  docker-compose -f docker-compose.yaml up api --build -V -d
