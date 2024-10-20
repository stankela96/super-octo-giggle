import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { BinanceTickerResponse, LatestPrice } from './types';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class BitcoinPriceService {
  private readonly BINANCE_API_URL =
    'https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT';

  private readonly serviceCommission: number = Number(
    process.env.SERVICE_COMMISSION,
  );

  private updateFrequency: number;

  private readonly logger = new Logger(BitcoinPriceService.name);

  public latestPrice: LatestPrice | null = null;

  async fetchBitcoinPrice(): Promise<void> {
    try {
      const response = await axios.get<BinanceTickerResponse>(
        this.BINANCE_API_URL,
      );

      this.latestPrice = this.calculatePrices(response.data);
      this.logger.log('Latest Price: ' + JSON.stringify(this.latestPrice));
    } catch (error) {
      this.logger.error('Error fetching data from Binance API:', error.message);
    }
  }

  async getLatestPrice(): Promise<LatestPrice | null> {
    if (!this.latestPrice) {
      await this.fetchBitcoinPrice();
    }

    return this.latestPrice;
  }

  private calculatePrices(data: BinanceTickerResponse): LatestPrice {
    const { bidPrice, askPrice } = data;

    const bid: number = parseFloat(bidPrice);
    const ask: number = parseFloat(askPrice);

    const commissionedBid: number = bid * (1 - this.serviceCommission);
    const commissionedAsk: number = ask * (1 + this.serviceCommission);

    return {
      commissionedBid: commissionedBid.toFixed(2),
      commissionedAsk: commissionedAsk.toFixed(2),
      midPrice: ((commissionedBid + commissionedAsk) / 2).toFixed(2),
    };
  }

  async onModuleInit() {
    this.updateFrequency = parseInt(process.env.UPDATE_FREQUENCY, 10) || 10;
    this.startCronJob();
  }

  startCronJob() {
    this.fetchBitcoinPrice();
    setInterval(() => {
      this.logger.log('CRON job triggered at: ' + new Date().toISOString());
      this.fetchBitcoinPrice();
    }, this.updateFrequency * 1000);
  }
}
