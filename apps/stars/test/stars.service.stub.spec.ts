import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { StarsService } from '../src/stars.service';
import { StarsRepository } from '../src/stars.repository';
import { StarCreateRequestDto } from '../src/dto/star-create-request.dto';
import { StarUpdateRequestDto } from '../src/dto/star-update-request.dto';
import { Star } from '../src/star.entity';
import { starStub } from './stubs/star.stub';

describe('StarsService (Stub)', () => {
  let starsService: StarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarsService, StarsRepository],
    }).compile();
    starsService = module.get<StarsService>(StarsService);
  });

  describe('createStar', () => {
    describe('when createStar is called', () => {
      let star: Star;
      let saveSpy: jest.SpyInstance;

      const request = new StarCreateRequestDto();
      request.firstName = starStub().firstName;
      request.lastName = starStub().lastName;
      request.isActive = starStub().isActive;

      beforeEach(async () => {
        saveSpy = jest
          .spyOn(StarsRepository.prototype, 'save')
          .mockResolvedValue(starStub());
        star = await starsService.createStar(request);
      });

      test('then it should call starRepository', async () => {
        expect(saveSpy).toHaveBeenCalledWith(request);
      });

      test('then it should return a star', () => {
        expect(star).toEqual(starStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let stars: Star[];
      let findSpy: jest.SpyInstance;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(StarsRepository.prototype, 'find')
          .mockResolvedValue([starStub()]);
        stars = await starsService.findAll();
      });

      test('then it should call starRepository', async () => {
        expect(findSpy).toHaveBeenCalled();
      });

      test('then it should return stars', () => {
        expect(stars).toStrictEqual([starStub()]);
      });
    });
  });

  describe('findById', () => {
    describe('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', () => {
      let findSpy: jest.SpyInstance;
      const id = 1;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(StarsRepository.prototype, 'findOne')
          .mockResolvedValue(undefined);
      });

      test('then it should return NotFoundException', async () => {
        await expect(starsService.findById(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      test('then it should call starRepository', async () => {
        try {
          await starsService.findById(id);
        } catch (error) {
          expect(findSpy).toHaveBeenCalledWith({ where: { id } });
        }
      });

      describe('생성된 유저의 id가 주어진다면 해당 id의 유저를 반환한다', () => {
        let star: Star;
        let findSpy: jest.SpyInstance;
        const id = 1;

        beforeEach(async () => {
          findSpy = jest
            .spyOn(StarsRepository.prototype, 'findOne')
            .mockResolvedValue(starStub());
          star = await starsService.findById(id);
        });

        test('then it should call starRepository', async () => {
          expect(findSpy).toHaveBeenCalledWith({ where: { id } });
        });

        test('then it should return a star', async () => {
          expect(star).toEqual(starStub());
        });
      });

      describe('updateStar', () => {
        describe('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', () => {
          let findSpy: jest.SpyInstance;
          const requestDto: StarUpdateRequestDto = {
            id: 1,
            isActive: false,
          };

          beforeEach(async () => {
            findSpy = jest
              .spyOn(StarsRepository.prototype, 'findOne')
              .mockResolvedValue(undefined);
          });

          test('then it should return NotFoundException', async () => {
            await expect(starsService.updateStar(requestDto)).rejects.toThrow(
              NotFoundException,
            );
          });

          test('then it should call starRepository', async () => {
            try {
              await starsService.findById(requestDto.id);
            } catch (error) {
              expect(findSpy).toHaveBeenCalledWith({
                where: { id: requestDto.id },
              });
            }
          });
        });

        describe('생성된 유저의 id가 주어진다면 해당 id의 유저를 수정하고 수정된 유저를 반환한다', () => {
          let star: Star;
          let findSpy: jest.SpyInstance;
          let saveSpy: jest.SpyInstance;
          const request: StarUpdateRequestDto = {
            id: 1,
            isActive: false,
          };

          beforeEach(async () => {
            findSpy = jest
              .spyOn(StarsRepository.prototype, 'findOne')
              .mockResolvedValue(starStub());
            saveSpy = jest
              .spyOn(StarsRepository.prototype, 'save')
              .mockResolvedValue(starStub());
            star = await starsService.updateStar(request);
          });

          test('then it should call starRepository', async () => {
            expect(findSpy).toHaveBeenCalledWith({ where: { id } });
            expect(saveSpy).toHaveBeenCalledWith({
              ...starStub(),
              ...request,
            });
          });

          test('then it should return a star', async () => {
            expect(star).toEqual(starStub());
          });
        });
      });

      describe('deleteStar', () => {
        describe('생성된 유저의 id가 주어진다면 생성된 유저를 삭제한다', () => {
          const id = 1;
          let deleteSpy: jest.SpyInstance;
          let result: void;

          beforeEach(async () => {
            deleteSpy = jest
              .spyOn(StarsRepository.prototype, 'delete')
              .mockResolvedValue({} as DeleteResult);
            result = await starsService.deleteStar(id);
          });

          test('then it should call starRepository', async () => {
            expect(deleteSpy).toHaveBeenCalledWith(id);
          });

          test('then it should return undefined', () => {
            expect(result).toBeUndefined();
          });
        });
      });
    });
  });
});
