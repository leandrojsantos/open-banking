import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { AccountsService } from '../../src/accounts/accounts.service';
import { CreateAccountDto } from '../../src/accounts/dto/create-account.dto';
import { Account } from '../../src/accounts/entities/account.entity';
import { AccountType } from '../../src/accounts/enums/account-type.enum';

describe('AccountsService', () => {
    let service: AccountsService;
    let accountRepository: any;
    let userRepository: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountsService,
                {
                    provide: getRepositoryToken(Account),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AccountsService>(AccountsService);
        accountRepository = module.get(getRepositoryToken(Account));
        userRepository = module.get(getRepositoryToken(User));
    });

    describe('create', () => {
        it('should create an account successfully', async () => {
            const createAccountDto: CreateAccountDto = { type: AccountType.CHECKING };
            const userId = 'user123';
            const mockUser = { id: userId, email: 'test@example.com' };
            const mockAccount = new Account();

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
            jest.spyOn(accountRepository, 'create').mockReturnValue(mockAccount);
            jest.spyOn(accountRepository, 'save').mockResolvedValue(mockAccount);

            const result = await service.create(createAccountDto, userId);
            expect(result).toBe(mockAccount);
            expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
            expect(accountRepository.create).toHaveBeenCalledWith({
                ...createAccountDto,
                accountNumber: expect.any(String),
                user: mockUser,
            });
        });
    });

    describe('findAllByUser', () => {
        it('should return accounts for user', async () => {
            const userId = 'user123';
            const mockAccounts = [new Account(), new Account()];

            jest.spyOn(accountRepository, 'find').mockResolvedValue(mockAccounts);

            const result = await service.findAllByUser(userId);
            expect(result).toEqual(mockAccounts);
            expect(accountRepository.find).toHaveBeenCalledWith({ where: { user: { id: userId } } });
        });
    });
});