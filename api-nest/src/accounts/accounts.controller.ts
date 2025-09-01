import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new account' })
    @ApiResponse({ status: 201, description: 'Account created successfully', type: Account })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async create(
        @Body() createAccountDto: CreateAccountDto,
        @CurrentUser() user: User,
    ) {
        return this.accountsService.create(createAccountDto, user.id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all accounts for current user' })
    @ApiResponse({ status: 200, description: 'Accounts retrieved successfully', type: [Account] })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async findAll(@CurrentUser() user: User) {
        return this.accountsService.findAllByUser(user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get account by ID' })
    @ApiParam({ name: 'id', description: 'Account ID' })
    @ApiResponse({ status: 200, description: 'Account found', type: Account })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Account not found' })
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: User,
    ) {
        return this.accountsService.findOne(id, user.id);
    }
}