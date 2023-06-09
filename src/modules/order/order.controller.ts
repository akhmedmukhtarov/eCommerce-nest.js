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
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteOrderService } from './services/delete-order.service';
@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(
        private readonly createOrderService: CreateOrderService,
        private readonly findAllOrderService: FindAllOrderService,
        private readonly getOneOrderService: GetOneOrderService,
        private readonly refundOrderService: RefundOrderService,
        private readonly getRefundRequestedOrdersService: GetRefundRequestedOrdersService,
        private readonly deleteOrderService:DeleteOrderService,
    ) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
        return this.createOrderService.create(createOrderDto, req);
    }

    @ApiQuery({ name: 'page', required: false, schema: { type: 'integer' }, description: 'pagination page' })
    @ApiQuery({ name: 'limit', required: false, schema: { type: 'integer' }, description: 'pagination limit' })
    @ApiQuery({
        name: 'status',
        required: false,
        schema: { type: 'pending|processing|ontheway|delivered|cancelled' },
        description: 'status of delivery of order',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Query() findAllOrdersDto: FindAllOrdersDto, @Req() req: any) {
        return this.findAllOrderService.findAll(findAllOrdersDto, req);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('view/:id')
    findOne(@Req() req: any, @Param('id') id: string) {
        return this.getOneOrderService.getOne(req, id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string) {
        return this.deleteOrderService.delete(id)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('refund')
    refund(@Body('id') id: number, @Req() req: any) {
        return this.refundOrderService.refund(id, req);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('refund')
    getRefundRequestedOrders(@Body() getAllRefundOrderDto: GetAllRefundOrderDto) {
        return this.getRefundRequestedOrdersService.getRefundRequestedOrders(getAllRefundOrderDto);
    }
}
