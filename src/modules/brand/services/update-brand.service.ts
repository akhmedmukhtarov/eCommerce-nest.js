import { UpdateBrandDto } from './../dto/update-brand.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { slugify } from 'src/common/helpers/slugify';

@Injectable()
export class UpdateBrandService {
    async update(brandSlug: string, updateBrandDto: UpdateBrandDto) {
        try {
            let {nameUz,nameRu,images,status,isFeatured}: any = updateBrandDto
            const arrayOfCategoryId = await updateBrandDto.arrayOfCategoryId
            images = images.join('')
            
            const brand = await Brand.findOneBy({slug:brandSlug});
            if(!brand){
                throw new NotFoundException(`Brand with slug: '${brandSlug}' not found`)
            }
            

            let slug: string
            if(nameUz){
                slug = slugify(nameUz)
            }

            const categories = []
            if(arrayOfCategoryId){
                for(const id of arrayOfCategoryId){
                    const category = await Category.findOneBy({id})
                    categories.push(category)
                }        
            }
            brand.nameUz = nameUz ? nameUz : brand.nameUz
            brand.nameRu = nameRu ? nameRu : brand.nameRu
            brand.images = images ? images : brand.images
            brand.status = status ? status : brand.status
            brand.isFeatured = isFeatured ? isFeatured : brand.isFeatured
            brand.categories = categories ? categories : brand.categories
            brand.slug = slug ? slug+brand.id : brand.slug
            return await brand.save();
        } catch (err) {
            throw err;
        }
    }
}
