import { Body, Controller, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './models/user';
import { LoginUserRequest } from './dtos/login.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';

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

  @MessagePattern({ cmd: 'validateUser' })
  validateUser(@Payload() data: LoginUserRequest | TokenPayload) {
    return this.usersService.validateUser(data);
  }

  @MessagePattern({ cmd: 'getUser' })
  async getUser(@Payload() data: any) {
    return await this.usersService.getUser(data);
  }

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(@Payload() id: string) {
    return await this.usersService.getUserById(id);
  }

  @MessagePattern({ cmd: 'getUsers' })
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @MessagePattern({ cmd: 'getOrSaveUser' })
  async getOrSaveUser(@Payload() data: CreateUserDto) {
    return await this.usersService.getOrSaveUser(data);
  }

  @MessagePattern({ cmd: 'updateUser' })
  updateUser(@Body() request: UpdateUserDto): Promise<any> {
    return this.usersService.updateUser(request);
  }

  @EventPattern('paymentCreated')
  handlePaymentCreated(@Payload() data: any): Promise<any> {
    const { userId: id, id: paymentId } = data;
    return this.usersService.updateUser({ id, paymentId });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<any> {
    return this.usersService.deleteUser({ id });
  }
}
