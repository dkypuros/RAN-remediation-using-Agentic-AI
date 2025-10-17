import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThreatRadar } from "@/components/charts/threat-radar";
import { IncidentCorrelation } from "@/components/charts/incident-correlation";

export default function ThreatRadarPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Threat Radar Analysis</h2>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Threat Radar Visualization</CardTitle>
            <CardDescription>
              Multi-dimensional analysis of current threat vectors and severity levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ThreatRadar />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Active Threat Vectors</CardTitle>
            <CardDescription>Current identified threats and their characteristics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 font-mono text-sm">
              <div className="border bg-red-50 dark:bg-red-950/20 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-red-600 dark:text-red-400 font-semibold">Critical Threat</span>
                  <span className="text-gray-600 dark:text-gray-400">2025-01-08 14:59</span>
                </div>
                <p>Vector: DoS Attack (CVE-2022-20919)</p>
                <p>Target: Border Network Infrastructure</p>
                <p>Impact Radius: Cross-border Operations</p>
                <p>AI Confidence: 95%</p>
                <div className="mt-2 text-sm">
                  <p className="text-yellow-600 dark:text-yellow-400">Related Indicators:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Malformed CIP packets</li>
                    <li>Device reloads</li>
                    <li>Cross-border latency spikes</li>
                  </ul>
                </div>
              </div>

              <div className="border bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Emerging Threat</span>
                  <span className="text-gray-600 dark:text-gray-400">2025-01-08 14:58</span>
                </div>
                <p>Vector: Protocol Manipulation</p>
                <p>Target: gNodeB Communication</p>
                <p>Impact Radius: Regional Cell Sites</p>
                <p>AI Confidence: 78%</p>
                <div className="mt-2 text-sm">
                  <p className="text-yellow-600 dark:text-yellow-400">Related Indicators:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Unusual protocol patterns</li>
                    <li>Increased error rates</li>
                    <li>Authentication anomalies</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Real-time Threat Logs</CardTitle>
            <CardDescription>Live system and security event logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] overflow-auto border bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm">
              <div className="space-y-2">
                <div className="text-yellow-600 dark:text-yellow-400">[2025-01-08 15:00:41] WARNING</div>
                <div className="text-gray-600 dark:text-gray-300 pl-4">
                  Detected unusual traffic pattern from IP: 189.120.45.12
                  <br />
                  Protocol: CIP, Packets/sec: 850
                  <br />
                  Destination: Border Router (192.168.1.1)
                </div>

                <div className="text-red-600 dark:text-red-400 mt-4">[2025-01-08 15:00:35] CRITICAL</div>
                <div className="text-gray-600 dark:text-gray-300 pl-4">
                  CVE-2022-20919 exploit attempt detected
                  <br />
                  Source: Mexican Network (189.120.45.12)
                  <br />
                  Target: Cisco 1100 ISR
                  <br />
                  Action: Traffic blocked, admin notified
                </div>

                <div className="text-yellow-600 dark:text-yellow-400 mt-4">[2025-01-08 15:00:30] WARNING</div>
                <div className="text-gray-600 dark:text-gray-300 pl-4">
                  Authentication failure detected
                  <br />
                  Source: Internal Network (192.168.45.78)
                  <br />
                  Target: Authentication Server
                  <br />
                  Details: Multiple failed attempts
                </div>

                <div className="text-blue-600 dark:text-blue-400 mt-4">[2025-01-08 15:00:25] INFO</div>
                <div className="text-gray-600 dark:text-gray-300 pl-4">
                  System scan completed
                  <br />
                  Coverage: All border routers
                  <br />
                  Findings: 2 critical, 3 warnings
                  <br />
                  Next scan scheduled: +30min
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
