import { Module } from '@nestjs/common';
import { MotifSortieController } from './motif-sortie/motif-sortie.controller';
import { MotifSortieService } from './motif-sortie/motif-sortie.service';
import { MotifSortieModule } from './motif-sortie/motif-sortie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortieEntity } from './entity/sortie.entity';
import { SortieRepository } from './repository/sortie.repository';

@Module({
  controllers: [ MotifSortieController],
  providers: [ MotifSortieService,SortieRepository],
  imports: [ MotifSortieModule,TypeOrmModule.forFeature([SortieEntity])],
  exports:[SortieRepository]
})
export class SortieModule {}
