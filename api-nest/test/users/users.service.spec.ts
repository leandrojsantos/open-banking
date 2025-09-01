import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { User } from '../../src/users/entities/user.entity';
import { UsersService } from '../../src/users/users.service';

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const createUserDto: CreateUserDto = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            const mockUser = new User();
            jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
            jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);

            const result = await service.create(createUserDto);
            expect(result).toBe(mockUser);
            expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
            expect(userRepository.save).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('findOne', () => {
        it('should return a user', async () => {
            const userId = 'user123';
            const mockUser = new User();

            jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);

            const result = await service.findOne(userId);
            expect(result).toBe(mockUser);
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
        });

        it('should return undefined if user not found', async () => {
            const userId = 'nonexistent';

            jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

            const result = await service.findOne(userId);
            expect(result).toBeUndefined();
        });
    });

    describe('findOneByEmail', () => {
        it('should return a user by email', async () => {
            const email = 'test@example.com';
            const mockUser = new User();

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

            const result = await service.findOneByEmail(email);
            expect(result).toBe(mockUser);
            expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
        });

        it('should return undefined if user not found', async () => {
            const email = 'nonexistent@example.com';

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

            const result = await service.findOneByEmail(email);
            expect(result).toBeUndefined();
        });
    });
});