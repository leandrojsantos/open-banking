import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Account {
  @ApiProperty({ description: 'Account unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Account number', example: '1234567890' })
  @Column()
  accountNumber: string;

  @ApiProperty({ description: 'Account balance', example: 1000.50 })
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  balance: number;

  @ApiProperty({ description: 'Account owner', type: () => User })
  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @ApiProperty({ description: 'Account transactions', type: () => [Transaction] })
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}