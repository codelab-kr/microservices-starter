import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { RmqService } from '@app/common';
import { RmqContext } from '@nestjs/microservices';

describe('HistoryController', () => {
  let historyController: HistoryController;
  let historyService: HistoryService;
  let rmqService: RmqService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [
        HistoryService,
        {
          provide: RmqService,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    historyController = app.get<HistoryController>(HistoryController);
    historyService = app.get<HistoryService>(HistoryService);
    rmqService = app.get<RmqService>(RmqService);
  });

  describe('handleVideoCreated', () => {
    it('should call historyService.create with the correct arguments', async () => {
      const data = { id: 1, name: 'John Doe' };
      const context: RmqContext = {} as RmqContext;
      const createSpy = jest.spyOn(historyService, 'create');

      await historyController.handleVideoCreated(data, context);

      expect(createSpy).toHaveBeenCalledWith(data);
    });

    it('should call rmqService.publish with the correct arguments', async () => {
      const data = { id: 1, name: 'John Doe' };
      const context: RmqContext = {} as RmqContext;
      const publishSpy = jest.spyOn(rmqService, 'ack');

      await historyController.handleVideoCreated(data, context);

      expect(publishSpy).toHaveBeenCalledWith('video_created', data);
    });
  });
});
