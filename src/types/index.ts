export interface StockData {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}
export interface Stock {
  ticker: string;
  price: number;
  change_amount: string;
  change_percentage: string;
  volume: number;
}

export interface FlattenedStock {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: number;
}

export interface StockDataChart {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
export interface ChartData {
  timestamp: string;
  close: number;
  volume: number;
  open: number;
  high: number;
  low: number;
}
export interface TimeSeriesValues {
  "4. close": string;
  "5. volume": string;
  "1. open": string;
  "2. high": string;
  "3. low": string;
}
