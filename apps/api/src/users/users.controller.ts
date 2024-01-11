import { Controller, Post, Inject, Body, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { NATS_SERVICE } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post()
  CreateUser(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
  }

  @Get()
  getUsers() {
    return this.natsClient.send({ cmd: 'getUsers' }, {});
  }

  @Get()
  getUser(data: any) {
    return this.natsClient.send({ cmd: 'getUser' }, data);
  }
}
