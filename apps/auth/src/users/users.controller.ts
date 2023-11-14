import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import JwtAuthGuard from '../guards/jwt-auth.guard';

@ApiTags('Users API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserInput): Promise<User> {
    return this.usersService.createUser(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':_id')
  async getUser(@Param('_id') _id: string): Promise<User> {
    return this.usersService.getUser(_id);
  }

  @Get()
  async getUsers(@Query() getUsersArgs?: GetUsersArgs): Promise<User[]> {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Put(':_id')
  async updateUser(
    @Param('_id') _id: string,
    @Body() request: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser({ ...request, _id });
  }

  @Delete(':_id')
  async deleteUser(@Param('_id') _id: string): Promise<User> {
    return this.usersService.deleteUser({ _id });
  }
}
