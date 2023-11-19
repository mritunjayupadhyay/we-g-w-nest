import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { CardsModule } from './modules/cards/cards.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { OnlinePayModule } from './modules/pay/online-pay.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(['/api', '/api-json'], basicAuth({
    challenge: true,
    users: {
      [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
    },
  }));
  const config = new DocumentBuilder()
    .setTitle('Cards Api')
    .setDescription('Api to use for add and get cards')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    include: [CardsModule, TransactionsModule, OnlinePayModule]
  }
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 8000);
  console.log(`App is running at ${process.env.PORT || 8000}`);
}
bootstrap();
