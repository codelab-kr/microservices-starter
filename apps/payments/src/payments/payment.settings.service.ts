import { Injectable } from '@nestjs/common';
import { PaymentSettingsRepository } from './repositories/payment.settings.repository';
import { PaymentSettings } from './models/payment.settings';
import { PaymentsRepository } from './repositories/payments.repository';
import { CreatePaymentSettingsInput } from './utils/create.paymen.settings.input';

@Injectable()
export class PaymentSettingsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly paymentSettingsRepository: PaymentSettingsRepository,
  ) {}

  /**
   * PAYMENT Settings를 생성한다.
   *
   * @param {CreatePaymentSettingsInput} requestDto - PAYMENT Settings를 생성 Dto
   * @returns {Promise<PaymentSettings>}
   */
  async createPaymentSettings(
    requestDto: CreatePaymentSettingsInput,
  ): Promise<PaymentSettings> {
    const findPayment = await this.paymentsRepository.findOneBy({
      id: requestDto.paymentId,
    });
    if (!findPayment) throw new Error('Payment not found');
    const newSettings = this.paymentSettingsRepository.create(requestDto);
    const savedSettings =
      await this.paymentSettingsRepository.save(newSettings);
    findPayment.settings = savedSettings;
    await this.paymentsRepository.save(findPayment);
    return savedSettings;
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT Settings 정보를 반환한다.
   *
   * @param {number} paymentId - PAYMENT Id
   * @returns {Promise<PaymentSettings>}
   */
  findByPaymentId(paymentId: number): Promise<PaymentSettings> {
    return this.paymentSettingsRepository.findOneBy({ paymentId });
  }
}
