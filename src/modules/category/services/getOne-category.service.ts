import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

Injectable();
export class GetOneCategoryService {
    async getOneCategory(id: string) {
        try {
            const category = await Category.find({
                where: [{ id: +id }, { parentId: +id }],
                relations: ['products', 'attributes'],
                loadEagerRelations: true,
                order: { nameUz: 'ASC' },
            });
            return category;
        } catch (err) {
            throw err;
        }
    }
}
