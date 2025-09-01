import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../src/users/entities/user.entity';
import { CreateTransactionDto } from '../../src/transactions/dto/create-transaction.dto';
import { Transaction, TransactionType } from '../../src/transactions/entities/transaction.entity';
import { TransactionsController } from '../../src/transactions/transactions.controller';
import { TransactionsService } from '../../src/transactions/transactions.service';

describe('TransactionsController', () => {
    let controller: TransactionsController;
    let transactionsService: TransactionsService;

    const mockUser: User = {
        id: 'user123',
        email: 'test@example.com',
        password: 'hashed',
        firstName: 'Test',
        lastName: 'User',
        accounts: [],
        roles: [],
    } as User;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionsController],
            providers: [
                {
                    provide: TransactionsService,
                    useValue: {
                        create: jest.fn(),
                        findAllByAccount: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<TransactionsController>(TransactionsController);
        transactionsService = module.get<TransactionsService>(TransactionsService);
    });

    describe('create', () => {
        it('should create a transaction', async () => {
            const accountId = 'account123';
            const createDto: CreateTransactionDto = {
                accountId: 'account123',
                type: TransactionType.DEPOSIT,
                amount: 100,
            };

            await controller.create(createDto, accountId);
            expect(transactionsService.create).toHaveBeenCalledWith({
                ...createDto,
                accountId,
            });
        });
    });

    describe('findAll', () => {
        it('should return transactions for account', async () => {
            const accountId = 'account123';
            const mockTransactions = [
                { id: '1', amount: 100, type: TransactionType.DEPOSIT, description: 'test', account: {}, createdAt: new Date() },
                { id: '2', amount: 50, type: TransactionType.WITHDRAWAL, description: 'test', account: {}, createdAt: new Date() }
            ] as Transaction[];

            jest.spyOn(transactionsService, 'findAllByAccount').mockResolvedValue(mockTransactions);

            const result = await controller.findAll(accountId);
            expect(result).toEqual(mockTransactions);
            expect(transactionsService.findAllByAccount).toHaveBeenCalledWith(accountId);
        });
    });
});