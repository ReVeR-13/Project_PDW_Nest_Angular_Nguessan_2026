import { Module } from '@nestjs/common';
import { DemandeController } from './demande.controller';
import { DemandeService } from './demande.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeEntity } from './Entity/demande.entity';
import { DemandeRepository } from './repository/demande.repository';


@Module({
  controllers: [DemandeController],
  providers: [DemandeService,DemandeRepository],
  imports:   [DemandeModule,TypeOrmModule.forFeature([DemandeEntity])],
  exports:   [DemandeRepository]
})
export class DemandeModule {}
