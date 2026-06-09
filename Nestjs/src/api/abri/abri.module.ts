import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbriEntity } from './entity/abri.entity';
import { AbriRepository } from './repository/abri.repository';
import { AbriController } from './abri.controller';
import { AbriService } from './abri.service';

@Module({
  providers: [AbriRepository,AbriService],
  controllers: [AbriController],
  imports: [TypeOrmModule.forFeature([AbriEntity])],
  exports: [AbriRepository]
})
export class AbriModule { }
