import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from '../src/payments/payments.controller';
import { PaymentsService } from '../src/payments/payments.service';
import { paymentStub } from './stubs/payment.stub';
import { Payment } from '../src/payments/models/payment';
import { CreatePaymentInput } from '../src/payments/utils/create.payment.input';

jest.mock('../src/payments.service');

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    paymentsController = app.get<PaymentsController>(PaymentsController);
    paymentsService = app.get<PaymentsService>(PaymentsService);
    jest.clearAllMocks();
  });

  describe('findOneBy', () => {
    describe('when findOneBy is called', () => {
      let payment: Payment;

      beforeEach(async () => {
        payment = await paymentsController.findOne(paymentStub().id);
      });

      test('then it should call paymentsService', () => {
        expect(paymentsService.findById).toHaveBeenCalledWith(paymentStub().id);
      });

      test('then it should return a payment', () => {
        expect(payment).toEqual(paymentStub());
      });
    });

    describe('findAll', () => {
      describe('when getPayments is called ', () => {
        let payments: Payment[];

        beforeEach(async () => {
          payments = await paymentsController.findAll();
        });

        test('then it should call paymentsService', () => {
          expect(paymentsService.findAll).toHaveBeenCalled();
        });

        test('then it should return payments', () => {
          expect(payments).toEqual([paymentStub()]);
        });
      });
    });

    describe('create', () => {
      describe('when create is called', () => {
        let payment: Payment;
        let request: CreatePaymentInput;

        beforeEach(async () => {
          request = {
            title: paymentStub().title,
            content: paymentStub().content,
            userId: paymentStub().userId,
          };
          payment = await paymentsController.create(request);
        });

        test('then it should call paymentsService', async () => {
          expect(paymentsService.createPayment).toHaveBeenCalledWith(request);
        });

        test('then it should return a payment', () => {
          expect(payment).toEqual(paymentStub());
        });
      });
    });
  });
});
