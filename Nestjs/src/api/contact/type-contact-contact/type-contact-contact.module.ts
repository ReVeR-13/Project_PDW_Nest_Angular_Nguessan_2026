import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeContactContactController, TypeContactContactService } from 'home';
import { TypeContactConnexionEntity } from './entity/type-contact-connexion.entity';
import { TypeContact_ContactRepository } from './repository/type-contact-connexion.repository';

@Module({
    imports: [TypeOrmModule.forFeature([TypeContactConnexionEntity])],
    controllers: [],
    providers: [TypeContact_ContactRepository,],
    exports:[TypeContact_ContactRepository]
})
export class TypeContactContactModule { }
