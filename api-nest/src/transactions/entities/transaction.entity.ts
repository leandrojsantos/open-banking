import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

export enum TransactionType {
    DEPOSIT = 'deposit',
    WITHDRAWAL = 'withdrawal',
    TRANSFER = 'transfer'
}

@Entity()
export class Transaction {
    @ApiProperty({ description: 'Transaction unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Transaction amount', example: 100.50 })
    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount: number;

    @ApiProperty({ description: 'Transaction type', enum: TransactionType, example: TransactionType.DEPOSIT })
    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @ApiProperty({ description: 'Transaction description', example: 'Salary deposit', required: false })
    @Column({ nullable: true })
    description: string;

    @ApiProperty({ description: 'Associated account', type: () => Account })
    @ManyToOne(() => Account, (account) => account.transactions)
    account: Account;

    @ApiProperty({ description: 'Transaction creation timestamp', example: '2025-01-01T12:00:00.000Z' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}