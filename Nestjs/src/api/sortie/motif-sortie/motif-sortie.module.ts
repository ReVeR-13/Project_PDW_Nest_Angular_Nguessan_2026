import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotifSortieEntity } from './entity/motif-sortie.entity';
import { MotifSortieRepository } from './repository/motif-sortie.repository';

@Module({
    controllers: [],
    providers: [MotifSortieRepository],
    imports: [TypeOrmModule.forFeature([MotifSortieEntity])],
    exports: [MotifSortieRepository]
})
export class MotifSortieModule { }
