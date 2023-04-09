import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class DeleteBrandService {
    async delete(slug: string) {
        try {
            const result = Brand.delete({ slug });
            return result;
        } catch (err) {
            throw err;
        }
    }
}
