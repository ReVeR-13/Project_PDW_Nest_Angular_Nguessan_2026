import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CredentialService } from '../service/credential.service'
import { SignInDto } from '../data/dto/sign-in.dto';
import { SignUpDto } from '../data/dto/sign-up.dto';
import { CredentialDto } from '../data/dto/credential.dto';
import { UpdateDto } from '../data/dto/update.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerGeneralController } from 'home';
import { RefreshTokenDto } from '../data/dto/refresh-token.dto';
import { Public } from '../../common/config/metadata/public.decorateur';


@ApiTags('Account')
@Controller('account')
export class CredentialController {

    constructor(private readonly CredentialService: CredentialService) { }

    @Public()
    @Post('signin')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerConnexion)
    public async signIn(@Body() payload: SignInDto): Promise<Partial<CredentialDto> | null> {
        return await this.CredentialService.signIn(payload,false);
    }

    @Public()
    @Post('admin/:signin')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerConnexion)
    public async signInAdmin(@Body() payload: SignInDto): Promise<Partial<CredentialDto> | null> {
        return await this.CredentialService.signIn(payload,true);
    }

    @Public()
    @Post('signup')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    public async signUp(@Body() payload: SignUpDto): Promise<Partial<CredentialDto> | null> {
        console.log(payload)
        return await this.CredentialService.signUp(payload);
    }

    @Public()
    @Post('refresh')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerCreer)
    public async refresh(@Body() payload: RefreshTokenDto): Promise<Partial<CredentialDto> | null> {
        return await this.CredentialService.refreshToken(payload);
    }

    @ApiBearerAuth('access-token')
    @Get('detail/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerUn)
    async GetOne(@Param('id') id: string): Promise<Partial<CredentialDto> | null> {
        return await this.CredentialService.details(id);
    }

    @ApiBearerAuth('access-token')
    @Patch('update/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerModifier)
    public async update(@Param('id') id:string, @Body() data: UpdateDto): Promise<Partial<CredentialDto> | null> {
        return await this.CredentialService.update(id, data);
    }

    @ApiBearerAuth('access-token')
    @Delete('delete/:id')
    @HttpCode(200)
    @ApiOperation(SwaggerGeneralController.SwaggerSupprimer)
    public async delete(@Param('id') id:string): Promise<number> {
        return await this.CredentialService.delete(id);
    }
}


