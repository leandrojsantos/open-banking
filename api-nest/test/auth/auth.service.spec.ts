import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from '../../src/users/users.service';
import { User } from '@users/entities/user.entity';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findOneByEmail: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('validateUser', () => {
        it('should return user if found', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const mockUser = { id: '1', email, password: 'hashed' } as User;

            jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(mockUser);

            const result = await service.validateUser(email, password);
            expect(result).toBe(mockUser);
            expect(usersService.findOneByEmail).toHaveBeenCalledWith(email);
        });

        it('should return null if user not found', async () => {
            const email = 'test@example.com';
            const password = 'password123';

            jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(undefined);

            const result = await service.validateUser(email, password);
            expect(result).toBeUndefined();
        });
    });

    describe('login', () => {
        it('should return access token', async () => {
            const loginDto = { email: 'test@example.com', password: 'password123' };
            const mockUser = { id: '1', email: 'test@example.com' } as User;
            const mockToken = 'jwt-token';

            jest.spyOn(service, 'validateUser').mockResolvedValue(mockUser);
            jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

            const result = await service.login(loginDto);
            expect(result).toEqual({
                accessToken: mockToken,
                expiresIn: '1d',
                userId: mockUser.id,
            });
            expect(service.validateUser).toHaveBeenCalledWith(loginDto.email, loginDto.password);
            expect(jwtService.sign).toHaveBeenCalledWith({
                email: mockUser.email,
                sub: mockUser.id,
            });
        });

        it('should throw error for invalid credentials', async () => {
            const loginDto = { email: 'test@example.com', password: 'wrongpassword' };

            jest.spyOn(service, 'validateUser').mockResolvedValue(undefined);

            await expect(service.login(loginDto)).rejects.toThrow('Invalid credentials');
        });
    });
});