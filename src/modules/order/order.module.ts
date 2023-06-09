import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CreateOrderService } from './services/create-order.service';
import { FindAllOrderService } from './services/findAll-order.service';
import { GetOneOrderService } from './services/getOne-order.service';
import { RefundOrderService } from './services/refund-order.service';
import { GetRefundRequestedOrdersService } from './services/getRefundRequestedOrders.service';
import { DeleteOrderService } from './services/delete-order.service';


@Module({
    controllers: [OrderController],
    providers: [CreateOrderService, FindAllOrderService,GetOneOrderService,RefundOrderService,GetRefundRequestedOrdersService, DeleteOrderService],
})
export class OrderModule {}
