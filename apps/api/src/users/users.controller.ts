import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Patch,
  Delete,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { Response } from 'express';
import { UsersService } from './users.sevice';
import { lastValueFrom } from 'rxjs';
import { UpdateUserRequest } from './dtos/update-user.request';

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

  @Patch()
  updateUser(@Body() request: UpdateUserRequest) {
    try {
      return this.usersService.updateUser(request);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    try {
      return this.usersService.deleteUser(id);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
