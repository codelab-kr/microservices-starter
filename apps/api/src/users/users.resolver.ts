import { ClientProxy } from '@nestjs/microservices';
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
    // event pattern
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
  }

  @Query(() => User, { nullable: true })
  getUser(@Args('id') id: string) {
    // request-response pattern
    return this.natsClient.send({ cmd: 'getUser' }, { id });
  }

  @Query(() => [User], { nullable: true })
  getUsers() {
    // request-response pattern
    return this.natsClient.send({ cmd: 'getUsers' }, {});
  }

  @ResolveField('payments', () => [Payment], { nullable: true })
  getUserPayments(@Parent() user: User) {
    // const findUser = this.getUserById(user.id);
    const { id } = user;
    return this.natsClient.send({ cmd: 'getPaymentByUserId' }, { userId: id });
  }
}
