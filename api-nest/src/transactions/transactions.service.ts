import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { TransactionType, TransactionStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface DepositDto {
  accountId: string;
  amount: number;
  description?: string;
}

export interface WithdrawalDto {
  accountId: string;
  amount: number;
  description?: string;
}

export interface TransferDto {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
}

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async deposit(userId: string, depositDto: DepositDto) {
    const { accountId, amount, description } = depositDto;

    // Verificar se a conta existe e pertence ao usuário
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    if (account.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para esta conta');
    }

    if (!account.isActive) {
      throw new BadRequestException('Conta inativa');
    }

    // Criar transação
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        accountId,
        type: TransactionType.DEPOSIT,
        amount: new Decimal(amount),
        description,
        status: TransactionStatus.PENDING,
        reference: await this.generateReference(),
      },
    });

    // Processar depósito
    await this.processDeposit(transaction.id);

    return this.getTransactionById(transaction.id);
  }

  async withdrawal(userId: string, withdrawalDto: WithdrawalDto) {
    const { accountId, amount, description } = withdrawalDto;

    // Verificar se a conta existe e pertence ao usuário
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    if (account.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para esta conta');
    }

    if (!account.isActive) {
      throw new BadRequestException('Conta inativa');
    }

    // Verificar saldo suficiente
    if (account.balance.lt(amount)) {
      throw new BadRequestException('Saldo insuficiente');
    }

    // Verificar limite diário
    await this.checkDailyLimit(accountId, amount);

    // Criar transação
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        accountId,
        type: TransactionType.WITHDRAWAL,
        amount: new Decimal(amount),
        description,
        status: TransactionStatus.PENDING,
        reference: await this.generateReference(),
      },
    });

    // Processar saque
    await this.processWithdrawal(transaction.id);

    return this.getTransactionById(transaction.id);
  }

  async transfer(userId: string, transferDto: TransferDto) {
    const { fromAccountId, toAccountId, amount, description } = transferDto;

    if (fromAccountId === toAccountId) {
      throw new BadRequestException('Conta de origem e destino não podem ser iguais');
    }

    // Verificar conta de origem
    const fromAccount = await this.prisma.account.findUnique({
      where: { id: fromAccountId },
    });

    if (!fromAccount) {
      throw new NotFoundException('Conta de origem não encontrada');
    }

    if (fromAccount.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para a conta de origem');
    }

    if (!fromAccount.isActive) {
      throw new BadRequestException('Conta de origem inativa');
    }

    // Verificar conta de destino
    const toAccount = await this.prisma.account.findUnique({
      where: { id: toAccountId },
    });

    if (!toAccount) {
      throw new NotFoundException('Conta de destino não encontrada');
    }

    if (!toAccount.isActive) {
      throw new BadRequestException('Conta de destino inativa');
    }

    // Verificar saldo suficiente
    if (fromAccount.balance.lt(amount)) {
      throw new BadRequestException('Saldo insuficiente');
    }

    // Verificar limite diário
    await this.checkDailyLimit(fromAccountId, amount);

    // Criar transação
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        accountId: fromAccountId,
        type: TransactionType.TRANSFER,
        amount: new Decimal(amount),
        description,
        status: TransactionStatus.PENDING,
        reference: await this.generateReference(),
        fromAccountId,
        toAccountId,
      },
    });

    // Processar transferência
    await this.processTransfer(transaction.id);

    return this.getTransactionById(transaction.id);
  }

  async findAll(userId: string, userRole: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const where = userRole === 'ADMIN' ? {} : { userId };

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          account: {
            select: {
              accountNumber: true,
              accountType: true,
            },
          },
          fromAccount: {
            select: {
              accountNumber: true,
              accountType: true,
            },
          },
          toAccount: {
            select: {
              accountNumber: true,
              accountType: true,
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return {
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string, userId: string, userRole: string) {
    return this.getTransactionById(id, userId, userRole);
  }

  private async getTransactionById(id: string, userId?: string, userRole?: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        account: {
          select: {
            accountNumber: true,
            accountType: true,
          },
        },
        fromAccount: {
          select: {
            accountNumber: true,
            accountType: true,
          },
        },
        toAccount: {
          select: {
            accountNumber: true,
            accountType: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada');
    }

    // Verificar permissões
    if (userRole !== 'ADMIN' && transaction.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para acessar esta transação');
    }

    return transaction;
  }

  private async processDeposit(transactionId: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { account: true },
    });

    if (!transaction) return;

    // Atualizar saldo da conta
    await this.prisma.account.update({
      where: { id: transaction.accountId },
      data: {
        balance: transaction.account.balance.add(transaction.amount),
      },
    });

    // Marcar transação como concluída
    await this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.COMPLETED,
        processedAt: new Date(),
      },
    });
  }

  private async processWithdrawal(transactionId: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { account: true },
    });

    if (!transaction) return;

    // Atualizar saldo da conta
    await this.prisma.account.update({
      where: { id: transaction.accountId },
      data: {
        balance: transaction.account.balance.sub(transaction.amount),
      },
    });

    // Marcar transação como concluída
    await this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.COMPLETED,
        processedAt: new Date(),
      },
    });
  }

  private async processTransfer(transactionId: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { account: true },
    });

    if (!transaction || !transaction.fromAccountId || !transaction.toAccountId) return;

    // Usar transação do Prisma para garantir atomicidade
    await this.prisma.$transaction(async (prisma) => {
      // Debitar conta de origem
      await prisma.account.update({
        where: { id: transaction.fromAccountId! },
        data: {
          balance: transaction.account.balance.sub(transaction.amount),
        },
      });

      // Creditar conta de destino
      const toAccount = await prisma.account.findUnique({
        where: { id: transaction.toAccountId! },
      });

      if (toAccount) {
        await prisma.account.update({
          where: { id: transaction.toAccountId! },
          data: {
            balance: toAccount.balance.add(transaction.amount),
          },
        });
      }

      // Marcar transação como concluída
      await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          status: TransactionStatus.COMPLETED,
          processedAt: new Date(),
        },
      });
    });
  }

  private async checkDailyLimit(accountId: string, amount: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyTransactions = await this.prisma.transaction.aggregate({
      where: {
        accountId,
        type: { in: [TransactionType.WITHDRAWAL, TransactionType.TRANSFER] },
        status: TransactionStatus.COMPLETED,
        processedAt: { gte: today },
      },
      _sum: { amount: true },
    });

    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) return;

    const dailyTotal = dailyTransactions._sum.amount || new Decimal(0);
    const newTotal = dailyTotal.add(amount);

    if (newTotal.gt(account.dailyLimit)) {
      throw new BadRequestException('Limite diário excedido');
    }
  }

  private async generateReference(): Promise<string> {
    return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
}
