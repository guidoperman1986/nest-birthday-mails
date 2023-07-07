import { Module } from '@nestjs/common';
import { MailingModule } from './mailing/mailing.module';

import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ContactsModule } from './contacts/contacts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MailingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ContactsModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
