# MongoDB

https://velog.io/@youngeui_hong/Docker를-사용하여-MongoDB-Replica-Set-구축하기
https://blog.devgenius.io/how-to-deploy-a-mongodb-replicaset-using-docker-compose-a538100db471


```bash
openssl rand -base64 756 > mongodb.key
chmod 400 mongodb.key

docker-compose -f docker-compose.db.yaml up --build -V -d

docker exec -it micro-starter-mongodb-primary-1 mongosh -u root -p password123 

docker-compose exec -it mongodb-primary mongosh -u root -p password123 --eval 'rs.initiate({
	 _id: "mongoReplicaSet",
	 members: [
	   {_id: 0, host: "mongodb-primary"},
	   {_id: 1, host: "mongodb-secondary"},
	   {_id: 2, host: "mongodb-arbiter"}
	 ]
});'

docker restart micro-starter-auth-1
docker restart micro-starter-history-1
docker restart micro-starter-videos-1


rs.status()


docker-compose up --build -V -d
```

<br>

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
      secretOrKey: configService.get('JWT_SECRET'),
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