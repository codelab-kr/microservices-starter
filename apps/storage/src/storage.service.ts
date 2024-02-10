import { Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { createWriteStream } from 'fs';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class StorageService {
  uploadVideo(req: any, res: any) {
    console.log('Uploading video...');
    const contentType = req.headers['content-type'].toString();
    const uploadPath = this.getUploadPath(contentType);
    const path = req.headers.path.toString();
    const localFilePath = join(uploadPath, path);
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

  getUploadPath = (contentType: string): string => {
    let uploadPath: string;
    console.log('contentType', contentType);
    console.log('__dirname', __dirname);
    if (contentType.match(/\/(mp4)$/)) {
      uploadPath = resolve('./public/uploads/videos');
    } else if (contentType.match(/\/(jpg|jpeg|png)$/)) {
      uploadPath = resolve('./public/uploads/images');
    } else {
      uploadPath = resolve('./public/uploads/files');
    }
    if (!existsSync(uploadPath)) {
      console.log('uploadPath', uploadPath);
      mkdirSync(uploadPath, { recursive: true });
    }
    return uploadPath;
  };
}
