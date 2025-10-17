'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '06:10', latency: 150, packetLoss: 3 },
  { time: '06:20', latency: 200, packetLoss: 5 },
  { time: '06:30', latency: 250, packetLoss: 7 },
  { time: '06:40', latency: 300, packetLoss: 8 },
];

export function IncidentCorrelation() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Bar yAxisId="left" dataKey="latency" fill="#8884d8" name="Latency (ms)" />
        <Bar yAxisId="right" dataKey="packetLoss" fill="#82ca9d" name="Packet Loss (%)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
