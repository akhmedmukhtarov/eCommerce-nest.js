import { Module } from '@nestjs/common';
import { AttributeController } from './attribute.controller';
import { CreateAttributeService } from './services/create-attribute.service';
import { DeleteAttributeService } from './services/delete-attribute.service';
import { FindOneAttributeService } from './services/findOne-attribute.service';
import { GetAllAttributeService } from './services/getAll-attribute.service';
import { UpdateAttributeService } from './services/update-attribute.service';

@Module({
    controllers: [AttributeController],
    providers: [
        CreateAttributeService,
        GetAllAttributeService,
        FindOneAttributeService,
        UpdateAttributeService,
        DeleteAttributeService,
    ],
})
export class AttributeModule {}
