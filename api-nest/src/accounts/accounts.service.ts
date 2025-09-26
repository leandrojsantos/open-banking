import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { AccountType } from '@prisma/client';

export interface CreateAccountDto {
  accountType: AccountType;
  dailyLimit?: number;
  monthlyLimit?: number;
}

export interface UpdateAccountDto {
  dailyLimit?: number;
  monthlyLimit?: number;
  isActive?: boolean;
}

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createAccountDto: CreateAccountDto) {
    // Verificar se usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Gerar número de conta único
    const accountNumber = await this.generateAccountNumber();

    return this.prisma.account.create({
      data: {
        userId,
        accountNumber,
        accountType: createAccountDto.accountType,
        dailyLimit: createAccountDto.dailyLimit || 10000,
        monthlyLimit: createAccountDto.monthlyLimit || 100000,
      },
    });
  }

  async findAll(userId: string, userRole: string) {
    const where = userRole === 'ADMIN' ? {} : { userId };
    
    return this.prisma.account.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findById(id: string, userId: string, userRole: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    // Verificar permissões
    if (userRole !== 'ADMIN' && account.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para acessar esta conta');
    }

    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto, userId: string, userRole: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    // Verificar permissões
    if (userRole !== 'ADMIN' && account.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para atualizar esta conta');
    }

    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  async getBalance(id: string, userId: string, userRole: string) {
    const account = await this.findById(id, userId, userRole);
    
    return {
      accountId: account.id,
      accountNumber: account.accountNumber,
      balance: account.balance,
      currency: 'BRL',
    };
  }

  async getTransactionHistory(id: string, userId: string, userRole: string, page = 1, limit = 10) {
    const account = await this.findById(id, userId, userRole);

    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where: {
          OR: [
            { accountId: id },
            { fromAccountId: id },
            { toAccountId: id },
          ],
        },
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
        },
      }),
      this.prisma.transaction.count({
        where: {
          OR: [
            { accountId: id },
            { fromAccountId: id },
            { toAccountId: id },
          ],
        },
      }),
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

  private async generateAccountNumber(): Promise<string> {
    let accountNumber: string = '';
    let isUnique = false;

    while (!isUnique) {
      // Gerar número de conta: 8 dígitos
      accountNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
      
      const existingAccount = await this.prisma.account.findUnique({
        where: { accountNumber },
      });

      if (!existingAccount) {
        isUnique = true;
      }
    }

    return accountNumber;
  }
}
