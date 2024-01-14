import { Controller, Post, Inject, Body, Get, Param } from '@nestjs/common';
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

  @Get('list')
  getUsers() {
    return this.natsClient.send({ cmd: 'getUsers' }, {});
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'getUserById' }, id);
  }

  getUser(data: any) {
    return this.natsClient.send({ cmd: 'getUser' }, data);
  }
}
