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
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserRequest } from './users/dtos/login-user.request';
import axios from 'axios';
import { User } from './users/models/user';
import { CurrentUser, LocalAuthGuard, AuthGuard } from '@app/common';
import { ConfigService } from '@nestjs/config';
@Controller()
@ApiTags('API')
export class AppController {
  session: boolean;
  constructor(private readonly configService: ConfigService) {
    this.session = configService.get('SESSION'); // boolean type
  }
  @Get()
  async index(@Res() res: Response, @CurrentUser() user?: User) {
    console.log('user', user);
    if (user) {
      res.redirect('/videos');
    } else {
      res.redirect('/login');
    }
  }

  @Get('login')
  login(@Res() res: Response) {
    res.render('login', {});
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginSubmit(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _data: LoginUserRequest,
    @CurrentUser() user: any,
  ) {
    try {
      if (!this.session) {
        res.cookie('Authentication', user?.access_token, {
          maxAge: 60 * 60 * 1000,
        });
      }
      res.redirect('/videos');
    } catch (error) {
      res.render('login', {
        error: error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session?.destroy((err) => {
      if (err) {
        return res.send('Logout error');
      }
      res.clearCookie('connect.sid');
    });
    res.clearCookie('Authentication');
    res.render('login', {});
  }

  @UseGuards(AuthGuard)
  @Get('videos')
  async videoList(@Res() res: Response, @CurrentUser() user: User) {
    try {
      res.render('video-list', { user, videos: [] });
    } catch (error) {
      res.render('video-list', { error: error.response.data.message });
    }
  }

  @UseGuards(AuthGuard)
  @Get('videos/:_id')
  async video(
    @Res() res: Response,
    @CurrentUser() user: User,
    @Param('_id') _id: string,
  ) {
    try {
      const video = (await axios.get(`http://videos/${_id}`)).data[0];
      res.render('play-video', { user, video });
    } catch (error) {
      res.render('play-video', { error: error.response.data.message });
    }
  }

  @UseGuards(AuthGuard)
  @Get('upload')
  upload(@Res() res: Response, @CurrentUser() user: User) {
    res.render('upload-video', { user });
  }

  /*
   * Added for postman test
   * - @UseInterceptors(FileInterceptor('file'))
   * - @UploadedFile() file: Express.Multer.File,
   * - file?.buffer, file?.originalname, file?.mimetype
   */
  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    // @CurrentUser() user: User,
  ) {
    const data = file?.buffer ?? req;
    const fileName = file?.originalname ?? (req.headers['file-name'] as string);
    const contentType =
      file?.mimetype ?? (req.headers['content-type'] as string);
    // const path = new ObjectId().toString();
    const response = await axios({
      method: 'POST',
      url: 'http://storage/upload',
      data,
      responseType: 'stream',
      headers: {
        'file-name': fileName,
        'content-type': contentType,
        // path,
      },
    });
    await response.data.pipe(res);
    // await this.gatewayService.createVideo({
    //   title: fileName,
    //   type: contentType,
    //   path,
    //   description: 'test',
    //   user_id: user._id as ObjectId,
    // });
  }

  @UseGuards(AuthGuard)
  @Get('history')
  history(@Res() res: Response, @CurrentUser() user: User) {
    res.render('history', { user });
  }
}
