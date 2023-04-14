import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class DeleteProductService {
    async delete(slug: string) {
        try {
            const product = await Product.findOneBy({slug})
            if(!product){
                throw new NotFoundException(`Product with slug: '${slug}' not found`)
            }
            const result = await Product.delete({slug});
            return result;
        } catch (err) {
            throw err;
        }
    }
}
