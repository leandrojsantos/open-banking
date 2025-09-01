import { User } from '@users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
    async createAccount(createAccountDto: CreateAccountDto, user: User): Promise<Account> {
        const account = this.create({
            ...createAccountDto,
            user
        });
        return this.save(account);
    }
}