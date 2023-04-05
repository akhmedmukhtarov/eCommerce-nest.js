import { UpdateBrandDto } from './../dto/update-brand.dto';
import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class UpdateBrandService {
    async update(id: string, updateBrandDto: UpdateBrandDto) {
        try {
            const result = await Brand.update(+id, updateBrandDto);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
