import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CreateOrderService } from './services/create-order.service';
import { FindAllOrderService } from './services/findAll-order.service';

@Module({
    controllers: [OrderController],
    providers: [CreateOrderService, FindAllOrderService],
})
export class OrderModule {}
