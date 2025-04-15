import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { SearchEventsDto } from './dto/search-events.dto';
import { EventsCrawlerService } from './events.crawler.service';
import { EventType } from './entities/event.entity';

@ApiTags('活动')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly crawlerService: EventsCrawlerService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建活动' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get('search')
  @ApiOperation({ summary: '搜索活动' })
  @ApiQuery({ name: 'title', required: false, description: '活动标题（模糊搜索）' })
  @ApiQuery({ name: 'type', required: false, enum: [...Object.values(EventType), 'all'], description: '活动类型' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: '页码', example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: '每页数量', example: 10 })
  search(@Query() searchDto: SearchEventsDto) {
    return this.eventsService.search(searchDto);
  }

  @Get('crawl')
  @ApiOperation({ summary: '手动触发爬虫' })
  async crawl() {
    try {
      await this.crawlerService.crawlDamaiEvents();
      return { message: '爬虫任务已触发' };
    } catch (error) {
      console.error('爬虫任务失败:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: '获取所有活动' })
  findAll() {
    return this.eventsService.findAll();
  }

  // @Get(':id')
  // @ApiOperation({ summary: '获取指定活动' })
  // findOne(@Param('id') id: string) {
  //   return this.eventsService.findOne(id);
  // }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新活动信息' })
  update(@Param('id') id: string, @Body() updateEventDto: Partial<CreateEventDto>) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除活动' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
} 