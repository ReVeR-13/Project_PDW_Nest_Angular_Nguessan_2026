import { Module } from '@nestjs/common';
import { TypeAnimalService } from './type-animal/type-animal.service';
import { TypeAnimalController } from './type-animal/type-animal.controller';
import { TypeAnimalModule } from './type-animal/type-animal.module';
import { VaccinService } from 'api/vaccin/vaccin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from './entities/animal.entity';
import { AnimalRepository } from './repositories/animal.repository';

@Module({
  providers: [TypeAnimalService,VaccinService,AnimalRepository],
  controllers: [TypeAnimalController],
  imports: [TypeAnimalModule,TypeOrmModule.forFeature([AnimalEntity])],
  exports:[AnimalRepository]
})
export class AnimalModule {}
