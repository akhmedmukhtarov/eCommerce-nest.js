import { UpdateAttributeDto } from './../../attribute/dto/update-attribute.dto';
import { Injectable } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';

@Injectable()
export class UpdateAttributeValueService {
    async update(id: string, updateAttributeDto: UpdateAttributeDto) {
        try {
            const result = await AttributeValue.update(+id, updateAttributeDto);
            return result
        } catch (err) {
            throw err;
        }
    }
}
