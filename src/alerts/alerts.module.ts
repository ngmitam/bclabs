import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { MailsService } from '../mails/mails.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './alerts.entity';
import { AlertsController } from './alerts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  providers: [AlertsService, MailsService],
  exports: [AlertsService],
  controllers: [AlertsController],
})
export class AlertsModule {}
