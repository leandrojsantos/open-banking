import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
    @ApiProperty({ 
        description: 'Account ID for the transaction', 
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsNotEmpty()
    accountId: string;

    @ApiProperty({ 
        description: 'Transaction amount', 
        example: 100.50,
        minimum: 0.01
    })
    @IsNumber()
    amount: number;

    @ApiProperty({ 
        description: 'Transaction type', 
        enum: TransactionType,
        example: TransactionType.DEPOSIT
    })
    @IsString()
    type: TransactionType;

    @ApiProperty({ 
        description: 'Transaction description', 
        example: 'Salary deposit',
        required: false
    })
    @IsString()
    description?: string;
}