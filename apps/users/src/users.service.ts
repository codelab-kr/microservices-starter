import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from './repositories/users.repository';
import { UpdateUserDto } from './dtos/update.user.dto';
import { CreateUserDto } from './dtos/create.user.dto';
import { isEmpty } from 'class-validator';
import { UsersMessage } from '@app/common';
import { User } from './models/user';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(request: CreateUserDto) {
    await this.validateCreateUserRequest(request);
    try {
      const seveUser = await this.usersRepository.save({
        ...request,
        password: await bcrypt.hash(request.password, 10),
      });
      if (!seveUser) {
        throw new InternalServerErrorException(UsersMessage.CANNOT_CREATE_USER);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = seveUser;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async validateCreateUserRequest(request: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({
      email: request.email,
    });

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async getUsers() {
    return this.usersRepository.find({ relations: ['payments'] });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (isEmpty(user) === true) {
      throw new UnprocessableEntityException(UsersMessage.NOT_FOUND_USER);
    }

    return user;
  }

  async updateUser(request: UpdateUserDto) {
    const user = await this.getUserById(request.id);
    const updateRequst = { ...user, ...request };
    if (request.password) {
      updateRequst.password = await bcrypt.hash(request.password, 10);
    }
    const updatedResult = await this.usersRepository.update(
      updateRequst.id,
      updateRequst,
    );

    return updatedResult;
  }

  async deleteUser(id: string) {
    const deletedResult = await this.usersRepository.softDelete({ id });
    return deletedResult;
  }

  async validateUser(data: any) {
    // for passport-jwt strategy to validate user
    if (data.userId) {
      const user = await this.usersRepository.findOneBy({
        id: data.userId,
      });
      if (!user) {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = user;
      return userInfo;
    }

    // for passport-local strategy to validate user
    if (data.email && data.password) {
      const { email, password } = data;
      const user = await this.usersRepository.findOneBy({ email });
      const { password: hashedPassword, ...userInfo } = user;
      if (!user) {
        return null;
      }
      const passwordIsVal = await bcrypt.compare(password, hashedPassword);
      if (!passwordIsVal) {
        return null;
      }
      return userInfo;
    }
  }

  async getOrSaveUser(data: CreateUserDto) {
    const foundUser = await this.getUserByEmail(data.email);
    if (foundUser) {
      return foundUser;
    }
    return this.usersRepository.save(data);
  }
}
