import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Video } from './models/video';
import { CreateVideoInput } from './dtos/input/create-video.input';
import { NATS_SERVICE } from '@app/common';

@Resolver(() => Video)
export class VideosResolver {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}
  @Mutation(() => Video)
  CreateVideo(@Args('createVideoDto') createVideoDto: CreateVideoInput) {
    try {
      return this.natsClient.send({ cmd: 'createVideo' }, createVideoDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Query(() => Video, { nullable: true })
  getVideoById(@Args('id') id: string) {
    try {
      return this.natsClient.send({ cmd: 'getVideoById' }, { id });
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Query(() => [Video], { nullable: true })
  getVideos() {
    try {
      return this.natsClient.send({ cmd: 'getVideos' }, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
