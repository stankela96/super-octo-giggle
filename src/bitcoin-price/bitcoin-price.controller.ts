import { Controller, Get } from '@nestjs/common';
import { BitcoinPriceService } from './bitcoin-price.service';
import { LatestPrice } from './types';

@Controller('bitcoin-price')
export class BitcoinPriceController {
  constructor(private readonly bitcoinPriceService: BitcoinPriceService) {}

  @Get()
  async getBitcoinPrice(): Promise<LatestPrice | null> {
    return this.bitcoinPriceService.getLatestPrice();
  }
}
