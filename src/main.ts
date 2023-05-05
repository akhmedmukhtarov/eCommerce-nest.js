import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './common/configs/swagger.config';
import { log } from 'console';

async function bootstrap() {
  const port = +process.env.PORT
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'verbose', 'warn'],
    cors: true,
    bodyParser: true,
  });
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}))
  await app.listen(port).then(()=> console.log(port));
}
bootstrap();
