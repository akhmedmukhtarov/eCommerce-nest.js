import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/common/pagination/pagination';
import { Category } from 'src/modules/category/entities/category.entity';
import { FindAllProductDto } from '../dto/findAll-product.dto';
import { Product } from '../entities/product.entity';

require('dotenv').config();
@Injectable()
export class FindAllProductService {
    async findAll(findAllProductDto: FindAllProductDto) {
        try {
            const { page, limit, brand, date, isNew, isFeatured, orderCount, viewCount }: any = findAllProductDto;

            const maxLimitOfPagination = process.env.MAX_PRODUCT_PAGINATION_LIMIT;

            const pagination = new Pagination(page, limit, maxLimitOfPagination);

            const attributeValues = [];
            if (findAllProductDto.attr) {
                const attr = findAllProductDto.attr.split(',').map((el) => +el);
                for (const attrValueId of attr) {
                    attributeValues.push({ id: attrValueId });
                }
            }

            const categories = [];
            if (findAllProductDto.category) {
                const category = await Category.findOneByOrFail({
                    id: +findAllProductDto.category,
                });
                categories.push({ id: +category.id });
                const childCategories = await Category.findBy({
                    parentId: +category.id,
                });
                for (const childCategory of childCategories) {
                    categories.push({ id: +childCategory.id });
                    const grandchildCategories = await Category.findBy({
                        parentId: childCategory.id,
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
                    brand: { id: +brand || null },
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
            return products;
        } catch (err) {
            throw err;
        }
    }
}
