import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '../src/payment.controller';
import { PaymentService } from '../src/payment.service';
import { paymenttub } from './stubs/payment.stub';
import { Payment } from '../src/models/payment';
import { CreatePaymentInput } from '../src/utils/create.payment.input';

jest.mock('../src/payment.service');

describe('PaymentController', () => {
  let paymentController: PaymentController;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    }).compile();

    paymentController = app.get<PaymentController>(PaymentController);
    paymentService = app.get<PaymentService>(PaymentService);
    jest.clearAllMocks();
  });

  describe('findOneBy', () => {
    describe('when findOneBy is called', () => {
      let payment: Payment;

      beforeEach(async () => {
        payment = await paymentController.findOne(paymenttub().id);
      });

      test('then it should call paymentService', () => {
        expect(paymentService.findById).toHaveBeenCalledWith(paymenttub().id);
      });

      test('then it should return a payment', () => {
        expect(payment).toEqual(paymenttub());
      });
    });

    describe('findAll', () => {
      describe('when getPayment is called ', () => {
        let payment: Payment[];

        beforeEach(async () => {
          payment = await paymentController.findAll();
        });

        test('then it should call paymentService', () => {
          expect(paymentService.findAll).toHaveBeenCalled();
        });

        test('then it should return payment', () => {
          expect(payment).toEqual([paymenttub()]);
        });
      });
    });

    describe('create', () => {
      describe('when create is called', () => {
        let payment: Payment;
        let request: CreatePaymentInput;

        beforeEach(async () => {
          request = {
            title: paymenttub().title,
            content: paymenttub().content,
            userId: paymenttub().userId,
          };
          payment = await paymentController.create(request);
        });

        test('then it should call paymentService', async () => {
          expect(paymentService.createPayment).toHaveBeenCalledWith(request);
        });

        test('then it should return a payment', () => {
          expect(payment).toEqual(paymenttub());
        });
      });
    });
  });
});
