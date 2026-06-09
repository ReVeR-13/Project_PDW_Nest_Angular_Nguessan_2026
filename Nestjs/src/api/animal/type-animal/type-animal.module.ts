import { Module } from '@nestjs/common';
import { TypeAnimalRepository } from './repository/type-animal.repository';
import { TypeAnimalEntity } from './entity/type-animal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [ TypeAnimalRepository],
    controllers: [],
    imports: [TypeOrmModule.forFeature([TypeAnimalEntity])],
    exports: [TypeAnimalRepository]
})
export class TypeAnimalModule { }
