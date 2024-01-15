// import { ClientProxy } from '@nestjs/microservices';
import { Resolver } from '@nestjs/graphql';
// import { Inject } from '@nestjs/common';
import { Video } from './models/video';
// import { CreateVideoInput } from './dtos/input/create-video.input';
// import { NATS_SERVICE } from '@app/common';

@Resolver(() => Video)
export class VideosResolver {
  // constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}
  // @Mutation(() => Video)
  // CreateVideo(@Args('createVideoDto') createVideoDto: CreateVideoInput) {
  //   return this.natsClient.send({ cmd: 'createVideo' }, createVideoDto);
  // }
  // @Query(() => Video, { nullable: true })
  // getVideoById(@Args('id') id: string) {
  //   return this.natsClient.send({ cmd: 'getVideoById' }, { id });
  // }
  // @Query(() => [Video], { nullable: true })
  // getVideos() {
  //   return this.natsClient.send({ cmd: 'getVideos' }, {});
  // }
}
