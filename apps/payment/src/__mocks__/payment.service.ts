import { paymenttub } from '../../test/stubs/payment.stub';

export const PaymentService = jest.fn().mockReturnValue({
  createPayment: jest.fn().mockResolvedValue(paymenttub()),
  updatePayment: jest.fn().mockResolvedValue(paymenttub()),
  deletePayment: jest.fn().mockResolvedValue(null),
  findAll: jest.fn().mockResolvedValue([paymenttub()]),
  findById: jest.fn().mockResolvedValue(paymenttub()),
  findPaymentById: jest.fn().mockResolvedValue(paymenttub()),
});
