import { NotFoundException, Injectable, Inject } from '@nestjs/common';
import { isEmpty } from '@app/common';
import { PaymentsMessage } from '../../../libs/common/src/message/payments.message';
import { UpdatePaymentInput } from './dtos/update.payment.input';
import { PaymentsRepository } from './repositories/payments.repository';
import { Payment } from './models/payment';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { lastValueFrom } from 'rxjs';
import { NATS_SERVICE } from '@app/common';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    @Inject(NATS_SERVICE) private natsClient: ClientProxy,
  ) {}

  /**
   * PAYMENT를 생성한다.
   *
   * @param {PaymentCreateRequestDto} requestDto - PAYMENT 생성 Dto
   * @returns {Promise<Payment>}
   */
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    let user: any;

    try {
      user = await lastValueFrom(
        this.natsClient.send({ cmd: 'getUserById' }, createPaymentDto.userId),
      );
    } catch (error) {
      throw new RpcException(error);
    }
    if (user) {
      const payment = new Payment();
      payment.amount = createPaymentDto.amount;
      payment.user = user;
      const newPayment = await this.paymentsRepository.save(payment);
      try {
        this.natsClient.emit('paymentCreated', newPayment);
      } catch (error) {
        throw new RpcException(error);
      }
      return newPayment;
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
   * PAYMENT Id에 해당하는 PAYMENT 정보를 반환한다.
   *
   * @param {string} id - PAYMENT Id
   * @returns {Promise<Payment>}
   * @private
   */
  async findByUserId(userId: string): Promise<Payment[]> {
    const id = userId;
    const payments = await this.paymentsRepository.find({
      where: { user: { id } },
    });

    return payments;
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
