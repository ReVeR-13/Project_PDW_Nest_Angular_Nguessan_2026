import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import {MotifEntreeService} from './motif-entree.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home/app.swagger';
import { MotifEntree } from './MotifEntree';

@Controller('motif-entree')
@ApiTags('Motif Entree')
export class MotifEntreeController {

    constructor(private readonly MotifEntreeService: MotifEntreeService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll(): MotifEntree[] {
        return this.MotifEntreeService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetUn(@Param('id') id: string): MotifEntree | string {
        return this.MotifEntreeService.FindUn(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() type: MotifEntree): MotifEntree | string {
        return this.MotifEntreeService.Creer(type);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() type: MotifEntree): MotifEntree | string {
        return this.MotifEntreeService.Modifier(id, type);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.MotifEntreeService.Supprimer(id);
    }
}
