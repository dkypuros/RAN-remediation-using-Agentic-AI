'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    metric: 'Network Anomalies',
    current: 65,
    threshold: 45,
  },
  {
    metric: 'Packet Loss',
    current: 85,
    threshold: 40,
  },
  {
    metric: 'Latency Spikes',
    current: 75,
    threshold: 50,
  },
  {
    metric: 'Authentication Failures',
    current: 45,
    threshold: 30,
  },
  {
    metric: 'Protocol Violations',
    current: 90,
    threshold: 35,
  },
];

export function ThreatRadar() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Current Levels"
          dataKey="current"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Alert Threshold"
          dataKey="threshold"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
