# TODO

- 오라클 클라우드 결제 정보 재등록 -완료
- 에러 처리 마무리
- 허스키 적용
- 테스트 코드 작성

- 젠킨스 CI/CD 연결
- 테스트와 젠킨스 연결
- 아르고 CD 연결
- 아르고 CD와 젠킨스 연결

- 캐시 전체 적용
- 캐시 테스트 코드 작성?



- 마이크로서비스 간 gql 연결 및 통합 ?
  Apollo Federation: MSA for GraphQL
  https://devstarsj.github.io/development/2023/03/12/Apollo.Federation/




# MongoDB

https://velog.io/@youngeui_hong/Docker를-사용하여-MongoDB-Replica-Set-구축하기 \
https://blog.devgenius.io/ how-to-deploy-a-mongodb-replicaset-using-docker-compose-a538100db471

```bash
openssl rand -base64 756 > ./database/mongodb.key
chmod 400 ./database/mongodb.key

docker-compose -f docker-compose.db.yaml up --build -V -d

docker exec -it microservices-starter-mongodb-primary-1 mongosh -u root -p password123

docker-compose exec -it mongodb-primary mongosh -u root -p password123 --eval 'rs.initiate({
	 _id: "mongoReplicaSet",
	 members: [
	   {_id: 0, host: "mongodb-primary"},
	   {_id: 1, host: "mongodb-secondary"},
	   {_id: 2, host: "mongodb-arbiter"}
	 ]
});'

# docker restart microservices-starter-auth-1
# docker restart microservices-starter-history-1
# docker restart microservices-starter-videos-1
# docker restart microservices-starter-stars-1


rs.status()


docker-compose up --build -V -d
docker-compose up posts --build -V -d

```

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
```

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
