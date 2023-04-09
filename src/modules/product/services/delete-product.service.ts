import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class DeleteProductService {
    async delete(slug: string) {
        try {
            const result = await Product.delete({slug});
            return result;
        } catch (err) {
            throw err;
        }
    }
}
