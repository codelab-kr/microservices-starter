import { Repository } from 'typeorm';
import { CustomRepository } from '@app/common';
import { PaymentSettings } from '../models/payment.settings';

@CustomRepository(PaymentSettings)
export class PaymentSettingsRepository extends Repository<PaymentSettings> {}
