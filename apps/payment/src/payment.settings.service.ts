import { Injectable } from '@nestjs/common';
import { PaymentettingsRepository } from './repositories/payment.settings.repository';
import { Paymentettings } from './models/payment.settings';
import { CreatePaymentettingsInput } from './utils/create.payment.settings.input';
import { PaymentRepository } from './repositories/payment.repository';

@Injectable()
export class PaymentettingsService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentettingsRepository: PaymentettingsRepository,
  ) {}

  /**
   * PAYMENT Settings를 생성한다.
   *
   * @param {CreatePaymentettingsInput} requestDto - PAYMENT Settings를 생성 Dto
   * @returns {Promise<Paymentettings>}
   */
  async createPaymentettings(
    requestDto: CreatePaymentettingsInput,
  ): Promise<Paymentettings> {
    const findPayment = await this.paymentRepository.findOneBy({
      id: requestDto.paymentId,
    });
    if (!findPayment) throw new Error('Payment not found');
    const newSettings = this.paymentettingsRepository.create(requestDto);
    const savedSettings = await this.paymentettingsRepository.save(newSettings);
    findPayment.settings = savedSettings;
    await this.paymentRepository.save(findPayment);
    return savedSettings;
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT Settings 정보를 반환한다.
   *
   * @param {number} paymentId - PAYMENT Id
   * @returns {Promise<Paymentettings>}
   */
  findByPaymentId(paymentId: number): Promise<Paymentettings> {
    return this.paymentettingsRepository.findOneBy({ paymentId });
  }
}
