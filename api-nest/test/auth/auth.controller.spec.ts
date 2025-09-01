import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { LoginResponseDto } from '../../src/auth/dto/login-response.dto';
import { LoginUserDto } from '../../src/users/dto/login-user.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('login', () => {
        it('deve retornar resposta de login', async () => {
            const loginDto: LoginUserDto = {
                email: 'test@example.com',
                password: 'password123',
            };

            const mockResponse: LoginResponseDto = {
                accessToken: 'mockToken',
                expiresIn: '1d',
                userId: '123',
            };

            jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

            const result = await controller.login(loginDto);
            expect(result).toEqual(mockResponse);
            expect(authService.login).toHaveBeenCalledWith(loginDto);
        });
    });
});