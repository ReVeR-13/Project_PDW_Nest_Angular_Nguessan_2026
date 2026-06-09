import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import {VaccinService} from './vaccin.service'
import { SwaggerGeneralController } from 'home/app.swagger';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Vaccin } from './Vaccins';

@Controller('vaccin')
export class VaccinController {

    constructor(private readonly VaccinService: VaccinService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll(): Vaccin[] {
        return this.VaccinService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetOne(@Param('id') id: string): Vaccin | string {
        return this.VaccinService.FindOne(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() vacc: Vaccin): Vaccin | string {
        return this.VaccinService.Create(vacc);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() vacc: | Vaccin): Vaccin | string {
        return this.VaccinService.Modifier(id, vacc);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.VaccinService.Supprimer(id);
    }
}
