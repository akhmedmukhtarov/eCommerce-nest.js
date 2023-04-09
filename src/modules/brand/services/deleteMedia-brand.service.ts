import { Injectable } from '@nestjs/common';
import { DeleteMediaBrandDto } from '../dto/deleteMedia-brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class DeleteMediaBrandService {
    async deleteMedia(slug: string, deleteMediaBrandDto: DeleteMediaBrandDto) {
        try {
            const { arrayOfUrl } = deleteMediaBrandDto;
            let { images }: any = await Brand.findOneBy({ slug });
            images = images.split(',');
            for (const url of arrayOfUrl) {
                images = images.filter((el: string) => url != el);
            }
            images = images.join('');
            const result = await Brand.update({ slug }, { images });
        } catch (error) {
            throw error;
        }
    }
}
