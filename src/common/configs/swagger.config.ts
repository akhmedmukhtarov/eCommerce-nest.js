import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('SDB')
    .setDescription('SDB in nest.js framework')
    .setVersion('1.1')
    .addTag('endpoints')
    .addBearerAuth({type: 'http', scheme: 'bearer', name: 'jwt',description: 'sf'})
    .build();
