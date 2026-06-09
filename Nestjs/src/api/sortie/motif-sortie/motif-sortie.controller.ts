import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import {MotifSortieService} from './motif-sortie.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home/app.swagger';
import { MotifSortie } from './MotifSortie';

@Controller('motif-sortie')
@ApiTags('Motif Sortie')
export class MotifSortieController {

    constructor(private readonly MotifSortieService: MotifSortieService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll(): MotifSortie[] {
        return this.MotifSortieService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetUn(@Param('id') id: string): MotifSortie | string {
        return this.MotifSortieService.FindUn(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() type: MotifSortie): MotifSortie | string {
        return this.MotifSortieService.Creer(type);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() type: MotifSortie): MotifSortie | string {
        return this.MotifSortieService.Modifier(id, type);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.MotifSortieService.Supprimer(id);
    }
}
