import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class FindAllBrandService {
    async findAll() {
        try {
            const brands = await Brand.find();
            return brands;
        } catch (err) {
            throw err;
        }
    }
}
