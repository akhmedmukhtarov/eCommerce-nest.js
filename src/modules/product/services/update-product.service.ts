import { UpdateProductDto } from '../dto/update-product.dto';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class UpdateProductService {
    async update(id: string, updateProductDto: UpdateProductDto) {
        try {
            const result = await Product.update(+id, updateProductDto);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
