import { Injectable } from '@nestjs/common';
import { Category } from 'src/modules/category/entities/category.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import { slugify } from 'src/common/helpers/slugify';

@Injectable()
export class CreateBrandService {
    async create(createBrandDto: CreateBrandDto) {
        try {
            let { nameRu, nameUz, images, isFeatured, status, categoryId } = createBrandDto;

            categoryId = await categoryId;

            const slug = slugify(nameUz);

            const categories = [];
            for (const id of categoryId) {
                const category = await Category.findOneBy({ id });
                categories.push(category);
            }

            let brand = Brand.create({
                nameRu,
                nameUz,
                images,
                isFeatured,
                status,
                categories,
            });
            brand = await brand.save();

            const result = await Brand.update({ id: +brand.id }, { slug: slug + brand.id });
        } catch (err) {
            throw err;
        }
    }
}
