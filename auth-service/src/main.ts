import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined'));
  app.setGlobalPrefix('api');
  // app.useGlobalFilters(new ServeStaticFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT');
  await app.listen(port);
  logger.log(`Service running on port ${port}`);
}
bootstrap();
