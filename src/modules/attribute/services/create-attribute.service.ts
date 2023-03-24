import { CreateAttributeDto } from '../dto/create-attribute.dto';

import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class CreateAttributeService {
    async create(createAttributeDto: CreateAttributeDto) {
        try {
            const { nameRu, nameUz, isFilterable } = createAttributeDto;
            const slug = nameUz
                .split("'")
                .join('')
                .split(' ')
                .join('_')
                .split('/')
                .join('')
                .toLowerCase();
            const attribute = Attribute.create({
                nameRu,
                nameUz,
                isFilterable,
                slug,
            });
            attribute.save();
        } catch (err) {
            throw new err();
        }
    }
}
