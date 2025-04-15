import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { EventType } from '../entities/event.entity';

export class SearchEventsDto {
  @ApiProperty({ description: '标题（模糊查询）', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: '活动类型', enum: [...Object.values(EventType), 'all'], required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'all' ? value : value?.toUpperCase())
  @IsEnum([...Object.values(EventType), 'all'])
  type?: string;

  @ApiProperty({ description: '页码', default: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ description: '每页数量', default: 10, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize?: number = 10;
} 