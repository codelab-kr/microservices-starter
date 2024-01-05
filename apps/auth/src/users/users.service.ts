import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repositories/users.repository';
import { UpdateUserDto } from './dtos/update.user.dto';
import { DeleteUserDto } from './dtos/delete.user.dto';
import { User } from '../models/user';
import { CreateUserDto } from './dtos/create.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(request: CreateUserDto) {
    await this.validateCreateUserRequest(request);
    const user = {
      ...request,
      password: await bcrypt.hash(request.password, 10),
    };
    return await this.usersRepository.save(user);
  }

  async getUserById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async getUsers() {
    return this.usersRepository.find({ relations: ['payments'] });
  }

  async updateUser(request: UpdateUserDto) {
    const updateRequst = { ...request };
    if (updateRequst.password) {
      updateRequst.password = await bcrypt.hash(updateRequst.password, 10);
    }
    const updatedUser = await this.usersRepository.update(
      request.id,
      updateRequst,
    );
    return updatedUser;
  }

  async deleteUser(request: DeleteUserDto) {
    return this.usersRepository.delete({ id: request.id });
  }

  // for passport local strategy to validate user
  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });
    const passwordIsVal_id = await bcrypt.compare(password, user.password);
    if (!passwordIsVal_id) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  private async validateCreateUserRequest(request: CreateUserDto) {
    let user: User;
    try {
      user = await this.usersRepository.findOneBy({
        email: request.email,
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }
}
