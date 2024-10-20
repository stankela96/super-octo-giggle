import { Module } from '@nestjs/common';
import { BitcoinPriceModule } from './bitcoin-price/bitcoin-price.module';

@Module({
  imports: [BitcoinPriceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
