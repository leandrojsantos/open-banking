import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ 
        description: 'User email address', 
        example: 'user@example.com',
        format: 'email'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ 
        description: 'User password', 
        example: 'password123'
    })
    @IsNotEmpty()
    password: string;
}