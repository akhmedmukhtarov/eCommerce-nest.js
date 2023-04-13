import { UpdateProductDto } from '../dto/update-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { slugify } from 'src/common/helpers/slugify';
import { Category } from 'src/modules/category/entities/category.entity';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';

@Injectable()
export class UpdateProductService {
    async update(productSlug: string, updateProductDto: UpdateProductDto) {
        try {
            const {
                nameUz,
                nameRu,
                descShortUz,
                descShortRu,
                descriptionUz,
                descriptionRu,
                status,
                price,
                isFeatured,
                isNew,
                isPopular,
                discount,
                images,
            } = updateProductDto;

            const arrayOfCategoryId = await updateProductDto.arrayOfCategoryId;
            const arrayOfattributeValueId = await updateProductDto.arrayOfattributeValueId;
            const brandId = await updateProductDto.brandId;

            const product = await Product.findOneBy({ slug: productSlug });
            if (!product) {
                throw new NotFoundException(`Product with slug: ${productSlug} not found`);
            }

            let slug: string;
            if (nameUz) {
                slug = slugify(nameUz);
            }

            const categories = [];
            if (arrayOfCategoryId) {
                for (const id of arrayOfCategoryId) {
                    const category = await Category.findOneBy({ id });
                    categories.push(category);
                }
            }

            const attributeValues = [];
            if (arrayOfattributeValueId) {
                for (const id of arrayOfattributeValueId) {
                    const attributeVAlue = await AttributeValue.findOneBy({ id });
                    attributeValues.push(attributeVAlue);
                }
            }

            let brand: Brand;
            if (brandId) {
                brand = await Brand.findOneBy({ id: brandId });
            }

            product.nameUz = nameUz ? nameUz : product.nameUz;
            product.nameRu = nameRu ? nameRu : product.nameRu;
            product.descShortUz = descShortUz ? descShortUz : product.descShortUz;
            product.descShortRu = descShortRu ? descShortRu : product.descShortRu;
            product.descriptionUz = descriptionUz ? descriptionUz : product.descriptionUz;
            product.descriptionRu = descriptionRu ? descriptionRu : product.descriptionRu;
            product.status = status ? status : product.status;
            product.price = price ? price : product.price;
            product.isFeatured = isFeatured ? isFeatured : product.isFeatured;
            product.isNew = isNew ? isNew : product.isNew;
            product.isPopular = isPopular ? isPopular : product.isPopular;
            product.discount = discount ? discount : product.discount;
            product.images = images ? images : product.images;
            product.slug = slug ? slug + product.id : product.slug;
            product.categories = categories ? categories : product.categories;
            product.attributeValues = attributeValues ? attributeValues : product.attributeValues;
            product.brand = brand ? brand : product.brand;

            return await product.save();
        } catch (err) {
            throw err;
        }
    }
}
