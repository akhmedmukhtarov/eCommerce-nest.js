import { Injectable } from '@nestjs/common';
import { Delivery } from '../entities/delivery.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class RefundOrderService {
    async refund(id: number, req: any) {
        try {
            
            const deliveries = await Delivery.find({
                relations: ['orders'],
                where: {
                    user: { id: +req.id },
                    status: "pending" || 'processing',
                },
                loadEagerRelations: true,
            });
            
            for (const delivery of deliveries) {
                for (const order of delivery.orders) {
                    if (+order.id === +id) {                       
                        const result = await Order.update({ id: +id }, { refundRequestedAt: new Date() });
                    }
                }
            }
            return 'You can ask about refund only for your orders';
        } catch (error) {
            throw error;
        }
    }
}
