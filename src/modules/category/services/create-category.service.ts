import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import { slugify } from 'src/common/helpers/slugify';

@Injectable()
export class CreateCategoryService {
    async create(createCategoryDto: CreateCategoryDto) {
        try {
            const { nameUz, nameRu, parentId, position, isFeatured, status, images } = createCategoryDto;

            const slug = slugify(nameUz);

            let category = Category.create({ nameUz, nameRu, parentId: await parentId, position, isFeatured, status, images });
            category = await category.save();

            const result = await Category.update({ id: +category.id }, { slug: slug + category.id });
        } catch (err) {
            throw new HttpException(err.message, err.code || 500);
        }
    }
}
