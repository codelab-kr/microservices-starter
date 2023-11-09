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
import { JwtAuthGuard } from '@app/common';
import axios from 'axios';
import { CurrentUser } from 'apps/auth/src/current-user.decorator';
import { User } from 'apps/auth/src/users/schemas/user.schema';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('login')
  login(@Res() res: Response) {
    res.render('login', {});
  }

  @Post('login')
  async loginSubmit(@Body() formData: any, @Res() res: Response) {
    const response = await axios({
      method: 'POST',
      url: 'http://auth/login',
      data: formData,
    });

    const cookies = response.headers['set-cookie']
      .values()
      .next()
      .value.cookie.split(';');
    const access_token = cookies[0].split('=')[1];
    const expires = cookies[2].split('=')[1];

    res.cookie('Authentication', access_token, {
      expires: new Date(expires),
    });
    res.redirect('upload');
  }

  @Get('upload')
  upload(@Res() res: Response) {
    res.render('upload-video', {});
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
