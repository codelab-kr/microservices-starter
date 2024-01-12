import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateVideoInput } from './dtos/input/create-video.input';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from './videos.service';
import { ObjectId } from 'mongodb';
import { lastValueFrom } from 'rxjs';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getVideos() {
    return this.videosService.getVideos();
  }

  @Get(':_id')
  getVideo(@Param('_id') _id: string) {
    return this.videosService.getVideo(_id);
  }

  @Post('upload')
  @Render('upload-video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() user: any,
  ) {
    const { originalname: title, mimetype: type } = file;
    const path = new ObjectId().toString();
    const userId = user.userId;

    const createVideoInput: CreateVideoInput = {
      title,
      type,
      path,
      userId,
    };

    const response = await this.videosService.upload(file, createVideoInput);

    if (response.status === 200) {
      const videoCreate = await lastValueFrom(
        this.videosService.createVideo(createVideoInput),
      );
      return { user, videoCreate };
    }
  }
}
