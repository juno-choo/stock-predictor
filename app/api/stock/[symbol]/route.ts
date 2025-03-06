// app/api/stock/[symbol]/route.ts
import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

// Define the structure for each historical entry from Yahoo Finance.
interface YahooFinanceHistoricalEntry {
  date: string | Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  // ...other properties if needed
}

export async function GET(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  const { symbol } = params;

  try {
    // Fetch historical data using yahoo-finance2 (runs on the server)
    const data = await yahooFinance.historical(symbol, {
      period1: '2008-01-01',
      period2: new Date().toISOString().split('T')[0],
      interval: '1mo', // Monthly data for trend analysis
    });

    // Transform the data to a simpler format for the client
    const transformedData = (data as YahooFinanceHistoricalEntry[]).map((entry) => ({
      date: new Date(entry.date).toLocaleDateString(),
      close: entry.close,
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json({ error: 'Error fetching stock data' }, { status: 500 });
  }
}
