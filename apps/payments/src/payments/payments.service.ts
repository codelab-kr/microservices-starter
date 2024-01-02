import { NotFoundException, Injectable, Inject } from '@nestjs/common';
import { isEmpty } from '@app/common';
import { PaymentsMessage } from './payments.message';
import { UpdatePaymentInput } from './dtos/update.payment.input';
import { PaymentsRepository } from './repositories/payments.repository';
import { Payment } from './models/payment';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  /**
   * PAYMENT를 생성한다.
   *
   * @param {PaymentCreateRequestDto} requestDto - PAYMENT 생성 Dto
   * @returns {Promise<Payment>}
   */
  async createPayment(createPaymentDto: CreatePaymentDto) {
    console.log('createPaymentDto - service', createPaymentDto);
    const user = await lastValueFrom(
      this.natsClient.send(
        { cmd: 'getUserById' },
        { id: createPaymentDto.userId },
      ),
    );
    console.log('user', user);
    if (user) {
      const payment = await this.paymentsRepository.save({
        ...createPaymentDto,
        user,
      });
      this.natsClient.emit('paymentCreated', payment);
      return payment;
    }
    return null;
  }

  /**
   * 모든 PAYMENT 정보를 조회한다.
   *
   * @returns {Promise<Payment[]>}
   */
  findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations: ['settings'] });
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT 정보를 조회한다.
   *
   * @param {string} id - PAYMENT Id
   * @returns {Promise<PaymentResponseDto>}
   */
  findById(id: string): Promise<Payment> {
    return this.findPaymentById(id);
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT 정보를 수정한다.
   *
   * @param {string} id - PAYMENT Id
   * @param {PaymentUpdateRequestDto} requestDto - PAYMENT 수정 Dto
   * @returns {Promise<Payment>}
   */
  async updatePayment(requestDto: UpdatePaymentInput): Promise<Payment> {
    const payment = await this.findPaymentById(requestDto.id);
    const { amount } = requestDto;
    const updatePayment = { ...payment, amount };
    return this.paymentsRepository.save(updatePayment);
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT 정보를 반환한다.
   *
   * @param {number} id - PAYMENT Id
   * @returns {Promise<Payment>}
   * @private
   */
  private async findPaymentById(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['settings'],
    });

    if (isEmpty(payment) === true) {
      throw new NotFoundException(PaymentsMessage.NOT_FOUND_PAYMENT);
    }

    return payment;
  }

  /**
   * PAYMENT Id에 해당하는 PAYMENT 정보를 삭제한다.
   *
   * @param {string} id - PAYMENT Id
   * @returns {Promise<void>}
   */
  deletePayment(id: number): void {
    this.paymentsRepository.delete(id);
  }
}
