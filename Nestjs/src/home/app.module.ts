import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AbriModule,
  CompatibiliteController,
  CompatibiliteService,
  CouleurModule,
  VaccinController,
  VaccinService
} from '@api/contact';
import { AnimalController, AnimalService,AnimalModule } from '../api/animal';
import { ContactController, ContactService ,ContactModule} from '../api/contact';
import { DemandeModule } from '../api/demande';
import { CompatibiliteModule } from '../api/compatibilite/compatibilite.module';
import { VaccinModule } from '../api/vaccin/vaccin.module';
import { SortieController, SortieService, SortieModule } from '../api/sortie';
import { EntreeController, EntreeService, EntreeModule } from '../api/entree';
import { AdoptionController, AdoptionService, AdoptionModule } from '../api/adoption';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { configManager } from '../api/common/config/config.manager';
import { AccueilModule } from '../api/accueil/accueil.module';
import { SecurityModule } from '../api/security';
import { AnimalCompatibiliteModule } from '../api/animal-compatibilite/animal-compatibilite.module';
import { AnimalVaccinModule } from '../api/animal-vaccin/animal-vaccin.module';
import { DataSource } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'api/security/utils/jwtAuthGuard';


@Module({
  imports: [
    TypeOrmModule.forRoot(configManager.getTypeOrmConfig()),
    DemandeModule,
    AbriModule,
    CouleurModule,
    AnimalModule,
    CompatibiliteModule,
    VaccinModule,
    SortieModule,
    EntreeModule,
    AdoptionModule,
    AccueilModule,
    ContactModule,
    AnimalCompatibiliteModule,
    AnimalVaccinModule,
    SecurityModule],

  controllers: [AppController,
    ContactController,
    CompatibiliteController,
    VaccinController,
    AnimalController,
    SortieController,
    EntreeController,
    AdoptionController],

  providers: [AppService,
    ContactService,
    CompatibiliteService,
    VaccinService,
    AnimalService,
    SortieService,
    EntreeService,
    AdoptionService,
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard
    }
]})

export class AppModule implements OnModuleInit{ 
  
  constructor(
    @InjectDataSource() private readonly data :DataSource
  ){}

  onModuleInit() {
    console.log(`entity loaded:`, this.data.entityMetadatas.map(e => e.name))
  }
}
