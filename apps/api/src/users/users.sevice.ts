import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '@app/common';

@Injectable()
export class UsersService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  createUser(createUserDto: any) {
    try {
      return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  getUsers() {
    try {
      return this.natsClient.send({ cmd: 'getUsers' }, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }

  getUserById(id: string) {
    try {
      return this.natsClient.send({ cmd: 'getUserById' }, id);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
