import { GetAllRefundOrderDto } from './../dto/getAllRefundOrder.dto';

import { Injectable } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { IsNull, MoreThan, Not } from "typeorm";

@Injectable()
export class GetRefundRequestedOrdersService{
    async getRefundRequestedOrders(getAllRefundOrderDto:GetAllRefundOrderDto){
        const {year,month,day, refunded} = getAllRefundOrderDto
        const refundRequestedOrders = await Order.find({
            where:{
                refundRequestedAt: MoreThan(new Date(year || 0,month || 0,day || 0)),
                refundedAt: refunded ? Not(IsNull()) : IsNull()
            }
        })
        return refundRequestedOrders
    }
}