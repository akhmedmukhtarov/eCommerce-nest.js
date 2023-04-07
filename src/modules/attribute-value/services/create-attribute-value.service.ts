import { CreateAttributeValueDto } from './../dto/create-attribute-value.dto';
import { Injectable } from '@nestjs/common';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { AttributeValue } from '../entities/attribute-value.entity';

@Injectable()
export class CreateAttributeValueService {
    async create(createAttributeValueDto: CreateAttributeValueDto) {
        try {
            const { nameUz, nameRu, attributeId } = createAttributeValueDto;

            const attribute = await Attribute.findOneBy({ id: await attributeId });

            const attributeValue = AttributeValue.create({
                nameUz,
                nameRu,
                attribute,
            });
            attributeValue.save();
        } catch (err) {
            throw err;
        }
    }
}
