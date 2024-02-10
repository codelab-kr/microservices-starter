import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '@app/common';
import { CreateVideoInput } from './dtos/input/create-video.input';

@Injectable()
export class VideosService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  createVideo(createVideoInput: CreateVideoInput) {
    try {
      return this.natsClient.send({ cmd: 'createVideo' }, createVideoInput);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  getVideos(data: any) {
    try {
      return this.natsClient.send({ cmd: 'getVideos' }, data);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  getVideoById(_id: string) {
    try {
      return this.natsClient.send({ cmd: 'getVideoById' }, _id);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async upload(
    file: Express.Multer.File,
    createVideoInput: CreateVideoInput,
  ): Promise<any> {
    // TODO: file 업로드 기능 공통으로 빼기 ?
    // TODO: 멀티파트 파일 업로드 ?

    const { title, type, path } = createVideoInput;

    console.log('createVideoInput', createVideoInput);
    const response = await axios({
      method: 'POST',
      url: 'http://storage/upload',
      data: file.buffer,
      responseType: 'stream',
      headers: {
        'file-name': title,
        'content-type': type,
        path,
      },
    });
    return response;
  }
}
