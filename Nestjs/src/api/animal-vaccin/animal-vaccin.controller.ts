import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AnimalVaccinService } from './animal-vaccin.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home/app.swagger';
import { AnimalVaccin } from './AnimalVaccin';

@Controller('animal-vaccin')
export class AnimalVaccinController {
    
    constructor(private readonly connexionService: AnimalVaccinService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    async GetAll(): Promise<AnimalVaccin[]> {
        return await this.connexionService.GetAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetOne(@Param('id') id: string): AnimalVaccin | string {
        return this.connexionService.GetOne(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() conn: AnimalVaccin): AnimalVaccin | string {
        return this.connexionService.Create(conn);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() conn: | AnimalVaccin): AnimalVaccin | string {
        return this.connexionService.Modifier(id, conn);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.connexionService.Supprimer(id);
    }
}
