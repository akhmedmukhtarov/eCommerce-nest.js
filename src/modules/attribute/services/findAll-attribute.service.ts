import { FindAllAttirbuteDto } from './../dto/findAll-attribute.dto';
import { Injectable } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';
import { Pagination } from 'src/common/pagination/pagination';
import { skip } from 'rxjs';
require('dotenv').config()

@Injectable()
export class GetAllAttributeService {
    async findAll(findAllAttirbuteDto: FindAllAttirbuteDto): Promise<Attribute[]> {
        try {
            const {page,limit} = findAllAttirbuteDto;
            const categ = await findAllAttirbuteDto.categ
            const maxPaginationLimit = process.env.MAX_ATTRIBUTE_PAGINATION_LIMIT
            const attributePagination = new Pagination(page,limit,maxPaginationLimit)

            const categories = [];
            if (categ) {
                for (const id of categ) {
                    categories.push({ id: +id });
                }
            }
            const attributes = await Attribute.find({
                relations: ['values', 'categories'],
                loadEagerRelations: true,
                where: {
                    categories,
                },
                take: attributePagination.limit,
                skip: attributePagination.skippedItems
            });
            return attributes;
        } catch (err) {
            throw err;
        }
    }
}
