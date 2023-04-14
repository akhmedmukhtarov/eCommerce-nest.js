import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { FindAllBrandsDto } from '../dto/findAll-brand.dto';
import { Pagination } from 'src/common/pagination/pagination';
require('dotenv').config()

@Injectable()
export class FindAllBrandService {
    async findAll(findAllBrandsDto:FindAllBrandsDto) {
        try {
            const {page, limit} = findAllBrandsDto
            const maxPaginationLimit = process.env.MAX_BRAND_PAGINATION_LIMIT
            const brandPagination = new Pagination(page,limit,maxPaginationLimit)
            const brands = await Brand.find({
                take: brandPagination.limit,
                skip: brandPagination.skippedItems
            });
            if(!brands){
                throw new NotFoundException(`Any brand not found`)
            }
            return brands;
        } catch (err) {
            throw err;
        }
    }
}
