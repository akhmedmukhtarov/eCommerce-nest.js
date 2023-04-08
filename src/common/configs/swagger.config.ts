import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('SDB')
    .setDescription('SDB in nest.js framework')
    .setVersion('1.1')
    .addTag('endpoints')
    .build();
