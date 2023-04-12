import { UpdateBrandDto } from './../dto/update-brand.dto';
import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';

@Injectable()
export class UpdateBrandService {
    async update(slug: string, updateBrandDto: UpdateBrandDto) {
        try {
            let {nameUz,nameRu,images,status,isFeatured, categoryId} = updateBrandDto
            categoryId = await categoryId
            
            const categories = []
            if(categoryId){
                for(const id of categoryId){
                    const category = await Category.findOneBy({id})
                    categories.push(category)
                }        
            }
            const brand = await Brand.findOneBy({slug});
            brand.nameUz = nameUz ? nameUz : brand.nameUz
            brand.nameRu = nameRu ? nameRu : brand.nameRu
            brand.images = images ? images : brand.images
            brand.status = status ? status : brand.status
            brand.isFeatured = isFeatured ? isFeatured : brand.isFeatured
            brand.categories = categories ? categories : brand.categories
            return await brand.save();

        } catch (err) {
            throw err;
        }
    }
}
