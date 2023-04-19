import { CreateAttributeDto } from '../dto/create-attribute.dto';

import { HttpException, Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { slugify } from 'src/common/helpers/slugify';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
const crypto = require('crypto');

@Injectable()
export class CreateAttributeService {
    async create(createAttributeDto: CreateAttributeDto) {
        try {
            let { nameRu, nameUz, isFilterable, arrayOfCategoryId, arrayOfAttributeValueId}: any = createAttributeDto;
            arrayOfCategoryId = await arrayOfCategoryId
            arrayOfAttributeValueId = await arrayOfAttributeValueId
            const slug = slugify(nameUz)
            
            const categories = []
            if(arrayOfCategoryId){
                for(const id of arrayOfCategoryId){
                const category = await Category.findOneBy({id: +id})
                categories.push(category)
                }
            }

            const attributeValues = []
            if(arrayOfAttributeValueId){
                for(const id of arrayOfAttributeValueId){
                    const attributeValue = await AttributeValue.findOneBy({id})
                    attributeValues.push(attributeValue)
                }
            }
            

            let attribute = Attribute.create({
                nameRu,
                nameUz,
                categories,
                isFilterable,
                values: attributeValues
            });
            attribute = await attribute.save();
            attribute.slug = slug+attribute.id
            return await attribute.save()
        } catch (err) {
            throw err;
        }
    }
}
