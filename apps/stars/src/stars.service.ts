import { NotFoundException, Injectable } from '@nestjs/common';
import { StarsRepository } from './stars.repository';
import { Star } from './star.entity';
import { StarCreateRequestDto } from './dto/star-create-request.dto';
import { StarUpdateRequestDto } from './dto/star-update-request.dto';
import { isEmpty } from '@app/common';
import { StarsMessage } from './stars.message';

@Injectable()
export class StarsService {
  constructor(private readonly starsRepository: StarsRepository) {}

  /**
   * 회원를 생성한다.
   *
   * @param {StarCreateRequestDto} requestDto - 회원 생성 Dto
   * @returns {Promise<Star>}
   */
  async createStar(requestDto: StarCreateRequestDto): Promise<Star> {
    return this.starsRepository.save(requestDto);
  }

  /**
   * 모든 회원 정보를 조회한다.
   *
   * @returns {Promise<Star[]>}
   */
  async findAll(): Promise<Star[]> {
    return this.starsRepository.find();
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 조회한다.
   *
   * @param {number} id - 회원 Id
   * @returns {Promise<StarResponseDto>}
   */
  async findById(id: number): Promise<Star> {
    const star = await this.findStarById(id);
    return star;
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 수정한다.
   *
   * @param {number} id - 회원 Id
   * @param {StarUpdateRequestDto} requestDto - 회원 수정 Dto
   * @returns {Promise<Star>}
   */
  async updateStar(requestDto: StarUpdateRequestDto): Promise<Star> {
    const star = await this.findStarById(requestDto.id);
    const { isActive } = requestDto;
    const updateStar = { ...star, isActive };
    return this.starsRepository.save(updateStar);
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 반환한다.
   *
   * @param {number} id - 회원 Id
   * @returns {Promise<Star>}
   * @private
   */
  private async findStarById(id: number): Promise<Star> {
    const star = await this.starsRepository.findOne({
      where: { id },
    });

    if (isEmpty(star) === true) {
      throw new NotFoundException(StarsMessage.NOT_FOUND_STAR);
    }

    return star;
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 삭제한다.
   *
   * @param {number} id - 회원 Id
   * @returns {Promise<void>}
   */
  async deleteStar(id: number): Promise<void> {
    await this.starsRepository.delete(id);
  }
}
