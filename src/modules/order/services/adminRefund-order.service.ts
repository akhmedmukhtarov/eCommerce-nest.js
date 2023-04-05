import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { Delivery } from '../entities/delivery.entity';

@Injectable()
export class AdminRefundOrderService {
    async adminRefund(orderId: number) {
        try {
            const order = await Order.findOneBy({ id: orderId });
            const delivery = await Delivery.findOneBy({ id: order.delivery.id });
            await Delivery.update({ id: delivery.id }, { totalPrice: delivery.totalPrice - order.product.price });
            await Order.delete({ id: order.id });
            const updatedDelivery = await Delivery.findOneBy({id: delivery.id})
            if(!updatedDelivery.orders){
                await Delivery.update({id: delivery.id}, {status: 'cancelled'})
            }
        } catch (error) {
            throw error;
        }
    }
}
