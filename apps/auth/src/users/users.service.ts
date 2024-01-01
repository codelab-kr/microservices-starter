import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { GetUsersArgs } from './dtos/args/get-users.args';
import { CreateUserInput } from './dtos/input/create-user.input';
import { UpdateUserInput } from './dtos/input/update-user.input';
import { DeleteUserInput } from './dtos/input/delete-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // for passport local strategy to validate user
  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsVal_id = await bcrypt.compare(password, user.password);
    if (!passwordIsVal_id) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  private async validateCreateUserRequest(request: CreateUserInput) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        email: request.email,
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async createUser(request: CreateUserInput) {
    await this.validateCreateUserRequest(request);
    const user = await this.usersRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
    return user;
  }

  async getUser(_id: string) {
    return this.usersRepository.findOne({ _id });
  }

  async getUsers(getUsersArgs: GetUsersArgs) {
    return this.usersRepository.find(getUsersArgs);
  }

  async updateUser(request: UpdateUserInput) {
    const updateRequst = { ...request };
    if (updateRequst.password) {
      updateRequst.password = await bcrypt.hash(updateRequst.password, 10);
    }
    const updatedUser = await this.usersRepository.findOneAndUpdate(
      { _id: request._id },
      updateRequst,
    );
    return updatedUser;
  }

  async deleteUser(request: DeleteUserInput) {
    return this.usersRepository.delete({ _id: request._id });
  }
}
