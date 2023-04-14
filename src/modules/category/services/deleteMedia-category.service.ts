import { Category } from '../entities/category.entity';
import { DeleteMediaCategoryDto } from './../dto/deleteMedia-category.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteMediaCategoryService {
    async deleteMedia(slug: string, deleteMediaCategoryDto: DeleteMediaCategoryDto) {
        try {
            const { arrayOfUrl } = deleteMediaCategoryDto;
            const category  = await Category.findOneBy({ slug });
            if(!category){
                throw new NotFoundException(`Category with slug: '${slug}' not found`)
            }
            let images: any = category.images
            images = images.split(',');
            for (const url of arrayOfUrl) {
                images = images.filter((el: string) => url != el);
            }
            images = images.join('');
            const result = await Category.update({ slug }, { images });
        } catch (error) {
            throw error;
        }
    }
}
