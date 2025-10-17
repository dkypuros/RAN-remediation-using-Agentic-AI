import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RealtimeChart } from "@/components/charts/realtime-chart";
import { ExpandableAnalysisCard } from "@/components/cards/expandable-analysis-card";

// Placeholder for the real component
const RealtimePacketLogs = () => (
  <Card className="col-span-1">
    <CardHeader>
      <CardTitle>Realtime Packet Logs</CardTitle>
      <CardDescription>Placeholder for packet log visualization</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">The realtime packet logs component will be implemented in future versions.</p>
    </CardContent>
  </Card>
);

export default function PacketAnalysisPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-3xl font-bold tracking-tight">Real-time Packet Analysis</h2>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ExpandableAnalysisCard
          title="Real-time Packet Analysis"
          description="Monitoring CIP packet patterns and anomalies in real-time"
          className="col-span-1"
        >
          <RealtimeChart />
        </ExpandableAnalysisCard>

        <ExpandableAnalysisCard
          title="Real-time Packet Analysis Logs"
          description="Live packet capture and analysis logs from network interfaces"
          className="col-span-1"
        >
          <RealtimePacketLogs />
        </ExpandableAnalysisCard>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Network Traffic Summary</CardTitle>
            <CardDescription>Overview of packet statistics and anomalies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Packets</p>
                <p className="text-2xl font-bold">1,234,567</p>
                <p className="text-sm text-muted-foreground">Last 24 hours</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Anomalous Packets</p>
                <p className="text-2xl font-bold text-yellow-500">2,345</p>
                <p className="text-sm text-muted-foreground">0.19% of total</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-500">15</p>
                <p className="text-sm text-muted-foreground">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
