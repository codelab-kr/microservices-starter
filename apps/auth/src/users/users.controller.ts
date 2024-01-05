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
import { User } from '../models/user';
import { LoginUserRequest } from './dtos/login.user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly confisgService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

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

  @MessagePattern({ cmd: 'validateUser' })
  validateUser(@Payload() data: LoginUserRequest) {
    const { email, password } = data;
    return this.usersService.validateUser(email, password);
  }

  @MessagePattern({ cmd: 'validate_user' })
  @UseGuards(JwtAuthGuard)
  async validateUserJwt(
    @Payload() authentication: any,
    @CurrentUser() user: User,
  ) {
    return user;
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

  @MessagePattern({ cmd: 'getCookie' })
  async getCookie(@Payload('userId') userId: string) {
    const tokenPayload: { userId: string } = { userId };

    const maxAge = parseInt(this.confisgService.get('JWT_EXPIRATION')) * 1000;
    const token = this.jwtService.sign(tokenPayload);

    return { token, maxAge };
  }
}
