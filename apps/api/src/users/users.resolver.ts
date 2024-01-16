import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from './models/user';
import { CreateUserDto } from './dtos/create-user.dto';
import { Payment } from '../payments/models/payment';
import { NATS_SERVICE } from '@app/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Mutation(() => User)
  CreateUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    try {
      return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Query(() => User, { nullable: true })
  getUser(@Args('id') id: string) {
    try {
      return this.natsClient.send({ cmd: 'getUser' }, id);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Query(() => [User], { nullable: true })
  getUsers() {
    try {
      return this.natsClient.send({ cmd: 'getUsers' }, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @ResolveField('payments', () => [Payment], { nullable: true })
  getUserPayments(@Parent() user: User) {
    try {
      const { id } = user;
      return this.natsClient.send(
        { cmd: 'getPaymentByUserId' },
        { userId: id },
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
