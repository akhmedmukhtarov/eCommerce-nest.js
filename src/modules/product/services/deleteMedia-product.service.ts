import { Product } from '../entities/product.entity';
import { DeleteMediaProductDto } from './../dto/deleteMedia-product.dto';

import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteMediaProductService {
    async deleteMedia(slug: string, deleteMediaProductDto:DeleteMediaProductDto) {
        try {
            const { arrayOfUrl } = deleteMediaProductDto
            const product = await Product.findOneBy({ slug });
            if(!product){
                throw new NotFoundException(`Product with slug: '${slug}' not found`)
            }
            let { images }: any = product.images
            images = images.split(',');
            for (const url of arrayOfUrl) {
                images = images.filter((el: string) => url != el);
            }
            images = images.join('');
            const result = await Product.update({ slug }, { images });
        } catch (error) {
            throw error;
        }
    }
}
