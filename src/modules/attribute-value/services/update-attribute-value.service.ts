import { UpdateAttributeValueDto } from './../dto/update-attribute-value.dto';
import { Injectable } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';

@Injectable()
export class UpdateAttributeValueService {
    async update(id: string, updateAttributeValueDto: UpdateAttributeValueDto) {
        try {
            let {nameUz, nameRu, attributeId} = updateAttributeValueDto
            const attribute = await Attribute.findOneBy({id: await attributeId})
            const result = await AttributeValue.update({id: +id}, {nameUz,nameRu,attribute});
            return result
        } catch (err) {
            throw err;
        }
    }
}
