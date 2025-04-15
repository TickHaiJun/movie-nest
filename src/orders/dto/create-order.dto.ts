import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsUUID } from 'class-validator';
import { PaymentMethod } from '../entities/order.entity';

export class CreateOrderDto {
  @ApiProperty({ description: '活动ID' })
  @IsNotEmpty({ message: '活动ID不能为空' })
  @IsUUID('4', { message: '活动ID格式不正确' })
  eventId: string;

  @ApiProperty({ description: '支付方式', enum: PaymentMethod })
  @IsNotEmpty({ message: '支付方式不能为空' })
  @IsEnum(PaymentMethod, { message: '支付方式不正确' })
  paymentMethod: PaymentMethod;
} 