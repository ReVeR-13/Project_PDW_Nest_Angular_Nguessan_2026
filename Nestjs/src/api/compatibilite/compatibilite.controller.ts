import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CompatibiliteService} from './compatibilite.service'
import {Compatibilite} from './Compatibilite';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home/app.swagger';

@Controller('compatibilite')
export class CompatibiliteController {

    constructor(private readonly CompatibiliteService: CompatibiliteService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll(): Compatibilite[] {
        return this.CompatibiliteService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetOne(@Param('id') id: string): Compatibilite | string {
        return this.CompatibiliteService.FindOne(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() cpm: Compatibilite): Compatibilite | string {
        return this.CompatibiliteService.Create(cpm);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() cpm: | Compatibilite): Compatibilite | string {
        return this.CompatibiliteService.Modifier(id, cpm);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.CompatibiliteService.Supprimer(id);
    }
}
