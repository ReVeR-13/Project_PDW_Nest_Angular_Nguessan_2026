import { Module } from '@nestjs/common';
import { VaccinService } from './vaccin.service';
import { VaccinController } from './vaccin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinEntity } from './entity/vaccin.entity';
import { EntreeRepository } from './repository/vaccin.repository';

@Module({
    imports: [TypeOrmModule.forFeature([VaccinEntity])],
    controllers: [VaccinController],
    providers: [VaccinService,EntreeRepository],
    exports:[EntreeRepository]
})
export class VaccinModule {}
