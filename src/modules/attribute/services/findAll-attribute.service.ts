import { FindAllAttirbuteDto } from './../dto/findAll-attribute.dto';
import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class GetAllAttributeService {
    async findAll(findAllAttirbuteDto: FindAllAttirbuteDto) {
        try {
            let {categ}: any = findAllAttirbuteDto;
            categ = await categ
            console.log(categ);
            

            const categories = [];
            if (categ) {
                for (const id of categ) {
                    categories.push({ id: +id });
                }
            }
            const attributes = await Attribute.find({
                where: {
                    categories,
                },
            });
            return attributes;
        } catch (err) {
            throw err;
        }
    }
}
