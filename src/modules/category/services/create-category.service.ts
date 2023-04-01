import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CreateCategoryService {
    async create(createCategoryDto: CreateCategoryDto) {
        try {
            const { nameUz, nameRu, parentId, position, isFeatured, status, images } = createCategoryDto;
            const slug = nameUz.split(' ').join('_').split("'").join('').toLowerCase();

            const category = Category.create({ nameUz, nameRu, parentId, position, isFeatured, status, images, slug });
            category.save();
        } catch (err) {
            throw new HttpException(err.message, err.code || 500);
        }
    }
}
