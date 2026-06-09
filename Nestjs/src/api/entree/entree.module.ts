import { Module } from '@nestjs/common';
import { MotifEntreeController } from './motif-entree/motif-entree.controller';
import { MotifEntreeService } from './motif-entree/motif-entree.service';
import { MotifEntreeModule } from './motif-entree/motif-entree.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntreeEntity } from './entity/entree.entity';
import { EntreeRepository } from './repository/entree.repository';

@Module({
  controllers: [MotifEntreeController],
  providers: [MotifEntreeService,EntreeRepository],
  imports: [MotifEntreeModule,TypeOrmModule.forFeature([EntreeEntity])],
  exports:[EntreeRepository]
})
export class EntreeModule {}
