import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update.user.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './models/user';
import { LoginUserRequest } from './dtos/login.user.dto';

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

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(@Payload() data: any) {
    const { id } = data;
    return this.usersService.getUserById(id);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  getUserByEmail(@Payload() data: any) {
    const { email } = data;
    return this.usersService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'validateUser' })
  validateUser(@Payload() data: LoginUserRequest) {
    console.log('validateUser', data);
    const { email, password } = data;
    return this.usersService.validateUser(email, password);
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
