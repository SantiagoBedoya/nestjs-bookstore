import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        CONSUMER_NAME: Joi.string().required(),
        CONSUMER_URL: Joi.string().required(),
        SMTP_HOST: Joi.string().required(),
        SMTP_PORT: Joi.string().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASS: Joi.string().required(),
      }),
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
