import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './price.entity';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { MailsService } from '../mails/mails.service';
import { AlertsService } from '../alerts/alerts.service';
import { Alert } from 'src/alerts/alerts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price, Alert])],
  providers: [PricesService, MailsService, AlertsService],
  exports: [PricesService],
  controllers: [PricesController],
})
export class PricesModule {}
