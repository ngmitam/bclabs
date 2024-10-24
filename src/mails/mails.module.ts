import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<String>('EMAIL_HOST'),
          port: config.get<Number>('EMAIL_PORT'),
          secure: false,
          auth: {
            user: config.get<String>('EMAIL_USER'),
            pass: config.get<String>('EMAIL_PASS'),
          },
        },
        defaults: {
          from: `[BClabs] <${config.get('ADMIN_EMAIL_ADDRESS')}>`,
        },
        template: {
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
