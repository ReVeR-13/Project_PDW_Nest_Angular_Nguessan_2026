import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home';
import { CouleurService } from './couleur.service'
import { Couleur } from './Couleur';
import { CreateCouleurDto } from './dto/create.dto';

@Controller('couleur')
export class CouleurController {
    
    constructor(private readonly couleurService: CouleurService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll(): Promise<Couleur[]> {
        return this.couleurService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetUn(@Param('id') id: string): Couleur | string {
        return this.couleurService.FindById(id);
    }

    @ApiBearerAuth('access-token')
    @Get('/:nom')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetUnBy(@Param('nom') couleur: CreateCouleurDto): Couleur | string {
        return this.couleurService.FindById(couleur.nom);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() couleur: CreateCouleurDto): Couleur | string {
        return this.couleurService.Creer(couleur);
    }

    @ApiBearerAuth('access-token')
    @Patch('modifier/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() couleur: CreateCouleurDto): Couleur | string {
        return this.couleurService.Modifier(id, couleur);
    }

    @ApiBearerAuth('access-token')
    @Delete('delete/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.couleurService.Supprimer(id);
    }
}
