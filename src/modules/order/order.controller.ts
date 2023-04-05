import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindAllOrdersDto } from './dto/findAll-order.dto';
import { CreateOrderService } from './services/create-order.service';
import { FindAllOrderService } from './services/findAll-order.service';
import { GetOneOrderService } from './services/getOne-order.service';
import { RefundOrderService } from './services/refund-order.service';
import { GetAllRefundOrderDto } from './dto/getAllRefundOrder.dto';
import { GetRefundRequestedOrdersService } from './services/getRefundRequestedOrders.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly createOrderService: CreateOrderService,
        private readonly findAllOrderService: FindAllOrderService,
        private readonly getOneOrderService: GetOneOrderService,
        private readonly refundOrderService: RefundOrderService,
        private readonly getRefundRequestedOrdersService:GetRefundRequestedOrdersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
        return this.createOrderService.create(createOrderDto, req);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Query() findAllOrdersDto: FindAllOrdersDto, @Req() req: any) {
        return this.findAllOrderService.findAll(findAllOrdersDto, req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('view/:id')
    findOne(@Req() req: any,@Param('id') id:string) {
        return this.getOneOrderService.getOne(req,id);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string) {}
    

    @UseGuards(JwtAuthGuard)
    @Post('refund')
    refund(@Body('id') id: number, @Req() req: any) {
        return this.refundOrderService.refund(id, req);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Patch('refund')
    refundAdmin(@Body('id') id: number) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('refund')
    getRefundRequestedOrders(@Body() getAllRefundOrderDto:GetAllRefundOrderDto){
        return this.getRefundRequestedOrdersService.getRefundRequestedOrders(getAllRefundOrderDto)
    }
    
}
