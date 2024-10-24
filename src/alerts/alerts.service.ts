import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Alert } from './alerts.entity';
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
    private mailsService: MailsService,
  ) {}

  checkAlert(chain: string, lastPrice: number, currentPrice: number) {
    const query = this.alertsRepository
      .createQueryBuilder('alert')
      .where('alert.chain = :chain', { chain })
      .andWhere(
        // price is between lastPrice and currentPrice, it means price reached (by increasing or decreasing)
        new Brackets((qb) => {
          qb.where(
            ':lastPrice <= alert.price AND alert.price <= :currentPrice',
            { lastPrice, currentPrice },
          ).orWhere(
            ':lastPrice >= alert.price AND alert.price >= :currentPrice',
            { lastPrice, currentPrice },
          );
        }),
      );

    query.getMany().then((alerts) => {
      alerts.forEach((alert) =>
        this.mailsService.sendReachingPriceAlert(
          alert.email,
          alert.chain,
          alert.price,
        ),
      );
    });
  }

  registerAlert(chain: string, price: number, email: string) {
    return this.alertsRepository.save({
      chain,
      price,
      email,
    });
  }
}
