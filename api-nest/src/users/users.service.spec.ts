import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    })
    .overrideProvider(PrismaService)
    .useValue(mockPrismaService)
    .compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve encontrar usuário por email', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'USER',
      isActive: true,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

    const result = await service.findByEmail('test@example.com');

    expect(result).toEqual(mockUser);
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it('deve lançar exceção quando usuário não encontrado', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(null);

    await expect(service.findByEmail('nonexistent@example.com')).rejects.toThrow('Usuário não encontrado');
  });
});
