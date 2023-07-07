import { Controller, Get } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @Get('send-mail')
  sendMail() {
    return this.mailingService.sendMail();
  }
}
