import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class GetOneBrandService {
    async getOne(slug: string) {
        try {
            const brand = await Brand.findOneBy({slug});
            if(!brand){
                throw new NotFoundException(`Brand with slug: '${slug}' not found`)
            }
            return brand;
        } catch (err) {
            throw err;
        }
    }
}
