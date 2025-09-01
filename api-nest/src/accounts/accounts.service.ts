import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { Repository } from 'typeorm';
import { generateAccountNumber } from '../common/utils/account.utils';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createAccountDto: CreateAccountDto, userId: string): Promise<Account> {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const account = this.accountRepository.create({
            ...createAccountDto,
            accountNumber: generateAccountNumber(),
            user,
        });

        return this.accountRepository.save(account);
    }

    async findAllByUser(userId: string): Promise<Account[]> {
        return this.accountRepository.find({ where: { user: { id: userId } } });
    }

    async findOne(id: string, userId: string): Promise<Account> {
        const account = await this.accountRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['user'],
        });

        if (!account) {
            throw new NotFoundException('Account not found');
        }

        return account;
    }
}