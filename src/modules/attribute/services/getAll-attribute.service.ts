import { Injectable } from '@nestjs/common';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class GetAllAttributeService {
    async getAll() {
        try {
            const attributes = await Attribute.find({
                relations: {values: {
                    products: true
                }}
            });
            return attributes;
            // const attributes = await Attribute.find({loadRelationIds: true})
            // return attributes
            
            // .leftJoinAndSelect(await AttributeValue.findBy({attribute: }))
        } catch (err) {
            throw err;
        }
    }
}
