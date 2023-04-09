import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

@Injectable()
export class UpdateCategoryService {
    async updateCategory(slug: string, updateCategoryDto: UpdateCategoryDto) {
        try {
            const { nameUz, nameRu, parentId, position, isFeatured, status, images } = updateCategoryDto;
            if (!images) {
                const { images } = await Category.findOneBy({ slug });
                Category.update(
                    { slug },
                    {
                        nameUz,
                        nameRu,
                        parentId: await parentId,
                        position,
                        isFeatured,
                        status,
                        images,
                    },
                );
            }
            Category.update(
                { slug },
                {
                    nameUz,
                    nameRu,
                    parentId: await parentId,
                    position,
                    isFeatured,
                    status,
                    images,
                },
            );
        } catch (err) {
            throw err;
        }
    }
}
