import { Injectable } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';

@Injectable()
export class GetOneAttributeValueService {
    async getOne(id: string) {
        try {
            const attributeValue = await AttributeValue.find({
                loadRelationIds: true,
                where:{
                    id:+id
                }
            });
            return attributeValue;
        } catch (err) {
            throw err;
        }
    }
}
