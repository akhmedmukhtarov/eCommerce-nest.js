
import { CreateProductDto } from '../dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';

@Injectable()
export class CreateProductService {
    async create(createProductDto: CreateProductDto) {
        try{
            let {
                nameUz,
                nameRu,
                descShortUz,
                descShortRu,
                descriptionUz,
                descriptionRu,
                isFeatured,
                isNew,
                isPopular,
                price,
                discount,
                categoryId,
                status,
                images,
                attributeValueId,
                brandId
            } = createProductDto;

            categoryId = await categoryId
            attributeValueId = await attributeValueId
            brandId = await brandId
    
            const slug = nameUz.split("'").join('').split(' ').join('').split('/').join('').toLowerCase()
            
            const categories = []
            for(const id of categoryId){
                const category = await Category.findOneByOrFail({id})
                categories.push(category)
            }

            
            const attributeValues = []
            for(const attrValueId of attributeValueId){
                const attributeValue = await AttributeValue.findOneByOrFail({id: attrValueId})
                attributeValues.push(attributeValue)
            }

            const brand = await Brand.findOneByOrFail({id: +brandId})

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
                price,
                discount,
                status,
                slug,
                images,
                categories,
                attributeValues,
                brand
            })
            product.save()
        }catch(err){
            throw err
        }
    }
}
