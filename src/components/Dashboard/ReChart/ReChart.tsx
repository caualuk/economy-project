"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Apr 2", a: 120, b: 80 },
  { name: "Apr 6", a: 210, b: 140 },
  { name: "Apr 10", a: 160, b: 120 },
  { name: "Apr 14", a: 280, b: 190 },
  { name: "Apr 18", a: 220, b: 160 },
  { name: "Apr 23", a: 180, b: 130 },
  { name: "Apr 28", a: 260, b: 200 },
  { name: "May 3", a: 310, b: 230 },
  { name: "May 7", a: 190, b: 150 },
  { name: "May 12", a: 340, b: 260 },
  { name: "May 17", a: 290, b: 220 },
  { name: "May 22", a: 210, b: 170 },
  { name: "May 27", a: 300, b: 240 },
  { name: "Jun 1", a: 260, b: 200 },
  { name: "Jun 5", a: 320, b: 260 },
  { name: "Jun 9", a: 280, b: 220 },
  { name: "Jun 13", a: 360, b: 290 },
  { name: "Jun 18", a: 330, b: 270 },
  { name: "Jun 23", a: 380, b: 310 },
  { name: "Jun 29", a: 340, b: 280 },
];

export default function LineChartExample() {
  return (
    <div className="w-full h-[220px] mt-15">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            vertical={false}
            stroke="#e5e7eb"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 14, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="a"
            stroke="#111827"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="b"
            stroke="#9ca3af"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
