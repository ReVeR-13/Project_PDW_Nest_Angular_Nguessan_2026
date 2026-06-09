import { Module } from '@nestjs/common';
import { AnimalCompatibiliteController } from './animal-compatibilite.controller';
import { AnimalCompatibiliteService } from './animal-compatibilite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalCompatibiliteEntity } from './entity/animal-compatibilite.entity';
import { AnimalCompatibiliteRepository } from './repository/animal-compatibilite.repository';

@Module({
    controllers: [AnimalCompatibiliteController],
    providers: [AnimalCompatibiliteService,AnimalCompatibiliteRepository],
    imports: [TypeOrmModule.forFeature([AnimalCompatibiliteEntity])],
    exports: [AnimalCompatibiliteRepository]
})
export class AnimalCompatibiliteModule { }
