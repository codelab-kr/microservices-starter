import { Controller, Post, Req, Res } from '@nestjs/common';
import { StorageService } from './storage.service';
import { Request, Response } from 'express';

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('/upload')
  UploadVideo(@Req() req: Request, @Res() res: Response) {
    console.log('Uploading video...');

    this.storageService.uploadVideo(req, res);
  }
}
