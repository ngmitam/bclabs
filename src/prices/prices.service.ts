import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './price.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private pricesRepository: Repository<Price>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  updatePrice() {
    this.pricesRepository.save({
      chain: 'ethereum',
      price: Math.random(),
      timestamp: Math.floor(Date.now() / 1000),
    });
    this.pricesRepository.save({
      chain: 'polygon',
      price: Math.random(),
      timestamp: Math.floor(Date.now() / 1000),
    });
  }

  /**
   * Retrieve prices of each hour (within 24hours) by chain
   */
  getPricesEachHourWithin24HoursByChain(chain: string): Promise<Price[]> {
    const query = this.pricesRepository
      .createQueryBuilder('price')
      .where('price.chain = :chain', { chain })
      .andWhere('price.timestamp > :timestamp', {
        timestamp: Math.floor(Date.now() / 1000) - 24 * 60 * 60,
      })
      .andWhere('MOD(price.timestamp, 3600) = 0')
      .orderBy('price.timestamp', 'DESC')
      .limit(24);
    return query.getMany();
  }
}
