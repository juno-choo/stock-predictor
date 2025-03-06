// app/components/StockChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StockChartProps {
  data: { date: string; close: number }[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => (
  <div className="chart-wrapper">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#bbb" />
        <YAxis stroke="#bbb" domain={["auto", "auto"]} />
        <Tooltip
          contentStyle={{ backgroundColor: "#2d3748", border: "none" }}
        />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default StockChart;
``;
