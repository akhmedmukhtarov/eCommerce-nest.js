import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class DeleteAttributeService {
    async delete(slug: string) {
        try {
            const result = await Attribute.delete({slug});
            return result
        } catch (err) {
            throw err;
        }
    }
}
