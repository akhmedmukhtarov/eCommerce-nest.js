import { CreateAttributeDto } from '../dto/create-attribute.dto';

import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { slugify } from 'src/common/helpers/slugify';
const crypto = require('crypto');

@Injectable()
export class CreateAttributeService {
    async create(createAttributeDto: CreateAttributeDto) {
        try {
            let { nameRu, nameUz, isFilterable, categoryId} = createAttributeDto;
            categoryId = await categoryId

            const slug = slugify(nameUz)
            
            const categories = []
            for(const id of categoryId){
                const category = await Category.findOneBy({id: +id})
                categories.push({category})
            }

            let attribute = Attribute.create({
                nameRu,
                nameUz,
                categories,
                isFilterable,
            });
            attribute = await attribute.save();

            const result =  await Attribute.update({id: +attribute.id},{slug: slug + attribute.id})
        } catch (err) {
            throw err;
        }
    }
}
