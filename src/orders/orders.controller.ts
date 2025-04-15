import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('订单')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: '创建订单' })
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: '获取用户所有订单' })
  findAll(@Request() req) {
    return this.ordersService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定订单' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.ordersService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新订单信息' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<CreateOrderDto>,
  ) {
    return this.ordersService.update(req.user.userId, id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除订单' })
  remove(@Request() req, @Param('id') id: string) {
    return this.ordersService.remove(req.user.userId, id);
  }
} 