import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

@Injectable()
export class DeleteCategoryService {
    async deleteCategory(slug: string) {
        try {
            const result = await Category.delete({ slug });
            return result;
        } catch (err) {
            throw err;
        }
    }
}
