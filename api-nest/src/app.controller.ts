import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Informações da aplicação' })
  @ApiResponse({ status: 200, description: 'Informações obtidas com sucesso' })
  getAppInfo() {
    return this.appService.getAppInfo();
  }
}
