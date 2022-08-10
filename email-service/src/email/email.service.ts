import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MessagePayload } from './types';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(payload: MessagePayload) {
    await this.mailService.sendMail({
      to: payload.email,
      subject: 'TEST',
      template: 'email',
      context: {
        name: payload.email.split('@')[0],
      },
    });
  }
}
