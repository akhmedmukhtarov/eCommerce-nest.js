import { Injectable, NotFoundException } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class DeleteAttributeService {
    async delete(slug: string) {
        try {
            const attribute = await Attribute.findOneBy({slug})
            if(!attribute){
                throw new NotFoundException(`Attribute with slug: '${slug}' not found`)
            }
            const result = await Attribute.delete({slug});
        } catch (err) {
            throw err;
        }
    }
}
