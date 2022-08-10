import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as AWS from 'aws-sdk';
import { config } from './config';
import { SqsModule } from '@ssut/nestjs-sqs';

AWS.config.update({
  region: config.AWS_REGION,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        privateKey: readFileSync(configService.get<string>('PRIVATE_KEY_PATH')),
        publicKey: readFileSync(configService.get<string>('PUBLIC_KEY_PATH')),
        signOptions: { expiresIn: '2h', algorithm: 'RS256' },
      }),
    }),
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        consumers: [],
        producers: [
          {
            name: configService.get<string>('EMAIL_QUEUE'),
            queueUrl: configService.get<string>('EMAIL_QUEUE_URL'),
            region: configService.get<string>('AWS_REGION'),
          },
        ],
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
