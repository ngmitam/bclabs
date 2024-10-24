import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './price.entity';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { MailsService } from '../mails/mails.service';

@Module({
  imports: [TypeOrmModule.forFeature([Price])],
  providers: [PricesService, MailsService],
  exports: [PricesService],
  controllers: [PricesController],
})
export class PricesModule {}
