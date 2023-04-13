import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import { slugify } from 'src/common/helpers/slugify';
import { Product } from 'src/modules/product/entities/product.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';

@Injectable()
export class CreateCategoryService {
    async create(createCategoryDto: CreateCategoryDto) {
        try {
            const { nameUz, nameRu, position, isFeatured, status, images } = createCategoryDto;
            const parentId = await createCategoryDto.parentId;
            const arrayOfProductId = await createCategoryDto.arrayOfProductId;
            const arrayOfAttributeId = await createCategoryDto.arrayOfAttributeId;
            const arrayOfBrandId = await createCategoryDto.arrayOfBrandId

            const slug = slugify(nameUz);

            
            const brands = []
            if(arrayOfBrandId){
                for(const id of arrayOfBrandId){
                    const brand = await Brand.findOneBy({id})
                    brands.push(brand)
                }
            }
            
            const attributes = []
            if(arrayOfAttributeId){
                for(const id of arrayOfAttributeId){
                    const attribute = await Attribute.findOneBy({id})
                    attributes.push(attribute)
                }
            }
            
            const products = [];
            if (arrayOfProductId) {
                for (const id of arrayOfProductId) {
                    const product = await Product.findOneBy({ id });
                    products.push(product);
                }
            }
            
            let category = Category.create({ nameUz, nameRu, parentId, position, isFeatured, status, images, brands, products,attributes});
            category = await category.save();
            category.slug = slug + category.id
            return await category.save()
            
        } catch (err) {
            throw new HttpException(err.message, err.code || 500);
        }
    }
}
