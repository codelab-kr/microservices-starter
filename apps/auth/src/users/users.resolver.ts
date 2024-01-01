import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { GetUserArgs } from './dtos/args/get-user.args';
import { CreateUserInput } from './dtos/input/create-user.input';
import { UpdateUserInput } from './dtos/input/update-user.input';
import { DeleteUserInput } from './dtos/input/delete-user.input';
import { UseGuards } from '@nestjs/common';
import { User } from './schemas/user.schema';
import GqlAuthGuard from '../guards/gql-auth.guard';
import { GetUsersArgs } from './dtos/args/get-users.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.getUser(getUserArgs._id);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(@Args() getUsersArgs?: GetUsersArgs) {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<User> {
    return this.usersService.deleteUser(deleteUserData);
  }
}
