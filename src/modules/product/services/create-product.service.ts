import { CreateProductDto } from '../dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { slugify } from 'src/common/helpers/slugify';

@Injectable()
export class CreateProductService {
    async create(createProductDto: CreateProductDto) {
        try {
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
                brandId,
            } = createProductDto;

            categoryId = await categoryId;
            attributeValueId = await attributeValueId;
            brandId = await brandId;

            const slug = slugify(nameUz);

            const categories = [];
            for (const id of categoryId) {
                const category = await Category.findOneByOrFail({ id });
                categories.push(category);
            }

            const attributeValues = [];
            for (const attrValueId of attributeValueId) {
                const attributeValue = await AttributeValue.findOneByOrFail({ id: attrValueId });
                attributeValues.push(attributeValue);
            }

            const brand = await Brand.findOneByOrFail({ id: +brandId });

            let product = Product.create({
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
                images,
                categories,
                attributeValues,
                brand,
            });
            product = await product.save();

            const result = await Product.update({ id: product.id }, { slug: slug + product.id });
        } catch (err) {
            throw err;
        }
    }
}
