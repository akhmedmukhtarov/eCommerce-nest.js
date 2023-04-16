import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';

Injectable();
export class GetOneCategoryService {
    async getOneCategory(slug: string) {
        try {
            const category = await Category.findOne({
                where: { slug },
                relations: ['products', 'attributes'],
                loadEagerRelations: true,
                order: { nameUz: 'ASC' },
            });
            if(!category.length == 0){
                throw new NotFoundException(`Category with slug: '${slug}' not found`)
            }
            return category;
        } catch (err) {
            throw err;
        }
    }
}
