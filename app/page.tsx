// app/page.tsx
"use client";

import { useState } from "react";
import StockForm from "./components/StockForm";
import StockChart from "./components/StockChart";
import { fetchStockData, StockData } from "./utils/fetchStock";

export default function Home() {
  const [data, setData] = useState<StockData[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStockSubmit = async (symbol: string) => {
    setLoading(true);
    const stockData = await fetchStockData(symbol);
    setData(stockData);
    setLoading(false);
  };

  return (
    <main className="main-container">
      <h1 className="header">Stock Trend Predictor</h1>

      <div className="form-container">
        <StockForm onSubmit={handleStockSubmit} />
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      {data && (
        <div className="chart-container">
          <StockChart data={data} />
        </div>
      )}

      {!data && !loading && (
        <p className="empty-text">Enter a stock symbol to see trends.</p>
      )}
    </main>
  );
}
