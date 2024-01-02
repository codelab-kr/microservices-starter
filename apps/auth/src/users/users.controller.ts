import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update.user.dto';
import JwtAuthGuard from '../guards/jwt-auth.guard';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './models/user';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() data: CreateUserDto) {
    console.log('data', data);
    return await this.usersService.createUser(data);
  }

  @EventPattern('paymentCreated')
  handlePaymentCreated(data: any) {
    console.log('handlePaymentCreated', data);
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(@Payload() data: any) {
    const { id } = data;
    console.log('getUserById', id);
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @MessagePattern({ cmd: 'getUsers' })
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() request: UpdateUserDto,
  ): Promise<any> {
    return this.usersService.updateUser({ ...request, id });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<any> {
    return this.usersService.deleteUser({ id });
  }
}
