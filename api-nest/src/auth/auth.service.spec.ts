import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../infrastructure/database/prisma.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve validar usuário com credenciais corretas', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Test',
      lastName: 'User',
      role: 'USER',
      isActive: true,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

    const result = await service.validateUser('test@example.com', 'password123');

    expect(result).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      role: mockUser.role,
      isActive: mockUser.isActive,
      emailVerified: mockUser.emailVerified,
      createdAt: mockUser.createdAt,
      updatedAt: mockUser.updatedAt,
    });
  });

  it('deve retornar null para credenciais inválidas', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Test',
      lastName: 'User',
      role: 'USER',
      isActive: true,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

    const result = await service.validateUser('test@example.com', 'wrongpassword');

    expect(result).toBeNull();
  });

  it('deve retornar null para usuário inexistente', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(null);

    const result = await service.validateUser('nonexistent@example.com', 'password123');

    expect(result).toBeNull();
  });
});
