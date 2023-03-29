import { Injectable } from '@nestjs/common';
import { Between } from 'typeorm';
import { FindAllOrdersDto } from '../dto/findAll-order.dto';
import { Delivery } from '../entities/delivery.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class FindAllOrderService {
    async findAll(findAllOrdersDto: FindAllOrdersDto) {
        const [fromYear,fromMonth,fromDay] = findAllOrdersDto.from.split("/")
        const [toYear,toMonth,toDay] = findAllOrdersDto.to.split("/")
        try {
            const orders = await Delivery.find({
                where: {
                    user: {
                        id: +findAllOrdersDto.userId || null,
                    },
                    status: findAllOrdersDto.status,
                    createdAt: Between(
                        new Date(+fromYear,+fromMonth,+fromDay),
                        new Date(+toYear,+toMonth,+toDay) || new Date()
                    ) 
                }
            })
            return orders;
        } catch (error) {
            throw error;
        }
    }
}
