import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ 
        description: 'User email address', 
        example: 'user@example.com',
        format: 'email'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ 
        description: 'User password (min 8, max 32 characters)', 
        example: 'password123',
        minLength: 8,
        maxLength: 32
    })
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;

    @ApiProperty({ 
        description: 'User first name (min 3 characters)', 
        example: 'John',
        minLength: 3
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    firstName: string;

    @ApiProperty({ 
        description: 'User last name (min 3 characters)', 
        example: 'Doe',
        minLength: 3
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    lastName: string;
}