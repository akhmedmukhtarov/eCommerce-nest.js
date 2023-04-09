import { FindAllCategoryDto } from './../dto/findAll-category.dto';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { Pagination } from 'src/common/pagination/pagination';
require('dotenv').config()

@Injectable()
export class GetAllCategoriesService {
    async getAllCategories(findAllCategoryDto:FindAllCategoryDto) {
        try {
            const {page,limit} = findAllCategoryDto
            const maxPaginationLimit = process.env.MAX_CATEGORY_PAGINATION_LIMIT
            const pagination = new Pagination(page, limit, maxPaginationLimit)
            const categories = await Category.find({
                take: pagination.limit,
                skip: pagination.skippedItems
            });
            return categories;
        } catch (err) {
            throw err;
        }
    }
}
