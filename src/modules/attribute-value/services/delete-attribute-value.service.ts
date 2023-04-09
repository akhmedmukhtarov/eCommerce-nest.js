import { Injectable } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';

@Injectable()
export class DeleteAttributeVAlueService {
    async delete(slug: string) {
        try {
            await AttributeValue.delete({slug});
        } catch (err) {
            throw err;
        }
    }
}
