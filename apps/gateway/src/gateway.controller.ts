import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Response } from 'express';
import { JwtAuthGuard } from '@app/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongodb';
import axios from 'axios';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('upload')
  index(@Res() res: Response) {
    res.render('upload-video', {});
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Req() req: any,
  ) {
    const authentication = req.cookies?.Authentication as string;
    const fileName = file.originalname;
    const fileType = file.mimetype;
    const videoId = new ObjectId().toString();

    const response = await axios({
      // Forwards the request to the video-upload microservice.
      method: 'POST',
      url: 'http://storage/upload',
      data: file,
      responseType: 'stream',
      headers: {
        'file-name': fileName,
        'content-type': fileType,
        authentication,
        videoId,
      },
    });
    response.data.pipe(res).on('finish', async () => {
      await axios({
        method: 'POST',
        url: 'http://videos',
        data: { title: fileName, path: videoId },
        headers: {
          authentication,
        },
      });
    });
  }
}
