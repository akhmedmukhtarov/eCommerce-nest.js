import { CreateAttributeValueDto } from './../dto/create-attribute-value.dto';
import { Injectable } from '@nestjs/common';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { AttributeValue } from '../entities/attribute-value.entity';
import { slugify } from 'src/common/helpers/slugify';
import { Product } from 'src/modules/product/entities/product.entity';

@Injectable()
export class CreateAttributeValueService {
    async create(createAttributeValueDto: CreateAttributeValueDto) {
        try {
            let { nameUz, nameRu, attributeId, productId}: any = createAttributeValueDto;
            attributeId = await attributeId
            productId = await productId

            const products = []
            if(productId){
                for(const id of productId){
                    const product = await Product.findOneBy({id})
                    products.push(product)
                }
            }
            
            const slug = slugify(nameUz)
            
            const attribute = await Attribute.findOneBy({ id: attributeId });
            let attributeValue = AttributeValue.create({
                nameUz,
                nameRu,
                attribute,
                products
            });
            attributeValue = await attributeValue.save();
            attributeValue.slug = slug+attributeValue.id
            return await attributeValue.save()
        } catch (err) {
            throw err;
        }
    }
}
