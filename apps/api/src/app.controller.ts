import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Body,
  UseGuards,
  Render,
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

  @Get()
  async index(@Res() res: Response, @CurrentUser() user?: User) {
    if (user) {
      res.redirect('/videos');
    }
    res.redirect('/login');
  }

  @Get('login')
  @Render('login')
  login() {
    return { google: this.google };
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
      return res.redirect('/videos');
    } catch (error) {
      console.log(error);
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

  @Get('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session?.destroy((err) => {
      if (err) {
        return res.send('Logout error');
      }
      res.clearCookie('connect.sid');
    });
    res.clearCookie('Authentication');
    res.redirect('/login');
  }

  @Get('video')
  @UseGuards(AuthGuard)
  async videoList(@Res() res: Response) {
    try {
      res.redirect('/videos');
    } catch (error) {
      console.log(error);
    }
  }

  @Get('upload')
  @UseGuards(AuthGuard)
  @Render('upload-video')
  upload(@CurrentUser() user: User) {
    return { user };
  }

  @Get('history')
  @UseGuards(AuthGuard)
  @Render('history')
  history(@CurrentUser() user: User) {
    return { user };
  }
}
