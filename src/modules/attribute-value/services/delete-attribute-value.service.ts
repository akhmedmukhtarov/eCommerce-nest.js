import { Injectable, NotFoundException } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';

@Injectable()
export class DeleteAttributeVAlueService {
    async delete(slug: string) {
        try {
            const attributeValue = await AttributeValue.findOneBy({slug})
            if(!attributeValue){
                throw new NotFoundException(`Attribute value with slug: '${slug}'not found`)
            }
            await AttributeValue.delete({slug});
        } catch (err) {
            throw err;
        }
    }
}
