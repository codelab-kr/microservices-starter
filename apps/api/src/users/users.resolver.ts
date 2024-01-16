import { RpcException } from '@nestjs/microservices';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from './models/user';
import { CreateUserDto } from './dtos/create-user.dto';
import { Payment } from '../payments/models/payment';
import { UsersService } from './users.sevice';
import { NATS_SERVICE } from '@app/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  CreateUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Query(() => User, { nullable: true })
  getUser(@Args('id') id: string) {
    try {
      return this.usersService.getUserById(id);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Query(() => [User], { nullable: true })
  getUsers() {
    try {
      return this.usersService.getUsers();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @ResolveField('payments', () => [Payment], { nullable: true })
  getUserPayments(@Parent() user: User) {
    try {
      const { id: userId } = user;
      return this.usersService.getUserPayments(userId);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
