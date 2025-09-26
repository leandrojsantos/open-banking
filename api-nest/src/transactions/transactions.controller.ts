import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionsService, DepositDto, WithdrawalDto, TransferDto } from './transactions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  @ApiOperation({ summary: 'Realizar depósito' })
  @ApiResponse({ status: 201, description: 'Depósito realizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async deposit(@Body() depositDto: DepositDto, @Request() req: any) {
    return this.transactionsService.deposit(req.user.id, depositDto);
  }

  @Post('withdrawal')
  @ApiOperation({ summary: 'Realizar saque' })
  @ApiResponse({ status: 201, description: 'Saque realizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Saldo insuficiente' })
  async withdrawal(@Body() withdrawalDto: WithdrawalDto, @Request() req: any) {
    return this.transactionsService.withdrawal(req.user.id, withdrawalDto);
  }

  @Post('transfer')
  @ApiOperation({ summary: 'Realizar transferência' })
  @ApiResponse({ status: 201, description: 'Transferência realizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async transfer(@Body() transferDto: TransferDto, @Request() req: any) {
    return this.transactionsService.transfer(req.user.id, transferDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Listar todas as transações (Admin)' })
  @ApiResponse({ status: 200, description: 'Lista de transações' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Request() req: any,
  ) {
    return this.transactionsService.findAll(req.user.id, req.user.role, parseInt(page), parseInt(limit));
  }

  @Get('my-transactions')
  @ApiOperation({ summary: 'Listar minhas transações' })
  @ApiResponse({ status: 200, description: 'Lista das minhas transações' })
  async findMyTransactions(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Request() req: any,
  ) {
    return this.transactionsService.findAll(req.user.id, req.user.role, parseInt(page), parseInt(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter transação por ID' })
  @ApiResponse({ status: 200, description: 'Transação encontrada' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  async findById(@Param('id') id: string, @Request() req: any) {
    return this.transactionsService.findById(id, req.user.id, req.user.role);
  }
}
