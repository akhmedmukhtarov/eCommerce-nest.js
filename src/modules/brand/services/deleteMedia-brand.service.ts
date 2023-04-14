import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteMediaBrandDto } from '../dto/deleteMedia-brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class DeleteMediaBrandService {
    async deleteMedia(slug: string, deleteMediaBrandDto: DeleteMediaBrandDto) {
        try {
            const { arrayOfUrl } = deleteMediaBrandDto;
            const brand = await Brand.findOneBy({slug})
            if(!brand){
                throw new NotFoundException(`Brand with slug: '${slug}' not found`)
            }
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
