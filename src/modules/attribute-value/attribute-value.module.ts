import { CreateAttributeValueService } from './services/create-attribute-value.service';
import { Module } from '@nestjs/common';
import { AttributeValueController } from './attribute-value.controller';
import { FindAllAttributeValueService } from './services/findAll-attribute-valuve.service';
import { GetOneAttributeValueService } from './services/getOne-attribute-value.service';
import { UpdateAttributeValueService } from './services/update-attribute-value.service';
import { DeleteAttributeVAlueService } from './services/delete-attribute-value.service';

@Module({
    controllers: [AttributeValueController],
    providers: [
        CreateAttributeValueService,
        FindAllAttributeValueService,
        GetOneAttributeValueService,
        UpdateAttributeValueService,
        DeleteAttributeVAlueService,
    ],
})
export class AttributeValueModule {}
