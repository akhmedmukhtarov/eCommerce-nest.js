import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class CreateBrandService {
    async create(createBrandDto: CreateBrandDto) {
        try {
            const { nameRu, nameUz, image, isFeatured, status } =
                createBrandDto;
            const slug = nameUz
                .split("'")
                .join('')
                .split(' ')
                .join('')
                .split('/')
                .join('');
            const brand = Brand.create({
                nameRu,
                nameUz,
                image,
                isFeatured,
                status,
                slug,
            });
            brand.save();
        } catch (err) {
            throw err;
        }
    }
}
