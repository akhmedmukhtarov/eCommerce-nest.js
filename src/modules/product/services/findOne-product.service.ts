import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class FindOneProductservice {
    async findOne(slug: string) {
        try {
            const product = await Product.findOne({
                relations: ['brand', 'categories', 'attributeValues', 'orders'],
                loadRelationIds: true,
                where: {
                    slug,
                },
            });
            Product.update({ id: +product.id }, { viewCount: +product.viewCount + 1 });
            return product;
        } catch (err) {
            throw err;
        }
    }
}
