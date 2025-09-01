import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('health')
    @ApiOperation({ summary: 'Health check', description: 'Check if the API is running' })
    @ApiResponse({ status: 200, description: 'API is healthy', schema: {
        type: 'object',
        properties: {
            status: { type: 'string', example: 'OK' },
            timestamp: { type: 'string', example: '2025-01-01T12:00:00.000Z' }
        }
    }})
    healthCheck(): { status: string; timestamp: string } {
        return this.appService.getHealthCheck();
    }
}