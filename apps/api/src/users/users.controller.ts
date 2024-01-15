import {
  Controller,
  Post,
  Inject,
  Body,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { NATS_SERVICE } from '@app/common';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post('signup')
  async CreateUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    let result: any;
    try {
      result = await lastValueFrom(
        this.natsClient.send({ cmd: 'createUser' }, createUserDto),
      );

      console.log(result);
      // if (!result?.email) {
      //   throw new Error(result.message);
      // }
      // res.render('login', { input: createUserDto });
    } catch (error) {
      console.log(error);
      // res.render('signup', { input: createUserDto, error: error.message });
    }
  }

  @Get()
  getUsers() {
    return this.natsClient.send({ cmd: 'getUsers' }, {});
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'getUserById' }, id);
  }
}
