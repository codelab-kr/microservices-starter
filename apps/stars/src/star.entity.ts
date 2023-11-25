import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Star {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  static of(params: Partial<Star>): Star {
    const star = new Star();
    Object.assign(star, params);

    return star;
  }

  static create(firstName: string, lastName: string, isActive: boolean): Star {
    const star = new Star();
    star.firstName = firstName;
    star.lastName = lastName;
    star.isActive = isActive;
    return star;
  }
}
