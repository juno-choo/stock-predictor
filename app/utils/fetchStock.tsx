// Define the structure for a historical data entry.
// interface YahooFinanceHistoricalEntry {
//   date: string | Date;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
//   // Add other properties if needed, e.g., adjclose?
// }

// import yahooFinance from "yahoo-finance2";

// Define your own type for the data you want to use in the chart.
export interface StockData {
  date: string;
  close: number;
}

export const fetchStockData = async (
  symbol: string
): Promise<StockData[] | null> => {
  try {
    const res = await fetch(`/api/stock/${symbol}`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data: StockData[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};
