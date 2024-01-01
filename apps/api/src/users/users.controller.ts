import { Controller, Post, Inject, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create.user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post()
  CreateUser(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    // request-response pattern
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
  }
}
