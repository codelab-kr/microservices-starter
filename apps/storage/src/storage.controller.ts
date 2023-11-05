import { Controller, Post, Req, Res } from '@nestjs/common';
import { StorageService } from './storage.service';
import { Request, Response } from 'express';
import * as path from 'path';
import { createWriteStream } from 'fs';

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('/upload')
  UploadVideo(@Req() req: Request, @Res() res: Response) {
    console.log('Uploading video... Mockstorage!');
    console.log('req.headers', req.headers);
    const videoId = req.headers.videoid as string;
    console.log('videoId', videoId);
    const localFilePath = path.join(__dirname, '..', 'videos', videoId);
    console.log('localFilePath', localFilePath);
    const fileWriteStream = createWriteStream(localFilePath);
    req
      .pipe(fileWriteStream)
      .on('error', (err) => {
        console.error('Upload failed.');
        console.error((err && err.stack) || err);
      })
      .on('finish', () => {
        res.sendStatus(200);
      });
  }
}
