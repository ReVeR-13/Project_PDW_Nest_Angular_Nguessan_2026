import { Module } from '@nestjs/common';
import { AccueilController } from './accueil.controller';
import { AccueilService } from './accueil.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccueilEntity } from './entity/accueil.entity';
import { AccueilRepository } from './repository/accueil.repository';

@Module({
      controllers: [AccueilController],
      providers: [AccueilService,AccueilRepository],
      imports: [TypeOrmModule.forFeature([AccueilEntity])],
      exports:[AccueilRepository]
})
export class AccueilModule {}
