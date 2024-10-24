import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as pug from 'pug';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}

  async sendIncreasingPriceAlertMail(
    chain: string,
    percent: number,
    from: number,
    to: number,
  ) {
    const templateFile = join(
      __dirname,
      '../../EMAIL_TEMPLATES/Increasing.pug',
    );
    const htmlBody = this.pugRenderFile(templateFile, {
      chain,
      percent,
      from,
      to,
    });
    return this.mailerService.sendMail({
      to: process.env.RECEIVER_EMAIL,
      subject: '[BClabs] Increasing price alert',
      html: htmlBody,
    });
  }

  async sendReachingPriceAlert(to: string, chain: string, price: number) {
    const templateFile = join(__dirname, '../../EMAIL_TEMPLATES/Reaching.pug');
    const htmlBody = this.pugRenderFile(templateFile, { chain, price });
    return this.mailerService.sendMail({
      to,
      subject: '[BClabs] Reaching price alert',
      html: htmlBody,
    });
  }

  pugRenderFile(templateFile: string, data: any) {
    return pug.renderFile(templateFile, data);
  }
}
