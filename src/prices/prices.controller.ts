import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PricesService } from './prices.service';
import { Price } from './price.entity';

@ApiTags('prices')
@Controller('prices')
export class PricesController {
  constructor(private pricesService: PricesService) {}

  @ApiOperation({
    summary: 'Get prices of each hour (within 24hours) by chain',
  })
  @ApiQuery({ name: 'chain', type: String })
  @ApiResponse({ status: 200, type: [Price] })
  @Get('/history')
  history(@Query('chain') chain) {
    return this.pricesService.getPricesEachHourWithin24HoursByChain(chain);
  }

  @ApiOperation({
    summary: 'Get eth2btc swap rate',
  })
  @ApiQuery({ name: 'amount', type: Number })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        BTC: { type: 'number', description: "The amount of BTC you'll get" },
        FEE: {
          type: 'object',
          properties: {
            ETH: { type: 'number', description: 'The fee in ETH' },
            USD: { type: 'number', description: 'The fee in USD' },
          },
        },
      },
    },
  })
  @Get('/eth2btc')
  eth2btc(@Query('amount') amount) {
    return this.pricesService.eth2btc(amount);
  }
}
