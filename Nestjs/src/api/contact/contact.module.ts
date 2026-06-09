import { Module } from '@nestjs/common';
import { TypeContactModule } from './type-contact/type-contact.module';
import { TypeContactContactController, TypeContactContactModule, TypeContactContactService } from './type-contact-contact';
import { TypeContactController, TypeContactService } from './type-contact';
import { ContactEntity } from './entity/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactRepository } from './repository';

@Module({
  exports:[ContactRepository],
  imports:[TypeContactModule,TypeContactContactModule,TypeOrmModule.forFeature([ContactEntity])],
  controllers: [TypeContactController,TypeContactContactController],
  providers: [TypeContactService,TypeContactContactService,ContactRepository]
})
export class ContactModule {}
