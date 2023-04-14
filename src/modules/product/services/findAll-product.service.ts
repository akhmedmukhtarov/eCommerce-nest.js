import { Injectable, NotFoundException } from '@nestjs/common';
import { Pagination } from 'src/common/pagination/pagination';
import { Category } from 'src/modules/category/entities/category.entity';
import { FindAllProductDto } from '../dto/findAll-product.dto';
import { Product } from '../entities/product.entity';

require('dotenv').config();
@Injectable()
export class FindAllProductService {
    async findAll(findAllProductDto: FindAllProductDto) {
        try {
            const { page, limit, date, isNew, isFeatured, orderCount, viewCount }: any = findAllProductDto;

            let attr:any = await findAllProductDto.attr
            let category = await findAllProductDto.category
            let brand = await findAllProductDto.brand

            const maxLimitOfPagination = process.env.MAX_PRODUCT_PAGINATION_LIMIT;

            const pagination = new Pagination(page, limit, maxLimitOfPagination);

            const attributeValues = [];
            if (attr) {
                attr = attr.split(',').map((el) => +el);
                for (const attrValueSlug of attr) {
                    attributeValues.push({slug : attrValueSlug });
                }
            }

            const categories = [];
            if (category) {
                const categ = await Category.findOneByOrFail({slug: category});
                categories.push({ id: +categ.id });
                const childCategories = await Category.findBy({
                    parentId: +categ.id,
                });
                for (const childCategory of childCategories) {
                    categories.push({ id: +childCategory.id });
                    const grandchildCategories = await Category.findBy({
                        parentId: +childCategory.id,
                    });
                    for (const grandchildCategory of grandchildCategories) {
                        categories.push({ id: +grandchildCategory.id });
                    }
                }
            }

            const products = await Product.findAndCount({
                where: {
                    categories,
                    attributeValues,
                    brand: { slug: brand || null },
                },
                order: {
                    createdAt: date || 'asc',
                    isNew: isNew || 'asc',
                    isFeatured: isFeatured || 'asc',
                    orderCount: orderCount || 'asc',
                    viewCount: viewCount || 'asc',
                },
                take: pagination.limit,
                skip: pagination.skippedItems,
            });
            if(!products){
                throw new NotFoundException(`Any product not found`)
            }
            return products;
        } catch (err) {
            throw err;
        }
    }
}
