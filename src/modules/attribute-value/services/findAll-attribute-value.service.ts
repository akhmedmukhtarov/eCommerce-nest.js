import { Injectable, NotFoundException } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';
import { FindAllAttributeValuesDto } from '../dto/findAll-attributeValues.dto';
import { Pagination } from 'src/common/pagination/pagination';
require('dotenv').config()

@Injectable()
export class FindAllAttributeValueService {
    async findAll(findAllAttributeValuesDto:FindAllAttributeValuesDto) {
        try {
            let {attr,page, limit}: any = findAllAttributeValuesDto
            attr = await attr

            const maxAttributeValuePagination = process.env.MAX_ATTRIBUTE_VALUE_PAGINATION_LIMIT
            const attributeValuePagination = new Pagination(page,limit,maxAttributeValuePagination)

            const attributeValues = await AttributeValue.find({
                relations: ['attribute', 'products'],
                loadEagerRelations: true,
                where:{
                    attribute:{
                        slug: attr
                    }
                },
                take: attributeValuePagination.limit,
                skip: attributeValuePagination.skippedItems
            });
            if(!attributeValues){
                throw new NotFoundException(`Attribute values not found`)
            }
            return attributeValues;
        } catch (err) {
            throw err;
        }
    }
}
