import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class FindAllProductService {
    async findAll(paginationDto: PaginationDto) {
        try {
            paginationDto.page = Number(paginationDto.page);
            paginationDto.limit = Number(paginationDto.limit);
            const skippedItems = (paginationDto.page || 1 - 1) * paginationDto.limit;
            
            const products = await Product.find({
                take: paginationDto.limit,
                skip: skippedItems

            })

            return products


            // const products = await Product.find();
            // return products;
            // return query
        } catch (err) {
            throw err;
        }
    }
}
