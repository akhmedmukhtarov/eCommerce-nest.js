import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class GetAllAttributeService {
    async getAll() {
        try {
            const attributes = await Attribute.find();
            return attributes;
        } catch (err) {
            throw err;
        }
    }
}
