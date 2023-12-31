import { NotFoundException, Injectable } from '@nestjs/common';
import { Payment } from './models/payment';
import { isEmpty } from '@app/common';
import { PaymentMessage } from './payment.message';
import { CreatePaymentInput } from './utils/create.payment.input';
import { UpdatePaymentInput } from './utils/update.payment.ipnput';
import { PaymentRepository } from './repositories/payment.repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  /**
   * PAYMENT를 생성한다.
   *
   * @param {PaymentCreateRequestDto} requestDto - PAYMENT 생성 Dto
   * @returns {Promise<Payment>}
   */
  createPayment(requestDto: CreatePaymentInput): Promise<Payment> {
    return this.paymentRepository.save(requestDto);
  }

  /**
   * 모든 PAYMENT 정보를 조회한다.
   *
   * @returns {Promise<Payment[]>}
   */
  findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['settings'] });
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT 정보를 조회한다.
   *
   * @param {number} id - PAYMENT Id
   * @returns {Promise<PaymentResponseDto>}
   */
  findById(id: number): Promise<Payment> {
    return this.findPaymentById(id);
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT 정보를 수정한다.
   *
   * @param {number} id - PAYMENT Id
   * @param {PaymentUpdateRequestDto} requestDto - PAYMENT 수정 Dto
   * @returns {Promise<Payment>}
   */
  async updatePayment(requestDto: UpdatePaymentInput): Promise<Payment> {
    const payment = await this.findPaymentById(requestDto.id);
    const { userId } = requestDto;
    const updatePayment = { ...payment, userId };
    return this.paymentRepository.save(updatePayment);
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT 정보를 반환한다.
   *
   * @param {number} id - PAYMENT Id
   * @returns {Promise<Payment>}
   * @private
   */
  private async findPaymentById(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['settings'],
    });

    if (isEmpty(payment) === true) {
      throw new NotFoundException(PaymentMessage.NOT_FOUND_PAYMENT);
    }

    return payment;
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT 정보를 삭제한다.
   *
   * @param {number} id - PAYMENT Id
   * @returns {Promise<void>}
   */
  deletePayment(id: number): void {
    this.paymentRepository.delete(id);
  }
}
