import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { CreateVideoInput } from './dtos/input/create-video.input';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from './videos.service';
import { ObjectId } from 'mongodb';
import { lastValueFrom } from 'rxjs';
import { CurrentUser } from '@app/common';
import { Video } from './models/video';
import { CreateHistoryInput } from '../history/dtos/create-history.input';
import { HistoryService } from '../history/history.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly histotyService: HistoryService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async list(@Res() res: Response, @CurrentUser() user?: any) {
    if (!user) {
      return res.redirect('/');
    }
    const videos = await lastValueFrom(
      this.videosService.getVideos({ userId: user.id }),
    );
    return res.render('video-list', { isVideos: true, videos, user });
  }

  @Get(':_id')
  async playVideo(
    @Res() res: Response,
    @Param('_id') _id: string,
    @CurrentUser() user: any,
  ) {
    const video = await lastValueFrom(this.videosService.getVideoById(_id));
    this.updateHistory(video, user.id);

    const env = this.configService.get('NODE_ENV');
    const port = this.configService.get('PORT');
    const base_url = this.configService.get('BASE_URL');
    const baseUrl =
      env === 'production' ? base_url : `http://localhost:${port}`;
    video.path = `${baseUrl}/uploads/videos/${video.path}`;
    res.render('play-video', { isVideos: true, video, user });
  }

  async updateHistory(video: Video, userId: string) {
    const createHistoryInput: CreateHistoryInput = {
      videoId: video._id.toString(),
      title: video.title,
      userId,
    };
    this.histotyService.createHistory(createHistoryInput);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res: Response,
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
      res.render('upload-video', { isUpload: true, user, videoCreate });
    }
  }
}
