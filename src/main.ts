import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

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
    .setTitle('Student Question Api')
    .setDescription('Api to use for student and examination')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    include: [AppModule]
  }
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  const instance = await app.listen(8000);
  console.log(`App is running at 8000}`);
}
bootstrap();
