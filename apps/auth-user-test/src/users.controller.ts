import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
@ApiTags('회원 API')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: '모든 회원 조회 API' })
  @ApiOkResponse({ description: '모든 회원를 조회한다.', type: User })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: '회원 조회 API' })
  @ApiOkResponse({ description: '회원을 조회한다.', type: User })
  async findOne(@Param('id') id: number) {
    return await this.userService.findById(+id);
  }

  @Post()
  @ApiOperation({ summary: '회원 생성 API', description: '회원를 생성한다.' })
  @ApiCreatedResponse({ description: '회원를 생성한다.', type: User })
  async create(@Body() requestDto: UserCreateRequestDto) {
    return await this.userService.createUser(requestDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: '회원 삭제 API', description: '회원을 삭제한다.' })
  @ApiCreatedResponse({ description: '회원를 생성한다.', type: User })
  async delete(@Param('id') id: number) {
    return await this.userService.deleteUser(+id);
  }
}
