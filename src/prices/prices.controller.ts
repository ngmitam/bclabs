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
}
