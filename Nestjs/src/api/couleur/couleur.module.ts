import { Module } from '@nestjs/common';
import { CouleurController } from './couleur.controller';
import { CouleurService } from './couleur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouleurEntity } from './entity/couleur.entity';
import { CouleurRepository } from './repository/couleur.repository';

@Module({
    controllers: [CouleurController],
    providers:   [CouleurService,CouleurRepository],
    imports:     [TypeOrmModule.forFeature([CouleurEntity])],
    exports:     [CouleurRepository]
})
export class CouleurModule {}
