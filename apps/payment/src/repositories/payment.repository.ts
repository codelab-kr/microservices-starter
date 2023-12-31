import { Repository } from 'typeorm';
import { CustomRepository } from '@app/common';
import { Payment } from '../models/payment';

@CustomRepository(Payment)
export class PaymentRepository extends Repository<Payment> {}
