import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as puppeteer from 'puppeteer';
import { Event, EventType } from './entities/event.entity';

@Injectable()
export class EventsCrawlerService {
  private readonly logger = new Logger(EventsCrawlerService.name);

  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) {}

  async crawlDamaiEvents() {
    try {
      this.logger.log('开始检查 events 表数据...');
      const count = await this.eventModel.count();
      this.logger.log(`当前 events 表数据条数: ${count}`);
      
      if (count > 0) {
        this.logger.log('Events 表已有数据，跳过爬虫');
        return;
      }

      this.logger.log('开始爬取大麦网数据...');
      const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      this.logger.log('浏览器启动成功');

      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      
      this.logger.log('正在访问大麦网首页...');
      await page.goto('https://www.damai.cn/', {
        waitUntil: 'networkidle0',
        timeout: 60000,
      });
      this.logger.log('页面加载完成');

      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));

      const pageContent = await page.content();
      this.logger.log('页面内容长度:', pageContent.length);

      this.logger.log('等待选择器加载...');
      const selectors = [
        '.dm-content-1',
        '.dm-content-3',
        '.dm-content-6',
        '.dm-content-100',
      ];

      for (const selector of selectors) {
        const exists = await page.$(selector);
        this.logger.log(`选择器 ${selector} 是否存在: ${exists ? '是' : '否'}`);
      }

      await page.waitForSelector(selectors.join(', '));
      this.logger.log('选择器加载完成');

      this.logger.log('开始解析页面数据...');
      const events = await page.evaluate((selectors) => {
        const eventTypes = ['MOVIE', 'DRAMA', 'CONCERT'];
        const results = [];
        
        selectors.forEach((selector) => {
          const section = document.querySelector(selector);
          if (!section) return;
          
          const boxes = section.querySelectorAll('.box-right a, .item, .item-box');
          console.log(`选择器 ${selector} 找到 ${boxes.length} 个活动`);
          
          boxes.forEach((box) => {
            try {
              const img = box.querySelector('img');
              const itemInfo = box.querySelector('.iteminfo, .item-info, .item-desc');
              
              if (img && itemInfo) {
                const title = itemInfo.querySelector('.title, .item-title')?.textContent?.trim();
                const venue = itemInfo.querySelector('.venue, .item-venue')?.textContent?.trim();
                const showtime = itemInfo.querySelector('.showtime, .item-time')?.textContent?.trim();
                const price = itemInfo.querySelector('.price, .item-price')?.textContent?.trim();
                
                if (title && venue && showtime && price) {
                  results.push({
                    title,
                    location: venue,
                    time: showtime,
                    backgroundImage: img.src,
                    price: parseFloat(price.replace('¥', '').trim()),
                    type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
                  });
                }
              }
            } catch (error) {
              console.error('解析活动数据时出错:', error);
            }
          });
        });
        
        console.log('总共找到活动数量:', results.length);
        return results;
      }, selectors);

      this.logger.log(`成功解析到 ${events.length} 条活动数据`);
      
      if (events.length === 0) {
        this.logger.warn('警告：没有找到任何活动数据');
        return;
      }

      this.logger.log('开始保存数据到数据库...');
      for (const event of events) {
        try {
          await this.eventModel.create({
            ...event,
            time: new Date(event.time),
          });
          this.logger.log(`成功保存活动: ${event.title}`);
        } catch (error) {
          this.logger.error(`保存活动失败: ${event.title}`, error);
        }
      }
      this.logger.log(`成功保存 ${events.length} 条活动数据到数据库`);

      await browser.close();
      this.logger.log('爬虫任务完成，浏览器已关闭');
    } catch (error) {
      this.logger.error('爬虫过程中发生错误:', error);
      throw error;
    }
  }
} 