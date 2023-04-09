import { Injectable } from '@nestjs/common';
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
            return attributeValue;
        } catch (err) {
            throw err;
        }
    }
}
