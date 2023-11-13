import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckAuthGuard, JwtAuthGuard } from '@app/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserRequest } from './dto/login-user.request';
import { CurrentUser } from 'apps/auth/src/current-user.decorator';
import { User } from 'apps/auth/src/users/schemas/user.schema';
import axios from 'axios';

@Controller()
@ApiTags('Gateway API')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @UseGuards(CheckAuthGuard)
  @Get()
  async index(
    @Req() req: Request,
    @Res() res: Response,
    @CurrentUser() user?: User,
  ) {
    if (user) {
      res.render('video-list', { user });
    } else {
      res.render('login', {});
    }
  }

  @Get('login')
  login(@Res() res: Response) {
    res.render('login', {});
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  videoList(@Res() res: Response, @CurrentUser() user: User) {
    res.render('video-list', { user });
  }

  @UseGuards(JwtAuthGuard)
  @Get('upload')
  upload(@Res() res: Response, @CurrentUser() user: User) {
    res.render('upload-video', { user });
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  history(@Res() res: Response, @CurrentUser() user: User) {
    res.render('history', { user });
  }

  @Post('login')
  async loginSubmit(@Body() data: LoginUserRequest, @Res() res: Response) {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://auth/login',
        data,
      });
      res.setHeader('set-cookie', response.headers['set-cookie'].toString());
      res.render('video-list', { user: response.data });
    } catch (error) {
      res.render('login', { error: error.response.data.message });
    }
  }

  /*
   * Added for postman test
   * - @UseInterceptors(FileInterceptor('file'))
   * - @UploadedFile() file: Express.Multer.File,
   * - file?.buffer, file?.originalname, file?.mimetype
   */
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    const data = file?.buffer ?? req;
    const fileName = file?.originalname ?? (req.headers['file-name'] as string);
    const contentType =
      file?.mimetype ?? (req.headers['content-type'] as string);
    const path = new ObjectId().toString();
    const response = await axios({
      method: 'POST',
      url: 'http://storage/upload',
      data,
      responseType: 'stream',
      headers: {
        'file-name': fileName,
        'content-type': contentType,
        path,
      },
    });
    await response.data.pipe(res);
    await this.gatewayService.createVideo({
      title: fileName,
      type: contentType,
      path,
      description: 'test',
      user_id: user._id as ObjectId,
    });
  }
}
