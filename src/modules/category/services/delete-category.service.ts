import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { FindOneAttributeService } from 'src/modules/attribute/services/findOne-attribute.service';

@Injectable()
export class DeleteCategoryService {
    async deleteCategory(slug: string) {
        try {
            const category = await Category.findOneBy({slug})
            if(!category){
                throw new NotFoundException(`Category with slug: '${slug}' not found`)
            }
            const result = await Category.delete({ slug });
        } catch (err) {
            throw err;
        }
    }
}
