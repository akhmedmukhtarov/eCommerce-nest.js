import { Injectable } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';

@Injectable()
export class DeleteAttributeVAlueService {
    async delete(id: string) {
        try {
            AttributeValue.delete({ id: +id });
        } catch (err) {
            throw err;
        }
    }
}
