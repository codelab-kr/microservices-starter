import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UpdateUserRequest } from './dto/update-user.request';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest): Promise<User> {
    return this.usersService.createUser(request);
  }

  @Post()
  @Get(':_id')
  async getUser(@Param('_id') _id: string): Promise<User> {
    return this.usersService.getUser(_id);
  }

  // TODO: DefaultValuePipe 적용?
  @Get()
  async getUsers(@Query() getUserArgs?: Partial<User>): Promise<User[]> {
    return this.usersService.getUsers(getUserArgs ?? {});
  }

  @Put(':_id')
  async updateUser(
    @Param('_id') _id: string,
    @Body() request: UpdateUserRequest,
  ): Promise<User> {
    return this.usersService.updateUser(_id, request);
  }

  @Delete(':_id')
  async deleteUser(@Param('_id') _id: string): Promise<User> {
    return this.usersService.deleteUser(_id);
  }
}
