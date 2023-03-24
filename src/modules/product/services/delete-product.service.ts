import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class DeleteProductService {
    async delete(id: string) {
        try {
            const result = await Product.delete(+id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
