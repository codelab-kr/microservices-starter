import {
  Body,
  Controller,
  Post,
  Render,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @Render('upload-video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() user: any,
  ) {
    const uploadedFile = { filename: file.originalname };
    const result = await this.storageService.upload(
      file,
      req,
      // user.userId
    );

    if (result) {
      return { user, uploadedFile };
    }
  }
}
