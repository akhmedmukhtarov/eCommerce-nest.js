import { CreateAttributeValueDto } from './../dto/create-attribute-value.dto';
import { Injectable } from '@nestjs/common';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { AttributeValue } from '../entities/attribute-value.entity';
import { slugify } from 'src/common/helpers/slugify';

@Injectable()
export class CreateAttributeValueService {
    async create(createAttributeValueDto: CreateAttributeValueDto) {
        try {
            let { nameUz, nameRu, attributeId } = createAttributeValueDto;
            attributeId = await attributeId
            
            
            const slug = slugify(nameUz)
            
            const attribute = await Attribute.findOneBy({ id: attributeId });
            console.log(attribute);
            let attributeValue = AttributeValue.create({
                nameUz,
                nameRu,
                attribute,
            });
            attributeValue = await attributeValue.save();

            const result = await AttributeValue.update({id: +attributeValue.id}, {slug: slug + attributeValue.id})
            
        } catch (err) {
            throw err;
        }
    }
}
