import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AccueilService } from './accueil.service';
import { Accueil } from './Accueil';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home/app.swagger';

@Controller('accueil')
export class AccueilController {

    constructor(private readonly accueilService: AccueilService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll(): Accueil[] {
        return this.accueilService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetOne(@Param('id') id: string): Accueil | string {
        return this.accueilService.FindOne(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() accueil: Accueil): Accueil | string {
        return this.accueilService.Create(accueil);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() accueil: | Accueil): Accueil | string {
        return this.accueilService.Modifier(id, accueil);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.accueilService.Supprimer(id);
    }
}
