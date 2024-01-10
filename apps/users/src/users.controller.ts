import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update.user.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './models/user';
import { LoginUserRequest } from './dtos/login.user.dto';

export interface TokenPayload {
  userId: string;
}

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() data: CreateUserDto) {
    return await this.usersService.createUser(data);
  }

  @EventPattern('paymentCreated')
  handlePaymentCreated(data: any) {
    console.log('handlePaymentCreated', data);
  }

  @MessagePattern({ cmd: 'validateUser' })
  validateUser(@Payload() data: LoginUserRequest | TokenPayload) {
    return this.usersService.validateUser(data);
  }

  @MessagePattern({ cmd: 'getUser' })
  getUser(@Payload() data: any) {
    return this.usersService.getUser(data);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  getUserByEmail(@Payload() email: string) {
    return this.usersService.getUserByEmail(email);
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
