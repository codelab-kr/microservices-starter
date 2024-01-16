import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { Response } from 'express';
import { UsersService } from './users.sevice';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async CreateUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const result = await lastValueFrom(
        this.usersService.createUser(createUserDto),
      );
      if (result) {
        return res.redirect(`/login?email=${result.email}`);
      }
    } catch (error) {
      res.render('signup', { input: createUserDto, error: error.message });
    }
  }

  @Get()
  getUsers() {
    try {
      return this.usersService.getUsers();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    try {
      return this.getUserById(id);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
