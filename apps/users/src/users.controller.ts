import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  MessagePattern,
  EventPattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create.user.dto';
import { LoginUserRequest } from './dtos/login.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
import { User } from './models/user';

export interface TokenPayload {
  userId: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() data: CreateUserDto) {
    try {
      return await this.usersService.createUser(data);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern({ cmd: 'validateUser' })
  validateUser(@Payload() data: LoginUserRequest | TokenPayload) {
    return this.usersService.validateUser(data);
  }

  @Get(':id')
  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(@Payload() id: string, @Param('id') paramId?: string) {
    return await this.usersService.getUserById(paramId ?? id);
  }

  @Get(':email')
  @MessagePattern({ cmd: 'getUserByEmail' })
  async getUserByEmail(
    @Payload() email: string,
    @Param('id') paramEmail?: string,
  ) {
    return await this.usersService.getUserByEmail(paramEmail ?? email);
  }

  @Get()
  @MessagePattern({ cmd: 'getUsers' })
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Post('get-or-saver')
  @MessagePattern({ cmd: 'getOrSaveUser' })
  async getOrSaveUser(@Payload() data: CreateUserDto) {
    return await this.usersService.getOrSaveUser(data);
  }

  @Patch()
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
  @MessagePattern({ cmd: 'deleteUser' })
  deleteUser(
    @Payload() id: string,
    @Param('id') paramId?: string,
  ): Promise<any> {
    return this.usersService.deleteUser(paramId ?? id);
  }
}
