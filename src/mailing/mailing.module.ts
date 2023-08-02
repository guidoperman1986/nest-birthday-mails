import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from 'src/contacts/entities/contact.entity';
import { ContactsService } from 'src/contacts/contacts.service';

@Module({
  controllers: [MailingController],
  providers: [MailingService, ConfigService, ContactsService],
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
})
export class MailingModule {}
