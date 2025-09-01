import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../src/users/entities/user.entity';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';

describe('UsersController', () => {
    let controller: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    describe('create', () => {
        it('should create a user', async () => {
            const createUserDto: CreateUserDto = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            const mockUser = new User();
            jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);

            const result = await controller.create(createUserDto);
            expect(result).toBe(mockUser);
            expect(usersService.create).toHaveBeenCalledWith(createUserDto);
        });
    });

    describe('findOne', () => {
        it('should return a user', async () => {
            const userId = 'user123';
            const mockUser = new User();
            jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);

            const result = await controller.findOne(userId);
            expect(result).toBe(mockUser);
            expect(usersService.findOne).toHaveBeenCalledWith(userId);
        });
    });
});