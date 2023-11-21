import { NotFoundException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { isEmpty } from '@app/common';
import { UsersMessage } from './users.message';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * 회원를 생성한다.
   *
   * @param {UserCreateRequestDto} requestDto - 회원 생성 Dto
   * @returns {Promise<User>}
   */
  async createUser(requestDto: UserCreateRequestDto): Promise<User> {
    return this.usersRepository.save(requestDto);
  }

  /**
   * 모든 회원 정보를 조회한다.
   *
   * @returns {Promise<User[]>}
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 조회한다.
   *
   * @param {number} id - 회원 Id
   * @returns {Promise<UserResponseDto>}
   */
  async findById(id: number): Promise<User> {
    const user = await this.findUserById(id);
    return user;
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 수정한다.
   *
   * @param {number} id - 회원 Id
   * @param {UserUpdateRequestDto} requestDto - 회원 수정 Dto
   * @returns {Promise<User>}
   */
  async updateUser(requestDto: UserUpdateRequestDto): Promise<User> {
    const user = await this.findUserById(requestDto.id);
    const { isActive } = requestDto;
    const updateUser = { ...user, isActive };
    return this.usersRepository.save(updateUser);
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 반환한다.
   *
   * @param {number} id - 회원 Id
   * @returns {Promise<User>}
   * @private
   */
  private async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (isEmpty(user) === true) {
      throw new NotFoundException(UsersMessage.NOT_FOUND_USER);
    }

    return user;
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 삭제한다.
   *
   * @param {number} id - 회원 Id
   * @returns {Promise<void>}
   */
  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
