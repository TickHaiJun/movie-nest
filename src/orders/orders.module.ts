import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, Event])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
