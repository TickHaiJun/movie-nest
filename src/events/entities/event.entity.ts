import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export enum EventType {
  ALL = 'ALL',
  DRAMA = 'DRAMA',
  MOVIE = 'MOVIE',
  CONCERT = 'CONCERT',
}

@Table({
  tableName: 'events',
})
export class Event extends Model {
  @ApiProperty({ description: '活动ID' })
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

  @ApiProperty({ description: '活动类型', enum: EventType })
  @Column({
    type: DataType.ENUM(...Object.values(EventType)),
    allowNull: false,
  })
  type: EventType;
} 