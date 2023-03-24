import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class GetOneBrandService {
    async getOne(id: string) {
        try {
            const brand = await Brand.findOneBy({ id: +id });
            return brand;
        } catch (err) {
            throw err;
        }
    }
}
