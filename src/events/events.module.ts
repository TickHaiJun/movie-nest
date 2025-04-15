import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { EventsCrawlerService } from './events.crawler.service';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [
    EventsService,
    {
      provide: EventsCrawlerService,
      useClass: EventsCrawlerService,
    },
  ],
  exports: [EventsService],
})
export class EventsModule implements OnModuleInit {
  constructor(private readonly crawlerService: EventsCrawlerService) {
    console.log('EventsModule 初始化');
  }

  async onModuleInit() {
    console.log('开始执行爬虫任务...');
    try {
      await this.crawlerService.crawlDamaiEvents();
      console.log('爬虫任务完成');
    } catch (error) {
      console.error('爬虫任务失败:', error);
    }
  }
} 