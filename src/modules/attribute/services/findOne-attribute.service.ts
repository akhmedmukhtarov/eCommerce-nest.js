import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class FindOneAttributeService {
    async findOne(slug: string) {
        try {
            const attribute = await Attribute.findOneOrFail({
                loadRelationIds: true,
                where: {
                    slug
                }
            });
            return attribute;
        } catch (err) {
            throw err.message;
        }
    }
}
