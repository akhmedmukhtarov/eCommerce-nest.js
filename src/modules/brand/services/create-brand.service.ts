import { Injectable } from '@nestjs/common';
import { Category } from 'src/modules/category/entities/category.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import { slugify } from 'src/common/helpers/slugify';

@Injectable()
export class CreateBrandService {
    async create(createBrandDto: CreateBrandDto) {
        try {
            let { nameRu, nameUz, images, isFeatured, status } = createBrandDto;
            const arrayOfCategoryId = await createBrandDto.arrayOfCategoryId

            const slug = slugify(nameUz);

            const categories = [];
            if(arrayOfCategoryId){
                for (const id of arrayOfCategoryId) {
                    const category = await Category.findOneBy({ id });
                    categories.push(category);
                }
            }

            let brand = Brand.create({
                nameRu,
                nameUz,
                images,
                isFeatured,
                status,
                categories,
            });
            brand = await brand.save();
            brand.slug = slug+brand.id
            return await brand.save()
        } catch (err) {
            throw err;
        }
    }
}
