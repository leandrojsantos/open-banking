import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { AccountType } from '../enums/account-type.enum';

export class CreateAccountDto {
    @ApiProperty({ 
        description: 'Account type', 
        enum: AccountType,
        example: AccountType.CHECKING,
        required: false,
        default: AccountType.CHECKING
    })
    @IsEnum(AccountType)
    @IsOptional()
    type?: AccountType = AccountType.CHECKING;
}