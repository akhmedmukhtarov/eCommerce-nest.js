
import { CreateProductDto } from '../dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Category } from 'src/modules/category/entities/category.entity';

@Injectable()
export class CreateProductService {
    async create(createProductDto: CreateProductDto) {
        try{
            const {
                nameUz,
                nameRu,
                descShortUz,
                descShortRu,
                descriptionUz,
                descriptionRu,
                isFeatured,
                isNew,
                isPopular,
                quantity,
                price,
                discount,
                categoryId,
                status,
                images
            } = createProductDto;
    
            const slug = nameUz.split("'").join('').split(' ').join('').split('/').join('').toLowerCase()
            const categories = []
            for(const id of categoryId){
                const [category, ...rest] = await Category.findBy({id})
                categories.push(category)
            }
            
            const product = Product.create({
                nameUz,
                nameRu,
                descShortUz,
                descShortRu,
                descriptionUz,
                descriptionRu,
                isFeatured,
                isNew,
                isPopular,
                quantity,
                price,
                discount,
                status,
                slug,
                images,
                categories
            })
            product.save()
        }catch(err){
            throw new err
        }
    }
}
