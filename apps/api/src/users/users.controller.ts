import { Controller, Post, Inject, Body, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { NATS_SERVICE } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post()
  CreateUser(@Body() createUserDto: CreateUserDto) {
    // request-response pattern
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
  }

  @Get()
  getUsers() {
    // request-response pattern
    return this.natsClient.send({ cmd: 'getUsers' }, {});
  }
}
