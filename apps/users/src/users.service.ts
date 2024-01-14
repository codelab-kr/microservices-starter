import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repositories/users.repository';
import { UpdateUserDto } from './dtos/update.user.dto';
import { DeleteUserDto } from './dtos/delete.user.dto';
import { CreateUserDto } from './dtos/create.user.dto';

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

  async getUserById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['payments'],
    });
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
      updateRequst.id,
      updateRequst,
    );
    return updatedUser;
  }

  async deleteUser(request: DeleteUserDto) {
    return this.usersRepository.softDelete({ id: request.id });
  }

  async validateUser(data: any) {
    // for passport-jwt strategy to validate user
    if (data.userId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = await this.usersRepository.findOneBy({
        id: data.userId,
      });
      if (!userInfo) {
        return null;
      }
      return userInfo;
    }

    // for passport-local strategy to validate user
    const { email, password } = data;
    const { password: hashedPassword, ...userInfo } =
      await this.usersRepository.findOneBy({ email });
    if (!userInfo) {
      return null;
    }
    const passwordIsVal = await bcrypt.compare(password, hashedPassword);
    if (!passwordIsVal) {
      return null;
    }
    return userInfo;
  }

  async getOrSaveUser(data: CreateUserDto) {
    const foundUser = await this.getUserByEmail(data.email);
    if (foundUser) {
      return foundUser;
    }
    return this.usersRepository.save(data);
  }
}
