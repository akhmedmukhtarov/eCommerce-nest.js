import { Category } from '../entities/category.entity';
import { DeleteMediaCategoryDto } from './../dto/deleteMedia-category.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteMediaCategoryService {
    async deleteMedia(slug: string, deleteMediaCategoryDto: DeleteMediaCategoryDto) {
        try {
            const { arrayOfUrl } = deleteMediaCategoryDto;
            let { images }: any = await Category.findOneBy({ slug });
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
