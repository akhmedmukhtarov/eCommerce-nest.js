import { UpdateAttributeValueDto } from './../dto/update-attribute-value.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AttributeValue } from '../entities/attribute-value.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { slugify } from 'src/common/helpers/slugify';
import { Product } from 'src/modules/product/entities/product.entity';

@Injectable()
export class UpdateAttributeValueService {
    async update(attributeValueSlug: string, updateAttributeValueDto: UpdateAttributeValueDto) {
        try {
            let {nameUz, nameRu, attributeId, productId}: any = updateAttributeValueDto
            attributeId = await attributeId
            productId = await productId

            let slug: string
            if(nameUz){
                slug = slugify(nameUz)
            }

            let attribute: any
            if(attributeId){

                attribute = await Attribute.findOneBy({id: + attributeId})
            }

            const products = []
            if(productId){
                for(const id of productId){
                    const product = await Product.findOneBy({id})
                    products.push(product)
                }
            }

            const attributeValue = await AttributeValue.findOneBy({slug: attributeValueSlug})
            if(!attributeValue){
                throw new NotFoundException(`Attribute value with slug ${attributeValueSlug} not found`)
            }else{
                attributeValue.nameUz = nameUz ? nameUz : attributeValue.nameUz
                attributeValue.nameRu = nameRu ? nameRu : attributeValue.nameRu
                attributeValue.attribute = attribute ? attribute : attributeValue.attribute
                attributeValue.slug = slug ? slug+attributeValue.id : attributeValue.slug
                attributeValue.products = products ? products : attributeValue.products

                return await attributeValue.save()
            }
        } catch (err) {
            throw err;
        }
    }
}
