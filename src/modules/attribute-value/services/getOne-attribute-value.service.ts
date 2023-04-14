import { Injectable, NotFoundException } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';

@Injectable()
export class GetOneAttributeValueService {
    async getOne(slug: string) {
        try {
            const attributeValue = await AttributeValue.find({
                loadRelationIds: true,
                where:{
                    slug
                }
            });
            if(!attributeValue){
                throw new NotFoundException(`Attribute value with slug: '${slug}' not found`)
            }
            return attributeValue;
        } catch (err) {
            throw err;
        }
    }
}
