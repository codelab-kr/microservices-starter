https://velog.io/@youngeui_hong/Docker를-사용하여-MongoDB-Replica-Set-구축하기
https://blog.devgenius.io/how-to-deploy-a-mongodb-replicaset-using-docker-compose-a538100db471


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
--

rs.status()


---


docker-compose up --build -V -d
