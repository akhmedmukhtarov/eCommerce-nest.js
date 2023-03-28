import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';

@Injectable()
export class FindAllOrderService {
    async findAll() {
        try {
            const orders = await Order.find();
            return orders;
        } catch (error) {
            throw error;
        }
    }
}
