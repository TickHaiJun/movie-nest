import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order, OrderStatus } from './entities/order.entity';
import { Event } from '../events/entities/event.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const event = await this.eventModel.findByPk(createOrderDto.eventId);
    if (!event) {
      throw new NotFoundException('1111');
    }

    return this.orderModel.create({
      ...createOrderDto,
      userId,
      title: event.title,
      time: event.time,
      location: event.location,
      backgroundImage: event.backgroundImage,
      price: event.price,
      status: OrderStatus.PENDING,
    });
  }

  async findAll(userId: string): Promise<Order[]> {
    return this.orderModel.findAll({
      where: { userId },
      include: [Event],
    });
  }

  async findOne(userId: string, id: string): Promise<Order> {
    const order = await this.orderModel.findOne({
      where: { id, userId },
      include: [Event],
    });
    if (!order) {
      throw new NotFoundException('订单不存在');
    }
    return order;
  }

  async update(userId: string, id: string, updateOrderDto: Partial<Order>): Promise<Order> {
    const order = await this.findOne(userId, id);
    await order.update(updateOrderDto);
    return order;
  }

  async remove(userId: string, id: string): Promise<void> {
    const order = await this.findOne(userId, id);
    await order.destroy();
  }
}
