import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserRequest } from './users/dtos/login-user.request';
import { User } from './users/models/user';
import { CurrentUser, LocalAuthGuard, GoogleGuard } from '@app/common';
import { ConfigService } from '@nestjs/config';

@ApiTags('API')
@Controller()
export class AppController {
  private readonly sessionAuth: boolean;
  constructor(configService: ConfigService) {
    this.sessionAuth = configService.get('SESSION_AUTH');
  }

  @Get()
  async index(@Res() res: Response, @CurrentUser() user?: User) {
    if (user) {
      return res.redirect('/videos');
    }
    res.redirect('/login');
  }

  @Get('login')
  login(@Res() res: Response, @Query('email') email?: string) {
    res.render('login', { email });
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
      if (!this.sessionAuth) {
        res.cookie('Authentication', user?.access_token, {
          maxAge: 60 * 60 * 1000,
        });
      }
      res.redirect('/videos');
    } catch (error) {
      res.render('login', { error: error.message });
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
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session?.destroy((error) => {
      if (error) {
        console.log(error);
      }
      res.redirect('/');
    });
    res.clearCookie('Authentication');
  }

  @Get('signup')
  getSignup(@Res() res: Response) {
    res.render('signup', {});
  }

  @Get('upload')
  upload(@Res() res: Response, @CurrentUser() user?: any) {
    if (!user) {
      return res.redirect('/');
    }
    res.render('upload-video', { isUpload: true, user });
  }
}
