import { Payment } from '../../src/payments/models/payment';

export const paymentStub = (): Payment => {
  return {
    id: 1,
    title: 'Tei',
    content: 'Lee',
    userId: 1,
  };
};
