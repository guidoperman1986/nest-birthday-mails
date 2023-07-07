import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './entities/contact.entity';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
})
export class ContactsModule {}
