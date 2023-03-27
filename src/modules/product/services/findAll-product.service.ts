import { Injectable } from '@nestjs/common';
import { FindAllProductDto } from '../dto/findAll-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class FindAllProductService {
    async findAll(findAllProductDto: FindAllProductDto) {
        try {
            let {page, limit, attr}:any = findAllProductDto
            page = +page
            limit = +limit
            limit = limit || 15
            limit = limit > 15  ? 15  :limit
            const skippedItems = (+page || 1 - 1) * (+limit);
            const products = await Product.find({
                take: limit,
                skip: skippedItems
            })

            return products

            
        } catch (err) {
            throw err;
        }
    }
}
