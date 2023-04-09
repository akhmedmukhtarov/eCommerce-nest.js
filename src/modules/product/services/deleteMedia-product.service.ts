import { Product } from '../entities/product.entity';
import { DeleteMediaProductDto } from './../dto/deleteMedia-product.dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteMediaProductService {
    async deleteMedia(slug: string, deleteMediaProductDto:DeleteMediaProductDto) {
        try {
            const { arrayOfUrl } = deleteMediaProductDto
            let { images }: any = await Product.findOneBy({ slug });
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
