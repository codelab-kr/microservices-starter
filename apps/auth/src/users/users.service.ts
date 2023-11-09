import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schemas/user.schema';
import { Types } from 'mongoose';
import { UpdateUserRequest } from './dto/update-user.request';

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

  private async validateCreateUserRequest(request: CreateUserRequest) {
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

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);
    const user = await this.usersRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
    return user;
  }

  async getUser(_id: string) {
    return this.usersRepository.findOne({
      id: _id as unknown as Types.ObjectId,
    });
  }

  async getUsers(getUserArgs: Partial<User>): Promise<User[]> {
    return this.usersRepository.find(getUserArgs);
  }

  async updateUser(_id: string, request: UpdateUserRequest) {
    const updatedUser = await this.usersRepository.findOneAndUpdate(
      { _id: _id as unknown as Types.ObjectId },
      request,
    );
    return updatedUser;
  }

  async deleteUser(_id: string) {
    return this.usersRepository.delete({
      _id: _id as unknown as Types.ObjectId,
    });
  }
}
