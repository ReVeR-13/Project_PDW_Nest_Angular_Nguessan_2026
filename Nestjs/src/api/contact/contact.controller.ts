import { Body, Controller,Delete,Get, HttpCode, Param, Patch, Post, } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home/app.swagger'; 
import { ContactReponseDto, ContactUpdateDto } from './dto';
import { ContactCreateDto } from './dto/contact-create.dto';



@Controller('contact')
export class ContactController {
    constructor(private readonly Contactservice:ContactService){}

    @ApiBearerAuth('access-token')
    @Get()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerAll)
    async GetAll(): Promise<Partial<ContactReponseDto>[]>{
        return await this.Contactservice.GetAll();
    }

    @ApiBearerAuth('access-token')
    @Get('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    async GetOne(@Param('id')id:string):Promise<Partial<ContactReponseDto>|null>{
        return await this.Contactservice.GetOne(id);
    }

    @ApiBearerAuth('access-token')
    @Post()
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    async Create(@Body()contact:ContactCreateDto):Promise<Partial<ContactReponseDto>>{
        return await this.Contactservice.Create(contact);
    }

    @ApiBearerAuth('access-token')
    @Patch('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    async Modifier(@Param('id')id:string,@Body() contact:ContactUpdateDto):Promise<Partial<ContactReponseDto> | null>{
        console.log(contact)
        return await this.Contactservice.Modifier(id,contact);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    async Delete(@Param('id')id:string):Promise<0|1>{
        return await this.Contactservice.Supprimer(id);
    }
}
