/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import { Contact } from 'src/contacts/entities/contact.entity';
import { DateTime } from 'luxon';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactsService } from 'src/contacts/contacts.service';

@Injectable()
export class MailingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private readonly contactsService: ContactsService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  public async sendMail() {
    await this.setTransport();

    const contacts = await this.contactsService.findByDate();

    if (contacts.length === 0) return;

    contacts.forEach(async (contact) => {
      await this.mailerService
        .sendMail({
          transporterName: 'gmail',
          to: contact.email,
          from: 'noreply@nestjs.com',
          subject: 'Feliz Cumpleaños',
          template: 'actions',
          attachments: [{
            filename: 'happy-birthday.jpg',
            path: __dirname + '/assets/happy-birthday.jpg',
            cid: 'happy-birthday'
          }],
          context: {
            // Data to be sent to template engine..
            name: contact.name,
            surname: contact.surname,
          },
        })
        .then((success) => {
          console.log(success);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
