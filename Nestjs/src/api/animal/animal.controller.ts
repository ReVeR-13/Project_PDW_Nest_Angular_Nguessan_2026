import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { AnimalService } from './animal.service'
import { SwaggerGeneralController } from 'home/app.swagger';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Animal } from './Animal';
import { Vaccin } from 'api/vaccin';
import { Compatibilite } from 'api/compatibilite/Compatibilite';

@Controller('animal')
export class AnimalController {

    constructor(private readonly AnimalService: AnimalService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll():Promise<Animal[]> {
        return this.AnimalService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetUn(@Param('id') id: string): Animal | string {
        return this.AnimalService.FindUn(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() animal: Animal): Animal | string {
        return this.AnimalService.Creer(animal);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() animal: Animal): Animal | string {
        return this.AnimalService.Modifier(id, animal);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.AnimalService.Supprimer(id);
    }

    @ApiBearerAuth('access-token')
    @Get('/:vaccin')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAllVaccin(@Param('id_animal') id: string): Vaccin[] {
        return this.AnimalService.AllVaccin(id);
    }

    @ApiBearerAuth('access-token')
    @Put('/:vaccin')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAddVaccin)
    AddVaccin(@Param('id') id: string, @Body() vaccin: Vaccin): Animal | string {
        return this.AnimalService.AddVaccin(vaccin, id);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:vaccin')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAddVaccin)
    SupprimerVaccin(@Param('idAnimal') idAnimal: string, @Body() vaccin: Vaccin): Animal | string {
        return this.AnimalService.SupprimerVaccin(idAnimal, vaccin);
    }

    @ApiBearerAuth('access-token')
    @Get('/:vaccin-un')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetUnVaccin(@Param('idAnimal') idAnimal: string, @Body() vacc: Vaccin): Vaccin | undefined {
        return this.AnimalService.FindUnVaccin(idAnimal, vacc);
    }

    @ApiBearerAuth('access-token')
    @Get('/:compatibilite')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAllCompatibilite(@Param('id_animal') id: string): Compatibilite[] {
        return this.AnimalService.AllCompatibilite(id);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:compatibilite')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAddVaccin)
    AddCompatibilite(@Param('id') id: string, @Body() comp: Compatibilite): Animal | string {
        return this.AnimalService.AddCompatibilite(comp, id);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:compatibilite')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAddVaccin)
    SupprimerCompatibilite(@Param('idAnimal') idAnimal: string, @Body() comp: Compatibilite): Animal | string {
        return this.AnimalService.SupprimerCompatibilite(idAnimal, comp);
    }

    @ApiBearerAuth('access-token')
    @Get('/:compatibilite-un')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetUnCompatibilite(@Param('idAnimal') idAnimal: string, @Body() comp: Compatibilite): Compatibilite | null {
        return this.AnimalService.FindUnCompatibilite(idAnimal, comp);
    }
}
