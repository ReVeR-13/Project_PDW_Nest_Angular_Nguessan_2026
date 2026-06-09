import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TypeContactContactService } from './type-contact-contact.service';
import { TypeContact_Contact } from './TypeContact_Contact';
import { SwaggerGeneralController } from 'home/app.swagger';

@Controller('type-contact-connexion')
export class TypeContactContactController {

    constructor(private readonly connexionService: TypeContactContactService) { }

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    async GetAll(): Promise< TypeContact_Contact[]> {
        return await this.connexionService.GetAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    GetOne(@Param('id') id: string): TypeContact_Contact | string {
        return this.connexionService.GetOne(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    Create(@Body() conn: TypeContact_Contact): TypeContact_Contact | string {
        return this.connexionService.Create(conn);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    Modifier(@Param('id') id: string, @Body() conn: | TypeContact_Contact): TypeContact_Contact | string {
        return this.connexionService.Modifier(id, conn);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    Delete(@Param('id') id:string): string {
        return this.connexionService.Supprimer(id);
    }
}
