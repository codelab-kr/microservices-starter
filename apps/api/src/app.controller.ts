import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserRequest } from './users/dtos/login-user.request';
import { User } from './users/models/user';
import {
  CurrentUser,
  LocalAuthGuard,
  AuthGuard,
  GoogleGuard,
} from '@app/common';
import { ConfigService } from '@nestjs/config';

@Controller()
@ApiTags('API')
export class AppController {
  session: boolean;
  google: boolean;
  constructor(configService: ConfigService) {
    this.session = configService.get('SESSION'); // boolean type
    this.google = configService.get('GOOGLE'); // boolean type
  }

  // TODO: use @Render('upload-video') instead of @Res() res: Response
  @Get()
  async index(@Res() res: Response, @CurrentUser() user?: User) {
    if (user) {
      res.redirect('/videos');
    } else {
      res.redirect('/login');
    }
  }

  @Get('login')
  login(@Res() res: Response) {
    res.render('login', { google: this.google });
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginSubmit(
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

  @Get('google-auth')
  @UseGuards(GoogleGuard)
  googleAuth() {}

  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Res() res: Response, @CurrentUser() user: any) {
    if (user) res.redirect('/videos');
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
  @Get('upload')
  upload(@Res() res: Response, @CurrentUser() user: User) {
    res.render('upload-video', { user });
  }

  @UseGuards(AuthGuard)
  @Get('history')
  history(@Res() res: Response, @CurrentUser() user: User) {
    res.render('history', { user });
  }
}
