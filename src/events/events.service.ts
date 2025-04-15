import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event, EventType } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { SearchEventsDto } from './dto/search-events.dto';
import { Op } from 'sequelize';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventModel.create({ ...createEventDto });
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.findAll();
  }
  
  async search(searchDto: SearchEventsDto) {
    const { title, type, page, pageSize } = searchDto;
    const where: any = {};

    if (title) {
      where.title = {
        [Op.like]: `%${title}%`
      };
    }

    if (type && type !== 'ALL') {
      where.type = type;
    }

    const { count, rows } = await this.eventModel.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['createdAt', 'DESC']],
    });

    return {
      items: rows,
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findByPk(id);
    if (!event) {
      throw new NotFoundException('活动不存在2222');
    }
    return event;
  }

  async update(id: string, updateEventDto: Partial<CreateEventDto>): Promise<Event> {
    const event = await this.findOne(id);
    await event.update(updateEventDto);
    return event;
  }

  async remove(id: string): Promise<void> {
    const event = await this.findOne(id);
    await event.destroy();
  }

}
