import { UpdateProductDto } from '../dto/update-product.dto';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class UpdateProductService {
    async update(slug: string, updateProductDto: UpdateProductDto) {
        try {
            const result = await Product.update({slug}, updateProductDto);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
