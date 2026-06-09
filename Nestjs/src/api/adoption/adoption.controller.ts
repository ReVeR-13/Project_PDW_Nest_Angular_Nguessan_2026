import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import {AdoptionService} from './adoption.service'
import { SwaggerGeneralController } from 'home/app.swagger';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Adoption } from 'home';

@Controller('adoption')
export class AdoptionController {

    constructor(private readonly AdoptionService: AdoptionService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll(): Adoption[] {
        return this.AdoptionService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetOne(@Param('id') id: string): Adoption | string {
        return this.AdoptionService.FindOne(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() adoption: Adoption): Adoption | string {
        return this.AdoptionService.Create(adoption);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() adoption: | Adoption): Adoption | string {
        return this.AdoptionService.Modifier(id, adoption);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.AdoptionService.Supprimer(id);
    }
}
