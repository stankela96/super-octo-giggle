import { Module } from '@nestjs/common';
import { BitcoinPriceController } from './bitcoin-price.controller';
import { BitcoinPriceService } from './bitcoin-price.service';

@Module({
  imports: [],
  controllers: [BitcoinPriceController],
  providers: [BitcoinPriceService],
  exports: [],
})
export class BitcoinPriceModule {}
