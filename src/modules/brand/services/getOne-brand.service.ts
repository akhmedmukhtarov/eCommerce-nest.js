import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class GetOneBrandService {
    async getOne(slug: string) {
        try {
            const brand = await Brand.findOneBy({slug});
            return brand;
        } catch (err) {
            throw err;
        }
    }
}
