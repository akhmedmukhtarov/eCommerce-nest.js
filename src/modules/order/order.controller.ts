import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindAllOrdersDto } from './dto/findAll-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderService } from './services/create-order.service';
import { FindAllOrderService } from './services/findAll-order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderService:CreateOrderService,
    private readonly findAllOrderService:FindAllOrderService,
    ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrderService.create(createOrderDto)
  }

  @Get()
  findAll(@Query() findAllOrdersDto: FindAllOrdersDto) {
    return this.findAllOrderService.findAll(findAllOrdersDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
