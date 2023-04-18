import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { slugify } from 'src/common/helpers/slugify';

@Injectable()
export class UpdateCategoryService {
    async updateCategory(categorySlug: string, updateCategoryDto: UpdateCategoryDto) {
        try {
            const { nameUz, nameRu, position, isFeatured, status, images } = updateCategoryDto;
            const parentId = await updateCategoryDto.parentId;
            const arrayOfAttributeId = await updateCategoryDto.arrayOfAttributeId;
            const arrayOfBrandId = await updateCategoryDto.arrayOfBrandId;
            const arrayOfProductId = await updateCategoryDto.arrayOfProductId;
            
            const category = await Category.findOneBy({ slug: categorySlug });
            if(!category){
                throw new NotFoundException(`Catgeory with slug: '${categorySlug}' not found`)
            }


            let slug: string;
            if (nameUz) {
                let slug = slugify(nameUz);
            }

            const attributes = [];
            if (arrayOfAttributeId) {
                for (const id of arrayOfAttributeId) {
                    const attribute = Attribute.findOneBy({ id });
                    attributes.push(attribute);
                }
            }

            const brands = [];
            if (arrayOfBrandId) {
                for (const id of arrayOfBrandId) {
                    const brand = await Brand.findOneBy({ id });
                    brands.push(brand);
                }
            }

            const products = [];
            if (arrayOfProductId) {
                for (const id of arrayOfProductId) {
                    const product = await Product.findOneBy({ id });
                    products.push(product);
                }
            }


            category.nameUz = nameUz ? nameUz : category.nameUz;
            category.nameRu = nameRu ? nameRu : category.nameRu;
            category.position = position ? position : category.position;
            category.isFeatured = isFeatured ? isFeatured : category.isFeatured;
            category.status = status ? status : category.status;
            category.images = images ? images : category.images;
            category.parentId = parentId ? parentId : category.parentId;
            category.slug = slug ? slug+category.id: category.slug;
            category.attributes = attributes ? attributes : category.attributes;
            category.brands = brands ? brands : category.brands;
            category.products = products ? products : category.products;

            return await category.save();
        } catch (err) {
            throw err;
        }
    }
}
