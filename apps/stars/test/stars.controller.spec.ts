import { Test, TestingModule } from '@nestjs/testing';
import { StarsController } from '../src/stars.controller';
import { StarsService } from '../src/stars.service';
import { starStub } from './stubs/star.stub';
import { StarCreateRequestDto } from '../src/dto/star-create-request.dto';
import { Star } from '../src/star.entity';

jest.mock('../src/stars.service');

describe('StarsController', () => {
  let starsController: StarsController;
  let starsService: StarsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StarsController],
      providers: [StarsService],
    }).compile();

    starsController = app.get<StarsController>(StarsController);
    starsService = app.get<StarsService>(StarsService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let star: Star;

      beforeEach(async () => {
        star = await starsController.findOne(starStub().id);
      });

      test('then it should call starsService', () => {
        expect(starsService.findById).toHaveBeenCalledWith(starStub().id);
      });

      test('then it should return a star', () => {
        expect(star).toEqual(starStub());
      });
    });

    describe('findAll', () => {
      describe('when getStars is called ', () => {
        let stars: Star[];

        beforeEach(async () => {
          stars = await starsController.findAll();
        });

        test('then it should call starsService', () => {
          expect(starsService.findAll).toHaveBeenCalled();
        });

        test('then it should return stars', () => {
          expect(stars).toEqual([starStub()]);
        });
      });
    });

    describe('create', () => {
      describe('when create is called', () => {
        let star: Star;
        let request: StarCreateRequestDto;

        beforeEach(async () => {
          request = {
            firstName: starStub().firstName,
            lastName: starStub().lastName,
            isActive: starStub().isActive,
          };
          star = await starsController.create(request);
        });

        test('then it should call starsService', async () => {
          expect(starsService.createStar).toHaveBeenCalledWith(request);
        });

        test('then it should return a star', () => {
          expect(star).toEqual(starStub());
        });
      });
    });
  });
});
