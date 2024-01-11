import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import { ObjectId } from 'mongodb';

@Injectable()
export class StorageService {
  async upload(
    file: Express.Multer.File,
    req: Request,
    // userId: string,
  ): Promise<any> {
    // TODO: Implement this method => 비디오 업로드 기능 추가
    // TODO: ? ?? 정리하기
    // TODO: file 업로드 기능 공통으로 빼기?
    // TODO: 멀티파트 파일 업로드
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
    // await this.videosService.createVideo({
    //   title: fileName,
    //   type: contentType,
    //   path,
    //   description: '',
    //   userId,
    // });
    return response.data;
  }
}
