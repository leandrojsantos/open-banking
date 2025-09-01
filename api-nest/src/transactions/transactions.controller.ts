import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@ApiTags('transactions')
@Controller('accounts/:accountId/transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new transaction' })
    @ApiParam({ name: 'accountId', description: 'Account ID' })
    @ApiResponse({ status: 201, description: 'Transaction created successfully', type: Transaction })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Account not found' })
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Param('accountId') accountId: string,
    ) {
        return this.transactionsService.create({
            ...createTransactionDto,
            accountId,
        });
    }

    @Get()
    @ApiOperation({ summary: 'Get all transactions for an account' })
    @ApiParam({ name: 'accountId', description: 'Account ID' })
    @ApiResponse({ status: 200, description: 'Transactions retrieved successfully', type: [Transaction] })
    @ApiResponse({ status: 404, description: 'Account not found' })
    findAll(@Param('accountId') accountId: string) {
        return this.transactionsService.findAllByAccount(accountId);
    }
}