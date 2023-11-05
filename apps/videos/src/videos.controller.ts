import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Query,
  Param,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoRequest } from './dto/create-video.request';
import { JwtAuthGuard } from '@app/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ObjectId } from 'mongodb';
import axios from 'axios';

@UseInterceptors(CacheInterceptor)
@Controller()
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async createVideo(@Body() request: CreateVideoRequest, @Req() req: any) {
    return this.videosService.create(request, req.headers?.authentication);
  }

  @Post('upload')
  // @UseGuards(JwtAuthGuard)
  async uploadFile(@Req() req: any, @Res() res: Response) {
    // const authentication = req.cookies?.Authentication as string;
    // console.log('Uploading video...', authentication);
    const fileName = req.headers['file-name'] as string;
    console.log('fileName', fileName);
    const videoId = new ObjectId(); // Creates a new unique ID for the video.
    const response = await axios({
      // Forwards the request to the storate microservice.
      method: 'POST',
      url: 'http://storage/upload',
      data: req,
      responseType: 'stream',
      headers: {
        'file-name': fileName.toString(),
        'content-type': req.headers['content-type'],
        id: videoId.toString(),
        // authorization: authentication.toString(),
      },
    });
    response.data.pipe(res);
    // return this.videosService.create(
    //   { title: fileName, path: videoId.toString() },
    //   authentication.toString(),
    // );
  }

  @Get('hello')
  async getHello() {
    return this.videosService.getHello();
  }

  @Get(':_id')
  // @UseGuards(JwtAuthGuard)
  async getVideo(@Param('_id') _id: string) {
    return this.videosService.getVideo({ _id });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getVideos() {
    return this.videosService.getVideos();
  }

  // test: /videos/get?url=https://jsonplaceholder.typicode.com/todos/1
  @Get('get')
  @UseGuards(JwtAuthGuard)
  async get(@Query('url') url: string): Promise<any[]> {
    return this.videosService.get(url);
  }

  @Get('error')
  @UseGuards(JwtAuthGuard)
  async error(): Promise<any> {
    return this.videosService.error();
  }
}
