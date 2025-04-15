import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

export enum PaymentMethod {
  WECHAT = 'WECHAT',
  ALIPAY = 'ALIPAY',
  CREDIT_CARD = 'CREDIT_CARD',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

@Table({
  tableName: 'orders',
})
export class Order extends Model {
  @ApiProperty({ description: '订单ID' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ description: '标题' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ description: '时间' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  time: Date;

  @ApiProperty({ description: '地点' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  @ApiProperty({ description: '背景图片' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  backgroundImage: string;

  @ApiProperty({ description: '价格' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @ApiProperty({ description: '支付方式', enum: PaymentMethod })
  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
    allowNull: false,
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({ description: '订单状态', enum: OrderStatus })
  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    allowNull: false,
    defaultValue: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  eventId: string;

  @BelongsTo(() => Event)
  event: Event;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
} 