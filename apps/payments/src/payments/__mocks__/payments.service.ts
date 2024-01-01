import { paymentStub } from '../../../test/stubs/payment.stub';

export const PaymentsService = jest.fn().mockReturnValue({
  createPayment: jest.fn().mockResolvedValue(paymentStub()),
  updatePayment: jest.fn().mockResolvedValue(paymentStub()),
  deletePayment: jest.fn().mockResolvedValue(null),
  findAll: jest.fn().mockResolvedValue([paymentStub()]),
  findById: jest.fn().mockResolvedValue(paymentStub()),
  findPaymentById: jest.fn().mockResolvedValue(paymentStub()),
});
