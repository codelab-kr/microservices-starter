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

@Controller()
export class UsersController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Get('signup')
  getSignup(@Res() res: Response) {
    res.render('signup', {});
  }

  @Post('signup')
  async CreateUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    let result: any;
    try {
      result = await lastValueFrom(
        this.natsClient.send({ cmd: 'createUser' }, createUserDto),
      );
      if (!result?.email) {
        throw new Error(result.message);
      }
      res.render('login', { input: createUserDto });
      // const baseUrl = global[Symbol.for('BaseUrl')];
      // const user = await axios.post(`${baseUrl}/login`, {
      //   email: createUserDto.email,
      //   password: createUserDto.password,
      // });
      // if (user) {
      //   res.redirect('/videos');
      // }
    } catch (e) {
      console.log(e.messages);
      res.render('signup', { input: createUserDto, error: e.message });
    }
  }

  @Get('users/list')
  getUsers() {
    return this.natsClient.send({ cmd: 'getUsers' }, {});
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'getUserById' }, id);
  }

  // @Get('users')
  // getUser(data: any) {
  //   return this.natsClient.send({ cmd: 'getUser' }, data);
  // }
}
