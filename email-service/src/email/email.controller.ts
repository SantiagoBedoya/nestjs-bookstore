import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from './config';
import { EmailService } from './email.service';
import { MessagePayload } from './types';

@Injectable()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @SqsMessageHandler(config.CONSUMER_NAME)
  async handleMessage(message: AWS.SQS.Message) {
    const payload: MessagePayload = JSON.parse(message.Body);
    this.emailService.sendEmail(payload);
  }
}
