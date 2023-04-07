
import { Injectable } from '@nestjs/common';
import { Category } from 'src/modules/category/entities/category.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class CreateBrandService {
    async create(createBrandDto: CreateBrandDto) {
        try {
            let { nameRu, nameUz, images, isFeatured, status , categoryId} =
                createBrandDto;
            
            categoryId = await categoryId
            

            const categories = []
            for(const id of categoryId){
                const category = await Category.findOneBy({id})
                categories.push(category)
            }

            const slug = nameUz
                .split("'")
                .join('')
                .split(' ')
                .join('')
                .split('/')
                .join('');
            const brand = Brand.create({
                nameRu,
                nameUz,
                images,
                isFeatured,
                status,
                slug,
                categories
            });
            brand.save();
        } catch (err) {
            throw err;
        }
    }
}

