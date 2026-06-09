import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from './data/entity/credential.entity';
import { CredentialService } from './service/credential.service';
import { CredentialController } from './controller/security.controller';
import { TokenEntity } from './data/entity/token.entity';
import { CredentialRepository } from './data/repository/credential.repository';
import { TokenRepository } from './data/repository/token.repository';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './service/token.service';
import { ConfigKey, configManager } from '../common/config';

@Module({
    imports: [
        JwtModule.register({
            global:true,
            secret:configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
            signOptions:{
                expiresIn:configManager.getValueAsNumberOrString(ConfigKey.JWT_TOKEN_EXPIRE_IN) as number
            }
        }),
        TypeOrmModule.forFeature([CredentialEntity,TokenEntity])
    ],

    controllers: [CredentialController],

    providers: [
        CredentialService,
        TokenService,
        CredentialRepository,
        TokenRepository
    ],

    exports: [
        CredentialRepository,
        TokenRepository,
        JwtModule,
        CredentialService
    ]
})
export class SecurityModule { }
