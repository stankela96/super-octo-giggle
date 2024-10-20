export type LatestPrice = {
  commissionedBid: string;
  commissionedAsk: string;
  midPrice: string;
};

export interface BinanceTickerResponse {
  bidPrice: string;
  askPrice: string;
}
