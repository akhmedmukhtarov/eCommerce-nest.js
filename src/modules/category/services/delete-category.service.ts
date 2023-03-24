import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

@Injectable()
export class DeleteCategoryService {
    async deleteCategory(id: string) {
        try {
            const result = await Category.delete({ id: +id });
            return result
        } catch (err) {
            throw err;
        }
    }
}
