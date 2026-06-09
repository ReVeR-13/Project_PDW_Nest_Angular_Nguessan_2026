import { Controller, Get, Post } from '@nestjs/common';
import { AppService} from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {SwaggerController} from './app.swagger'

@ApiTags('Route de base')
@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation(SwaggerController.AppControllerHelloWorld)
  @Get()
  getStart(): string {
    return this.appService.getStart();
  }
}
