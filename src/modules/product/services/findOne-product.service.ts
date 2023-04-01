import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class FindOneProductservice {
    async findOne(id: string) {
        try {
            const product = await Product.find({ 
                relations: ['brand','categories', 'attributeValues', 'orders'],
                loadRelationIds: true,
                where: {
                    id: +id
                }

             });
            return product;
        } catch (err) {
            throw err;
        }
    }
}
