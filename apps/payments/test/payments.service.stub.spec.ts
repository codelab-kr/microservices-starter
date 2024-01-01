import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { PaymentsService } from '../src/payments/payments.service';
import { PaymentsRepository } from '../src/payments/repositories/payments.repository';
import { Payment } from '../src/payments/models/payment';
import { paymentStub } from './stubs/payment.stub';
import { CreatePaymentInput } from '../src/payments/utils/create.payment.input';
import { UpdatePaymentInput } from '../src/payments/utils/update.payment.ipnput';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSettings } from '../src/payments/models/payment.settings';
import { PaymentsModule } from '../src/payments/payments.module';

describe('PaymentsService (Stub)', () => {
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Payment, PaymentSettings],
          autoLoadEntities: true,
          synchronize: true,
        }),
        PaymentsModule,
      ],
    }).compile();
    paymentsService = module.get<PaymentsService>(PaymentsService);
  });

  describe('createPayment', () => {
    describe('when createPayment is called', () => {
      let payment: Payment;
      let saveSpy: jest.SpyInstance;

      const request = new CreatePaymentInput();
      request.title = paymentStub().title;
      request.content = paymentStub().content;
      request.userId = paymentStub().userId;

      beforeEach(async () => {
        saveSpy = jest
          .spyOn(PaymentsRepository.prototype, 'save')
          .mockResolvedValue(paymentStub());
        payment = await paymentsService.createPayment(request);
        console.log('payment', payment);
      });

      test('then it should call paymentRepository', async () => {
        expect(saveSpy).toHaveBeenCalledWith(request);
      });

      test('then it should return a payment', () => {
        expect(payment).toEqual(paymentStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let payments: Payment[];
      let findSpy: jest.SpyInstance;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PaymentsRepository.prototype, 'find')
          .mockResolvedValue([paymentStub()]);
        payments = await paymentsService.findAll();
      });

      test('then it should call paymentRepository', async () => {
        expect(findSpy).toHaveBeenCalled();
      });

      test('then it should return payments', () => {
        expect(payments).toStrictEqual([paymentStub()]);
      });
    });
  });

  describe('findById', () => {
    describe('생성되지 않은 PAYMENT의 id가 주어진다면 PAYMENT를 찾을 수 없다는 예외를 던진다', () => {
      let findSpy: jest.SpyInstance;
      const id = 1;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PaymentsRepository.prototype, 'findOne')
          .mockResolvedValue(undefined);
      });

      test('then it should return NotFoundException', async () => {
        await expect(paymentsService.findById(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      test('then it should call paymentRepository', async () => {
        try {
          await paymentsService.findById(id);
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
          .spyOn(PaymentsRepository.prototype, 'findOne')
          .mockResolvedValue(paymentStub());
        payment = await paymentsService.findById(id);
      });

      test('then it should call paymentRepository', async () => {
        expect(findSpy).toHaveBeenCalledWith({
          where: { id },
          relations: ['settings'],
        });
      });

      test('then it should return a payment', async () => {
        expect(payment).toEqual(paymentStub());
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
          .spyOn(PaymentsRepository.prototype, 'findOne')
          .mockResolvedValue(undefined);
      });

      test('then it should return NotFoundException', async () => {
        await expect(paymentsService.updatePayment(requestDto)).rejects.toThrow(
          NotFoundException,
        );
      });

      test('then it should call paymentRepository', async () => {
        try {
          await paymentsService.findById(requestDto.id);
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
          .spyOn(PaymentsRepository.prototype, 'findOne')
          .mockResolvedValue(paymentStub());
        saveSpy = jest
          .spyOn(PaymentsRepository.prototype, 'save')
          .mockResolvedValue(paymentStub());
        payment = await paymentsService.updatePayment(request);
      });

      test('then it should call paymentRepository', async () => {
        expect(findSpy).toHaveBeenCalledWith({
          where: { id: request.id },
          relations: ['settings'],
        });
        expect(saveSpy).toHaveBeenCalledWith({
          ...paymentStub(),
          ...request,
        });
      });

      test('then it should return a payment', async () => {
        expect(payment).toEqual(paymentStub());
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
          .spyOn(PaymentsRepository.prototype, 'delete')
          .mockResolvedValue({} as DeleteResult);
        result = await paymentsService.deletePayment(id);
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
