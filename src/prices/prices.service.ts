import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './price.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import Moralis from 'moralis';

@Injectable()
export class PricesService {
  private readonly logger = new Logger(PricesService.name);

  constructor(
    @InjectRepository(Price)
    private pricesRepository: Repository<Price>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async updatePrice() {
    try {
      const response = await Moralis.EvmApi.token.getMultipleTokenPrices(
        {
          chain: '0x1',
          include: 'percent_change',
        },
        {
          tokens: [
            {
              tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            },
            {
              tokenAddress: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
            },
            {
              tokenAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
            },
          ],
        },
      );
      this.pricesRepository.save({
        chain: 'ethereum',
        price: response?.raw?.[0].usdPrice,
        timestamp: Math.floor(Date.now() / 1000),
      });
      this.pricesRepository.save({
        chain: 'polygon',
        price: response?.raw?.[1].usdPrice,
        timestamp: Math.floor(Date.now() / 1000),
      });
      this.pricesRepository.save({
        chain: 'bitcoin',
        price: response?.raw?.[2].usdPrice,
        timestamp: Math.floor(Date.now() / 1000),
      });
    } catch (e) {
      this.logger.error(e);
    }
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

  async eth2btc(amount: any) {
    try {
      const queryETHPrice = this.pricesRepository
        .createQueryBuilder('price')
        .where("price.chain = 'ethereum'")
        .orderBy('price.timestamp', 'DESC')
        .limit(1);
      const ETHprice = (await queryETHPrice.getOne()).price;
      const queryBTCPrice = this.pricesRepository
        .createQueryBuilder('price')
        .where("price.chain = 'bitcoin'")
        .orderBy('price.timestamp', 'DESC')
        .limit(1);
      const BTCprice = (await queryBTCPrice.getOne()).price;

      const fee = 0.03;
      return {
        BTC: (amount * (1 - fee) * ETHprice) / BTCprice,
        FEE: {
          ETH: amount * fee,
          USD: amount * fee * ETHprice,
        },
      };
    } catch (e) {
      this.logger.error(e);
      return 'Something went wrong';
    }
  }
}
