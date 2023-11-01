import { Test, TestingModule } from '@nestjs/testing';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';
import { RmqService } from '@app/common';
import { RmqContext } from '@nestjs/microservices';

describe('MetadataController', () => {
  let metadataController: MetadataController;
  let metadataService: MetadataService;
  let rmqService: RmqService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MetadataController],
      providers: [
        MetadataService,
        {
          provide: RmqService,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    metadataController = app.get<MetadataController>(MetadataController);
    metadataService = app.get<MetadataService>(MetadataService);
    rmqService = app.get<RmqService>(RmqService);
  });

  describe('handleVideoCreated', () => {
    it('should call metadataService.create with the correct arguments', async () => {
      const data = { id: 1, name: 'John Doe' };
      const context: RmqContext = {} as RmqContext;
      const createSpy = jest.spyOn(metadataService, 'create');

      await metadataController.handleVideoCreated(data, context);

      expect(createSpy).toHaveBeenCalledWith(data);
    });

    it('should call rmqService.publish with the correct arguments', async () => {
      const data = { id: 1, name: 'John Doe' };
      const context: RmqContext = {} as RmqContext;
      const publishSpy = jest.spyOn(rmqService, 'ack');

      await metadataController.handleVideoCreated(data, context);

      expect(publishSpy).toHaveBeenCalledWith('video_created', data);
    });
  });
});
