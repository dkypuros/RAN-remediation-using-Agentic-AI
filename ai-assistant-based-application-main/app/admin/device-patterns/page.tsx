import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SecurityEventTimeline } from "@/components/charts/security-timeline";

export default function DevicePatternsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Unusual Device Patterns</h2>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Device Behavior Timeline</CardTitle>
            <CardDescription>
              Analysis of unusual patterns and behaviors in network devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <SecurityEventTimeline />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Active Anomalies</CardTitle>
            <CardDescription>Currently detected unusual device behaviors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 font-mono text-sm">
              <div className="border bg-red-50 dark:bg-red-950/20 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-red-600 dark:text-red-400 font-semibold">Critical</span>
                  <span className="text-gray-600 dark:text-gray-400">2025-01-08 14:57</span>
                </div>
                <p>Device: cisco-1100-ISR (192.168.1.1)</p>
                <p>Anomaly: Unexpected device reloads</p>
                <p>Frequency: 4 times in last 24h</p>
                <p>Related CVE: CVE-2022-20919</p>
              </div>

              <div className="border bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Warning</span>
                  <span className="text-gray-600 dark:text-gray-400">2025-01-08 14:55</span>
                </div>
                <p>Device: gNodeB-Control (192.168.30.1)</p>
                <p>Anomaly: Unusual traffic pattern</p>
                <p>Detail: High volume of CIP packets</p>
                <p>Source: 189.120.45.12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Device Health Metrics</CardTitle>
            <CardDescription>Performance and health indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 font-mono text-sm">
              <div className="border bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2">
                <p className="font-semibold">cisco-1100-ISR</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">CPU Usage</p>
                    <p className="text-red-600 dark:text-red-400">89%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Memory</p>
                    <p className="text-yellow-600 dark:text-yellow-400">76%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Uptime</p>
                    <p>0h 35m</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Packets/s</p>
                    <p className="text-red-600 dark:text-red-400">1.2k</p>
                  </div>
                </div>
              </div>

              <div className="border bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2">
                <p className="font-semibold">gNodeB-Control</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">CPU Usage</p>
                    <p className="text-yellow-600 dark:text-yellow-400">72%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Memory</p>
                    <p className="text-green-600 dark:text-green-400">45%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Uptime</p>
                    <p>15d 4h</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Packets/s</p>
                    <p className="text-green-600 dark:text-green-400">850</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
