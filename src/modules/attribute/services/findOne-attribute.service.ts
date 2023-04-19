import { Injectable, NotFoundException } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class FindOneAttributeService {
    async findOne(slug: string) {
        try {
            const attribute = await Attribute.findOne({
                relations: ['values', 'categories'],
                loadRelationIds: true,
                where: {
                    slug
                }
            });
            if(!attribute){
                throw new NotFoundException(`Attribute with slug: '${slug}' not found`)
            }
            return attribute;
        } catch (err) {
            throw err
        }
    }
}
