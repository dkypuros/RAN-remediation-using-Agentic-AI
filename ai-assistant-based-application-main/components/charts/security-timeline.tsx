'use client';

import { Timeline, TimelineItem } from '@/components/ui/timeline';

const events = [
  {
    time: '06:20:04',
    title: 'Device Crash Detected',
    description: 'Unexpected reload due to malformed CIP packet from 189.120.45.12',
    type: 'error' as const
  },
  {
    time: '06:25:00',
    title: 'Anomaly Detection',
    description: 'AI model detected pattern matching CVE-2022-20919 exploit signature',
    type: 'warning' as const
  },
  {
    time: '06:45:12',
    title: 'Second Device Crash',
    description: 'Router reloaded again after receiving malformed CIP packets',
    type: 'error' as const
  },
  {
    time: '07:00:00',
    title: 'Cross-Border Impact',
    description: 'Increased latency and packet loss in US-Mexico network segment',
    type: 'info' as const
  }
];

export function SecurityEventTimeline() {
  return (
    <Timeline>
      {events.map((event, index) => (
        <TimelineItem
          key={index}
          title={event.title}
          time={event.time}
          description={event.description}
          type={event.type}
        />
      ))}
    </Timeline>
  );
}
