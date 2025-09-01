import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../src/accounts/entities/account.entity';
import { CreateTransactionDto } from '../../src/transactions/dto/create-transaction.dto';
import { Transaction, TransactionType } from '../../src/transactions/entities/transaction.entity';
import { TransactionsService } from '../../src/transactions/transactions.service';

describe('TransactionsService', () => {
    let service: TransactionsService;
    let transactionRepo: Repository<Transaction>;
    let accountRepo: Repository<Account>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionsService,
                {
                    provide: getRepositoryToken(Transaction),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Account),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<TransactionsService>(TransactionsService);
        transactionRepo = module.get<Repository<Transaction>>(getRepositoryToken(Transaction));
        accountRepo = module.get<Repository<Account>>(getRepositoryToken(Account));
    });

    describe('create', () => {
        it('should create a deposit transaction', async () => {
            const createDto: CreateTransactionDto = {
                accountId: 'account123',
                type: TransactionType.DEPOSIT,
                amount: 100,
            };
            const mockAccount = new Account();
            mockAccount.id = 'account123';
            mockAccount.balance = 0;

            jest.spyOn(accountRepo, 'findOne').mockResolvedValue(mockAccount);
            jest.spyOn(transactionRepo, 'create').mockReturnValue(new Transaction());
            jest.spyOn(transactionRepo, 'save').mockResolvedValue(new Transaction());

            const result = await service.create(createDto);
            expect(result).toBeInstanceOf(Transaction);
        });

        it('should throw error for account not found', async () => {
            const createDto: CreateTransactionDto = {
                accountId: 'account123',
                type: TransactionType.DEPOSIT,
                amount: 100,
            };

            jest.spyOn(accountRepo, 'findOne').mockResolvedValue(null);

            await expect(service.create(createDto)).rejects.toThrow('Account not found');
        });
    });

    describe('findAllByAccount', () => {
        it('should return transactions for account', async () => {
            const accountId = 'account123';
            const mockTransactions = [new Transaction(), new Transaction()];

            jest.spyOn(transactionRepo, 'find').mockResolvedValue(mockTransactions);

            const result = await service.findAllByAccount(accountId);
            expect(result).toEqual(mockTransactions);
            expect(transactionRepo.find).toHaveBeenCalledWith({
                where: { account: { id: accountId } },
                relations: ['account'],
            });
        });
    });
});