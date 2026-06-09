import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotifEntreeEntity } from './entity/motif-entree.entity';
import { MotifEntreeRepository } from './repository/motif-entree.repository';

@Module({
    controllers: [],
    providers: [MotifEntreeRepository],
    imports: [TypeOrmModule.forFeature([MotifEntreeEntity])],
    exports: [MotifEntreeRepository]
})
export class MotifEntreeModule { }
