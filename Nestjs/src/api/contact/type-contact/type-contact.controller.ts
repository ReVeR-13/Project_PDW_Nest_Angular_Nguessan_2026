import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TypeContactService } from './type-contact.service';
import { TypeContact } from './TypeContacte';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home/app.swagger';

@Controller('type-contact')
@ApiTags('Type Contact')
export class TypeContactController {

    constructor(private readonly typeContactService: TypeContactService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    GetAll(): TypeContact[] {
        return this.typeContactService.FindAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetUn(@Param('id') id: string): TypeContact | string {
        return this.typeContactService.FindUn(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() type: TypeContact): TypeContact | string {
        return this.typeContactService.Creer(type);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() type: TypeContact): TypeContact | string {
        return this.typeContactService.Modifier(id, type);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id: string): string {
        return this.typeContactService.Supprimer(id);
    }
}
