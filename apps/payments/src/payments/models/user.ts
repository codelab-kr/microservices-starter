import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Payment } from './payment';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  isSubscribed?: boolean;

  @OneToMany(() => Payment, (payment) => payment.user)
  @JoinColumn()
  payments?: Payment[];
}
