import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  static of(params: Partial<User>): User {
    const user = new User();
    Object.assign(user, params);

    return user;
  }

  static create(firstName: string, lastName: string, isActive: boolean): User {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.isActive = isActive;
    return user;
  }
}
