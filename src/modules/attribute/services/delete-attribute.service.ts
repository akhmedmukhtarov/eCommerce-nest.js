import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class DeleteAttributeService {
    async delete(id: string) {
        try {
            const result = await Attribute.delete({ id: +id });
            return result
        } catch (err) {
            throw err;
        }
    }
}
