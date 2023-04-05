import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

@Injectable()
export class GetAllCategoriesService {
    async getAllCategories() {
        try {
            const categories = await Category.find();
            return categories;
        } catch (err) {
            throw err;
        }
    }
}
