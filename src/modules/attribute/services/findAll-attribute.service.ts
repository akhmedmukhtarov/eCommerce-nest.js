import { FindAllAttirbuteDto } from './../dto/findAll-attribute.dto';
import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class GetAllAttributeService {
    async findAll(findAllAttirbuteDto: FindAllAttirbuteDto) {
        try {
            let { categ}: any = findAllAttirbuteDto;

            const categories = [];
            if (categ) {
                categ = categ.split(',');
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
            // const attributes = await Attribute.find({loadRelationIds: true})
            // return attributes

            // .leftJoinAndSelect(await AttributeValue.findBy({attribute: }))
        } catch (err) {
            throw err;
        }
    }
}
