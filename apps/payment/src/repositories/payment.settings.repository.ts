import { Repository } from 'typeorm';
import { CustomRepository } from '@app/common';
import { Paymentettings } from '../models/payment.settings';

@CustomRepository(Paymentettings)
export class PaymentettingsRepository extends Repository<Paymentettings> {}
