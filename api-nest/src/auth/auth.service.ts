import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        // Adicione sua lógica de validação de senha aqui
        return user;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
        const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
        
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        
        return {
            accessToken,
            expiresIn: '1d',
            userId: user.id,
        };
    }
}