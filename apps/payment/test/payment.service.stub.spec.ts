import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { PaymentService } from '../src/payment.service';
import { PaymentRepository } from '../src/repositories/payment.repository';
import { Payment } from '../src/models/payment';
import { paymenttub } from './stubs/payment.stub';
import { CreatePaymentInput } from '../src/utils/create.payment.input';
import { UpdatePaymentInput } from '../src/utils/update.payment.ipnput';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paymentettings } from '../src/models/payment.settings';
import { PaymentModule } from '../src/payment.module';

describe('PaymentService (Stub)', () => {
  let paymentService: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Payment, Paymentettings],
          autoLoadEntities: true,
          synchronize: true,
        }),
        PaymentModule,
      ],
    }).compile();
    paymentService = module.get<PaymentService>(PaymentService);
  });

  describe('createPayment', () => {
    describe('when createPayment is called', () => {
      let payment: Payment;
      let saveSpy: jest.SpyInstance;

      const request = new CreatePaymentInput();
      request.title = paymenttub().title;
      request.content = paymenttub().content;
      request.userId = paymenttub().userId;

      beforeEach(async () => {
        saveSpy = jest
          .spyOn(PaymentRepository.prototype, 'save')
          .mockResolvedValue(paymenttub());
        payment = await paymentService.createPayment(request);
        console.log('payment', payment);
      });

      test('then it should call paymentRepository', async () => {
        expect(saveSpy).toHaveBeenCalledWith(request);
      });

      test('then it should return a payment', () => {
        expect(payment).toEqual(paymenttub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let payment: Payment[];
      let findSpy: jest.SpyInstance;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PaymentRepository.prototype, 'find')
          .mockResolvedValue([paymenttub()]);
        payment = await paymentService.findAll();
      });

      test('then it should call paymentRepository', async () => {
        expect(findSpy).toHaveBeenCalled();
      });

      test('then it should return payment', () => {
        expect(payment).toStrictEqual([paymenttub()]);
      });
    });
  });

  describe('findById', () => {
    describe('생성되지 않은 PAYMENT의 id가 주어진다면 PAYMENT를 찾을 수 없다는 예외를 던진다', () => {
      let findSpy: jest.SpyInstance;
      const id = 1;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PaymentRepository.prototype, 'findOne')
          .mockResolvedValue(undefined);
      });

      test('then it should return NotFoundException', async () => {
        await expect(paymentService.findById(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      test('then it should call paymentRepository', async () => {
        try {
          await paymentService.findById(id);
        } catch (error) {
          expect(findSpy).toHaveBeenCalledWith({
            where: { id },
            relations: ['settings'],
          });
        }
      });
    });

    describe('생성된 PAYMENT의 id가 주어진다면 해당 id의 PAYMENT를 반환한다', () => {
      let payment: Payment;
      let findSpy: jest.SpyInstance;
      const id = 1;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PaymentRepository.prototype, 'findOne')
          .mockResolvedValue(paymenttub());
        payment = await paymentService.findById(id);
      });

      test('then it should call paymentRepository', async () => {
        expect(findSpy).toHaveBeenCalledWith({
          where: { id },
          relations: ['settings'],
        });
      });

      test('then it should return a payment', async () => {
        expect(payment).toEqual(paymenttub());
      });
    });
  });

  describe('updatePayment', () => {
    describe('생성되지 않은 PAYMENT의 id가 주어진다면 PAYMENT를 찾을 수 없다는 예외를 던진다', () => {
      let findSpy: jest.SpyInstance;
      const requestDto: UpdatePaymentInput = {
        id: 11,
        userId: 1,
      };

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PaymentRepository.prototype, 'findOne')
          .mockResolvedValue(undefined);
      });

      test('then it should return NotFoundException', async () => {
        await expect(paymentService.updatePayment(requestDto)).rejects.toThrow(
          NotFoundException,
        );
      });

      test('then it should call paymentRepository', async () => {
        try {
          await paymentService.findById(requestDto.id);
        } catch (error) {
          expect(findSpy).toHaveBeenCalledWith({
            where: { id: requestDto.id },
            relations: ['settings'],
          });
        }
      });
    });

    describe('생성된 PAYMENT의 id가 주어진다면 해당 id의 PAYMENT를 수정하고 수정된 PAYMENT를 반환한다', () => {
      let payment: Payment;
      let findSpy: jest.SpyInstance;
      let saveSpy: jest.SpyInstance;
      const request: UpdatePaymentInput = {
        id: 1,
        userId: 1,
      };

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PaymentRepository.prototype, 'findOne')
          .mockResolvedValue(paymenttub());
        saveSpy = jest
          .spyOn(PaymentRepository.prototype, 'save')
          .mockResolvedValue(paymenttub());
        payment = await paymentService.updatePayment(request);
      });

      test('then it should call paymentRepository', async () => {
        expect(findSpy).toHaveBeenCalledWith({
          where: { id: request.id },
          relations: ['settings'],
        });
        expect(saveSpy).toHaveBeenCalledWith({
          ...paymenttub(),
          ...request,
        });
      });

      test('then it should return a payment', async () => {
        expect(payment).toEqual(paymenttub());
      });
    });
  });

  describe('deletePayment', () => {
    describe('생성된 PAYMENT의 id가 주어진다면 생성된 PAYMENT를 삭제한다', () => {
      const id = 1;
      let deleteSpy: jest.SpyInstance;
      let result: void;

      beforeEach(async () => {
        deleteSpy = jest
          .spyOn(PaymentRepository.prototype, 'delete')
          .mockResolvedValue({} as DeleteResult);
        result = await paymentService.deletePayment(id);
      });

      test('then it should call paymentRepository', async () => {
        expect(deleteSpy).toHaveBeenCalledWith(id);
      });

      test('then it should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
