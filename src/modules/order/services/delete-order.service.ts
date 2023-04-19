import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class DeleteOrderService {
    async delete(id: string) {
        try {
            const order = Order.findOneBy({ id: +id });
            if (!order) {
                throw new NotFoundException(`Order with ID: ${id} not found`);
            }
            await Order.delete({ id: +id });
        } catch (error) {
            throw error;
        }
    }
}
