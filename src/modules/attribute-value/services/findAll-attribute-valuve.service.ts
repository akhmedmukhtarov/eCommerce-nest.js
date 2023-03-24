import { Injectable } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';

@Injectable()
export class FindAllAttributeValueService {
    async findAll() {
        try {
            const attributeValues = await AttributeValue.find();
            return attributeValues;
        } catch (err) {
            throw err;
        }
    }
}
