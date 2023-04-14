import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllOrdersDto } from '../dto/findAll-order.dto';
import { Delivery } from '../entities/delivery.entity';
import { Pagination } from 'src/common/pagination/pagination';
require('dotenv').config()

@Injectable()
export class FindAllOrderService {
    async findAll(findAllOrdersDto: FindAllOrdersDto, req: any) {
        try {
            const {page,limit,status} = findAllOrdersDto
            const ordersPagination = new Pagination(page,limit,process.env.MAX_ORDER_PAGINATION_LIMIT)
            if (req.role === 'user') {
                const orders = await Delivery.find({
                    relations: ['orders'],
                    loadEagerRelations: true,
                    where: {
                        user: {
                            id: +req.id || null,
                        },
                        status: status,
                    },
                    take: ordersPagination.limit,
                    skip: ordersPagination.skippedItems
                });
                return orders;
            } else {
                const orders = await Delivery.find({
                    relations: ['orders'],
                    loadEagerRelations: true,
                    where:{
                        status: status,
                    },
                    take: ordersPagination.limit,
                    skip: ordersPagination.skippedItems
                });
                if(!orders){
                    throw new NotFoundException(`Any orders not found`)
                }
                return orders;
            }
        } catch (error) {
            throw error;
        }
    }
}
