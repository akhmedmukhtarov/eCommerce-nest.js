import { UpdateBrandDto } from './../dto/update-brand.dto';
import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';

@Injectable()
export class UpdateBrandService {
    async update(id: string, updateBrandDto: UpdateBrandDto) {
        try {
            let {nameUz,nameRu,images,status,isFeatured, categoryId} = updateBrandDto
            categoryId = await categoryId

            const categories = []
            for(const id of categoryId){
                const category = await Category.findOneBy({id})
                categories.push(category)
            }
            const result = await Brand.update({id:+id},{nameUz,nameRu,images,status,isFeatured,categories});
            return result;
        } catch (err) {
            throw err;
        }
    }
}
