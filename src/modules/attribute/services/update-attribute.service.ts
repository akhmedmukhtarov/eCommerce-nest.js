import { UpdateAttributeDto } from './../dto/update-attribute.dto';

import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class UpdateAttributeService {
    async update(slug: string, updateAttributeDto: UpdateAttributeDto) {
        try {
            const result = await Attribute.update({slug}, updateAttributeDto);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
