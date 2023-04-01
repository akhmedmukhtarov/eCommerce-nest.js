import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class FindOneAttributeService {
    async findOne(id: string) {
        try {
            const attribute = await Attribute.findOneOrFail({
                loadRelationIds: true,
                where: {
                    id: +id
                }
            });
            return attribute;
        } catch (err) {
            throw err.message;
        }
    }
}
