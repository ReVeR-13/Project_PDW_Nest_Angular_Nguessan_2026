import { Module } from '@nestjs/common';
import { CompatibiliteRepository } from './repository/compatibilite.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompatibiliteEntity } from './entity/compatibilite.entity';

@Module({
    controllers: [],
    providers: [CompatibiliteRepository],
    imports: [TypeOrmModule.forFeature([CompatibiliteEntity])],
    exports: [CompatibiliteRepository]
})
export class CompatibiliteModule { }
