import { Body, Controller, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlertsService } from './alerts.service';
import e from 'express';

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @ApiOperation({
    summary: 'Register alert',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        chain: {
          type: 'enum',
          enum: ['ethereum', 'polygon', 'bitcoin'],
          example: 'ethereum',
        },
        price: {
          type: 'number',
          example: 2345.67,
        },
        email: {
          type: 'string',
          example: 'user@bclabs.co.kr',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
  })
  @Put('/register')
  eth2btc(@Body() body) {
    return this.alertsService.registerAlert(
      body.chain,
      Number(body.price),
      body.email,
    );
  }
}
