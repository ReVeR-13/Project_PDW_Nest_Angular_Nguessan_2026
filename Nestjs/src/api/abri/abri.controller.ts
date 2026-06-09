import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AbriService } from './abri.service'
import { SwaggerGeneralController } from 'home/app.swagger';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Abri } from './Abri';
import { AbriCreateDto } from './dto/abriCreate.dto';
import { AbriUpdateDto } from './dto/abriUpdate.dto';

@Controller('abri')
export class AbriController {

    constructor(private readonly AbriService: AbriService) { }

    @ApiBearerAuth('access-token')
    @Get('all')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    async GetAll(): Promise<Partial<AbriCreateDto>[]> {
        return this.AbriService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerId)
    async GetById(@Param('id') id: string):Promise<Partial<AbriCreateDto> | null> {
        return this.AbriService.FindById(id);
    }

    @ApiBearerAuth('access-token')
    @Get('/:libele')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerNom)
    async GetByLibele(@Param('libele') libele: string):Promise<Partial<AbriCreateDto> | null> {
        return this.AbriService.FindByLibele(libele);
    }

    @ApiBearerAuth('access-token')
    @Post('create')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    async Create(@Body() abri: AbriCreateDto):Promise<Partial<AbriCreateDto> | null> {
        return this.AbriService.Create(abri);
    }

    @ApiBearerAuth('access-token')
    @Patch('update/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    async Modifier(@Param('id') id: string, @Body() abri: | AbriUpdateDto):Promise<Partial<AbriCreateDto> | null> {
        return this.AbriService.Modifier(id, abri);
    }

    @ApiBearerAuth('access-token')
    @Delete('delete/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    async Delete(@Param('id') id: string): Promise<string> {
        return this.AbriService.Supprimer(id);
    }
}
