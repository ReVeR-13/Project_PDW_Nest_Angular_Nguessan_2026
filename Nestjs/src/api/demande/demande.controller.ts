import { Body, Controller,Delete,Get,HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { DemandeService } from './demande.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home/app.swagger'; 
import { Demande } from './Demande';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { ModifierDemandeDto } from './dto/modifier-demande.dto';

@Controller('demande')
@ApiTags('Demande')
export class DemandeController {

    constructor(private readonly DemandeService: DemandeService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll(): Demande[] {
        return this.DemandeService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    FindAllWithQuery(
        @Query('page')page:string,
        @Query('limit')limit:string,
    ):string{
        return `Page: ${page} Limit: ${limit}`;
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetOne(@Param('id') id: string): Demande | string {
        return this.DemandeService.FindOne(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() demande: CreateDemandeDto): Demande | string {
        return this.DemandeService.Create(demande);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() demande: | ModifierDemandeDto): Demande | string {
        return this.DemandeService.Modifier(id, demande);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.DemandeService.Supprimer(id);
    }
}
