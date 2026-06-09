import { Module } from '@nestjs/common';
import { AnimalVaccinService } from './animal-vaccin.service';
import { AnimalVaccinController } from './animal-vaccin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalVaccinEntity } from './entity/animal-vaccin.entity';
import { AnimalVaccinRepository } from './repository/animal-vaccin.repository';

@Module({
    controllers: [AnimalVaccinController],
    providers: [AnimalVaccinService,AnimalVaccinRepository],
    imports: [TypeOrmModule.forFeature([AnimalVaccinEntity])],
    exports: [AnimalVaccinRepository]
})
export class AnimalVaccinModule { }
