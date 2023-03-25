
import { CreateProductDto } from '../dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';

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
                images,
                // attributeId,
                attributeValueId
            } = createProductDto;
    
            const slug = nameUz.split("'").join('').split(' ').join('').split('/').join('').toLowerCase()
            
            const categories = []
            for(const id of categoryId){
                const [category, ...rest] = await Category.findBy({id})
                categories.push(category)
            }
            
            // const attributes = []
            // for(const attrId of attributeId){
            //     const attribute = await Attribute.findOneBy({id: attrId})
            //     attributes.push(attribute)
            // }
            
            const attributeValues = []
            for(const attrValueId of attributeValueId){
                const attributeValue = await AttributeValue.findOneBy({id: attrValueId})
                attributeValues.push(attributeValue)
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
                categories,
                // attributes,
                attributeValues
            })
            product.save()
        }catch(err){
            throw err
        }
    }
}
