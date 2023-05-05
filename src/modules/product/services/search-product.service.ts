import { SearchProductDto } from './../dto/search-product.dto';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Like, Repository } from 'typeorm';
import { Pagination } from 'src/common/pagination/pagination';
import { InjectRepository } from '@nestjs/typeorm';
require('dotenv').config();

@Injectable()
export class SearchProductService {
    // constructor(
    //     @InjectRepository(Product) private readonly productRepo: Repository<Product>
    // ) {}

    async search(searchProductDto: SearchProductDto) {
        const { page, limit, keyword } = searchProductDto;
        const maxPagination = process.env.MAX_PRODUCT_PAGINATION_LIMIT;
        const pagination = new Pagination(page, limit, maxPagination);

        // const products = await this.productRepo.find()
        const products = await Product.createQueryBuilder('P')
            .select('*')
            .where('P.nameUz LIKE :keyword')
            .orWhere('P.nameRu LIKE :keyword')
            .orWhere('P.nameEn LIKE :keyword')
            .skip(pagination.skippedItems)
            .take(pagination.limit)
            .setParameter('keyword', keyword)
            .getMany();

        return products
    }
}
