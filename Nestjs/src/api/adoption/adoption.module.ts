import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionEntity } from './Entity/adoption.entity';
import { AdoptionRepository } from './repository/adoption.repository';

@Module({
  controllers: [],
  providers: [AdoptionRepository],
  imports: [TypeOrmModule.forFeature([AdoptionEntity])],
  exports:[AdoptionRepository]
})
export class AdoptionModule {}
