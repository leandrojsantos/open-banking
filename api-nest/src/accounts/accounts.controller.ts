import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccountsService, CreateAccountDto, UpdateAccountDto } from './accounts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Accounts')
@Controller('accounts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova conta bancária' })
  @ApiResponse({ status: 201, description: 'Conta criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createAccountDto: CreateAccountDto, @Request() req: any) {
    return this.accountsService.create(req.user.id, createAccountDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Listar todas as contas (Admin)' })
  @ApiResponse({ status: 200, description: 'Lista de contas' })
  async findAll(@Request() req: any) {
    return this.accountsService.findAll(req.user.id, req.user.role);
  }

  @Get('my-accounts')
  @ApiOperation({ summary: 'Listar minhas contas' })
  @ApiResponse({ status: 200, description: 'Lista das minhas contas' })
  async findMyAccounts(@Request() req: any) {
    return this.accountsService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter conta por ID' })
  @ApiResponse({ status: 200, description: 'Conta encontrada' })
  @ApiResponse({ status: 404, description: 'Conta não encontrada' })
  async findById(@Param('id') id: string, @Request() req: any) {
    return this.accountsService.findById(id, req.user.id, req.user.role);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar conta' })
  @ApiResponse({ status: 200, description: 'Conta atualizada' })
  @ApiResponse({ status: 404, description: 'Conta não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @Request() req: any,
  ) {
    return this.accountsService.update(id, updateAccountDto, req.user.id, req.user.role);
  }

  @Get(':id/balance')
  @ApiOperation({ summary: 'Obter saldo da conta' })
  @ApiResponse({ status: 200, description: 'Saldo obtido' })
  async getBalance(@Param('id') id: string, @Request() req: any) {
    return this.accountsService.getBalance(id, req.user.id, req.user.role);
  }

  @Get(':id/transactions')
  @ApiOperation({ summary: 'Obter histórico de transações' })
  @ApiResponse({ status: 200, description: 'Histórico obtido' })
  async getTransactionHistory(
    @Param('id') id: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Request() req: any,
  ) {
    return this.accountsService.getTransactionHistory(
      id,
      req.user.id,
      req.user.role,
      parseInt(page),
      parseInt(limit),
    );
  }
}
