import { UpdateAttributeDto } from './../dto/update-attribute.dto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';
import { slugify } from 'src/common/helpers/slugify';
import { Category } from 'src/modules/category/entities/category.entity';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';

@Injectable()
export class UpdateAttributeService {
    async update(attributeSlug: string, updateAttributeDto: UpdateAttributeDto) {
        try {
            let { nameRu, nameUz, isFilterable } = updateAttributeDto;
            const arrayOfCategoryId = await updateAttributeDto.arrayOfCategoryId
            const arrayOfAttributeValueId = await updateAttributeDto.arrayOfAttributeValueId
            
            let slug: string;
            if (nameUz) {
                slug = slugify(nameUz);
            }

            const categories = [];
            if (arrayOfCategoryId.length > 0) {
                for (const id of arrayOfCategoryId) {
                    const category = await Category.findOneBy({ id: +id });
                    categories.push(category);
                }
            }

            const values = []
            if(arrayOfAttributeValueId){
                for(const id of arrayOfAttributeValueId){
                    const attributeValue = await AttributeValue.findOneBy({id})
                    values.push(attributeValue)
                }
            }

            const attribute = await Attribute.findOneBy({ slug: attributeSlug });

            if (!attribute) {
                throw new NotFoundException(`Attribute with slug: ${attributeSlug} not found`);
            } else {
                attribute.isFilterable = isFilterable ? isFilterable : attribute.isFilterable;
                attribute.categories = categories ? categories : attribute.categories;
                attribute.nameRu = nameRu ? nameRu : attribute.nameRu;
                attribute.nameUz = nameUz ? nameUz : attribute.nameUz;
                attribute.slug = slug ? slug + attribute.id : attribute.slug;
                attribute.values = values ? values : attribute.values
                return await attribute.save();
            }
        } catch (err) {
            throw err;
        }
    }
}
