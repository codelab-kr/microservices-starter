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
import { CurrentUser } from '@app/common';
import { Video } from './models/video';
import { CreateHistoryInput } from '../history/dtos/input/create-history.input';
import { HistoryService } from '../history/history.service';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly histotyService: HistoryService,
  ) {}

  @Get()
  @Render('video-list')
  async list(@CurrentUser() user: any) {
    const videos = await lastValueFrom(this.videosService.getVideos());
    return { videos, user };
  }

  @Get(':_id')
  @Render('play-video')
  async playVideo(@Param('_id') _id: string, @CurrentUser() user: any) {
    const video = (await lastValueFrom(this.videosService.getVideo(_id)))[0];
    const baseUrl = global[Symbol.for('BaseUrl')];
    video.path = `${baseUrl}/uploads/videos/${video.path}`;
    this.updateHistory(video, user.id);
    return { video, user };
  }

  async updateHistory(video: Video, userId: string) {
    const createHistoryInput: CreateHistoryInput = {
      videoId: video._id.toString(),
      title: video.title,
      userId,
    };
    await lastValueFrom(this.histotyService.createHistory(createHistoryInput));
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
