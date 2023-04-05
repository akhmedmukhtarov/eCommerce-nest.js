import { CreateOrderDto } from './../dto/create-order.dto';
import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/auth/entities/user.entity';
import { Order } from '../entities/order.entity';
import { Delivery } from '../entities/delivery.entity';
import { Product } from 'src/modules/product/entities/product.entity';

@Injectable()
export class CreateOrderService {
    async create(createOrderDto: CreateOrderDto, req: any) {
        try {
            const { productIdAndQty, deliveryAddress, deliveryPhone, paymentStatus, paymentMethod, note, status, deliveryPrice } = createOrderDto;

            const user = await User.findOneByOrFail({ id: +req.id });
            for (const productInfo of productIdAndQty) {
                const product = await Product.findOneByOrFail({
                    id: productInfo.productId,
                });
            }
            const orders = [];
            let totalPrice = deliveryPrice ? deliveryPrice : 0;
            for (const productInfo of productIdAndQty) {
                const product = await Product.findOneByOrFail({
                    id: productInfo.productId,
                });
                Product.update({id: product.id},{orderCount: product.orderCount+1})
                const qty = productInfo.qty ? productInfo.qty : 1;
                totalPrice += +product.price * qty;
                const order = Order.create({
                    paymentStatus,
                    paymentMethod,
                    product,
                    qty,
                });
                orders.push(await order.save());
            }

            const delivery = Delivery.create({
                user,
                totalPrice,
                note,
                orders,
                status,
                deliveryPrice,
                deliveryAddress,
                deliveryPhone,
            });
            await delivery.save();
        } catch (error) {
            throw error;
        }
    }
}
