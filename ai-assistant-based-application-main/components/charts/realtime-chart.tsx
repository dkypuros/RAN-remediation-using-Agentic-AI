'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '06:20:00', packets: 150, malformed: 12 },
  { time: '06:25:00', packets: 180, malformed: 15 },
  { time: '06:30:00', packets: 200, malformed: 25 },
  { time: '06:35:00', packets: 220, malformed: 35 },
  { time: '06:40:00', packets: 240, malformed: 45 },
  { time: '06:45:00', packets: 260, malformed: 55 },
];

export function RealtimeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="packets" stroke="#8884d8" name="Total Packets" />
        <Line type="monotone" dataKey="malformed" stroke="#ff0000" name="Malformed Packets" />
      </LineChart>
    </ResponsiveContainer>
  );
}
