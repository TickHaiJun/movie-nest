import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { EventType } from '../entities/event.entity';

export class CreateEventDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString({ message: '标题必须是字符串' })
  title: string;

  @ApiProperty({ description: '时间' })
  @IsNotEmpty({ message: '时间不能为空' })
  @IsDateString({}, { message: '时间格式不正确' })
  time: Date;

  @ApiProperty({ description: '地点' })
  @IsNotEmpty({ message: '地点不能为空' })
  @IsString({ message: '地点必须是字符串' })
  location: string;

  @ApiProperty({ description: '背景图片', required: false })
  @IsOptional()
  @IsString({ message: '背景图片必须是字符串' })
  backgroundImage?: string;

  @ApiProperty({ description: '价格' })
  @IsNotEmpty({ message: '价格不能为空' })
  @IsNumber({}, { message: '价格必须是数字' })
  price: number;

  @ApiProperty({ description: '活动类型', enum: EventType })
  @IsNotEmpty({ message: '活动类型不能为空' })
  @IsEnum(EventType, { message: '活动类型不正确' })
  type: EventType;
} 