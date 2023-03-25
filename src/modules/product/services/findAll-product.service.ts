import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class FindAllProductService {
    async findAll(query: any) {
        try {
            const products = await Product.find();
            // return products;
            return query
        } catch (err) {
            throw err;
        }
    }
}
