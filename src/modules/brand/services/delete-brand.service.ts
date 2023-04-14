import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class DeleteBrandService {
    async delete(slug: string) {
        try {
            const brand = await Brand.findOneBy({slug})
            if(!brand){
                throw new NotFoundException(`Brand with slug: '${slug}' not found`)
            }
            const result = Brand.delete({ slug });
        } catch (err) {
            throw err;
        }
    }
}
