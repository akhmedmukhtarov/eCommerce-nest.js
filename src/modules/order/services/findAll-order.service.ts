import { Injectable } from '@nestjs/common';
import { Between } from 'typeorm';
import { FindAllOrdersDto } from '../dto/findAll-order.dto';
import { Delivery } from '../entities/delivery.entity';

@Injectable()
export class FindAllOrderService {
    async findAll(findAllOrdersDto: FindAllOrdersDto, req: any) {
        const [fromYear, fromMonth, fromDay] = findAllOrdersDto.from.split('/');
        const [toYear, toMonth, toDay] = findAllOrdersDto.to.split('/');
        try {
            if (req.role === 'user') {
                const orders = await Delivery.find({
                    relations: ['orders'],
                    loadEagerRelations: true,
                    where: {
                        user: {
                            id: +findAllOrdersDto.userId || null,
                        },
                        status: findAllOrdersDto.status,
                        createdAt: Between(new Date(+fromYear, +fromMonth, +fromDay), new Date(+toYear, +toMonth, +toDay) || new Date()),
                    },
                });
                return orders;
            } else {
                const orders = await Delivery.find({
                    relations: ['orders'],
                    loadEagerRelations: true,
                });
                return orders;
            }
        } catch (error) {
            throw error;
        }
    }
}
