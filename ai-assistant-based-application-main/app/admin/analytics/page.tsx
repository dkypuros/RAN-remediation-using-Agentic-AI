import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RealtimeChart } from "@/components/charts/realtime-chart";
import { IncidentCorrelation } from "@/components/charts/incident-correlation";
import { SecurityEventTimeline } from "@/components/charts/security-timeline";
import { ThreatRadar } from "@/components/charts/threat-radar";
import { ExpandableAnalysisCard } from "@/components/cards/expandable-analysis-card";
import { TrafficPatternAnomalies } from "@/components/charts/traffic-pattern-anomalies";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 pr-16">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-3xl font-bold tracking-tight">Security Analytics</h2>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ExpandableAnalysisCard
          title={
            <Link 
              href="/admin/packet-analysis" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              1 - Real-time Packet Analysis
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </Link>
          }
          description="Monitoring CIP packet patterns and anomalies in real-time"
          className="col-span-1"
        >
          <RealtimeChart />
        </ExpandableAnalysisCard>

        <ExpandableAnalysisCard
          title="2 - Real-time Packet Analysis Logs"
          description="Live packet capture and analysis logs from network interfaces"
          className="col-span-1"
        >
          <RealtimePacketLogs />
        </ExpandableAnalysisCard>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>3 - Incident Timeline</CardTitle>
            <CardDescription>Security events and correlation analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <SecurityEventTimeline />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>4 - Incident Correlation</CardTitle>
            <CardDescription>Event correlation and impact analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <IncidentCorrelation />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>5 - Traffic Pattern Anomalies</CardTitle>
            <CardDescription>Detection of unusual traffic patterns and protocol usage</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficPatternAnomalies />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>
              <Link 
                href="/admin/threat-radar" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                6 - Threat Radar
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Link>
            </CardTitle>
            <CardDescription>Real-time threat detection and analysis</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ThreatRadar />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>7 - Detailed Metrics</CardTitle>
            <CardDescription>Detailed analysis of security metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="network" className="w-full">
              <TabsList className="grid w-full grid-cols-5 h-auto gap-1">
                <TabsTrigger value="network" className="text-xs py-1">Network Anomalies</TabsTrigger>
                <TabsTrigger value="packet" className="text-xs py-1">Packet Loss</TabsTrigger>
                <TabsTrigger value="latency" className="text-xs py-1">Latency Spikes</TabsTrigger>
                <TabsTrigger value="auth" className="text-xs py-1">Auth Failures</TabsTrigger>
                <TabsTrigger value="protocol" className="text-xs py-1">Protocol Violations</TabsTrigger>
              </TabsList>
              <TabsContent value="network" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Network Anomaly Details</div>
                    <div className="text-xs font-medium text-red-400">Critical</div>
                  </div>
                  <div className="grid gap-2">
                    <div className="text-xs">
                      <div className="font-medium mb-1">Recent Anomalies</div>
                      <div className="bg-muted rounded-md p-2">
                        Detected 3 significant network anomalies in the past hour.
                        Traffic patterns show unusual spikes in UDP traffic from subnet 192.168.30.0/24.
                      </div>
                    </div>
                    <div className="text-xs">
                      <div className="font-medium mb-1">Affected Systems</div>
                      <div className="bg-muted rounded-md p-2">
                        - Primary gNodeB Controller<br />
                        - Border Router (East)<br />
                        - Authentication Server
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="packet" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Packet Loss Analysis</div>
                    <div className="text-xs font-medium text-yellow-400">Warning</div>
                  </div>
                  <div className="grid gap-2">
                    <div className="text-xs">
                      <div className="font-medium mb-1">Current Status</div>
                      <div className="bg-muted rounded-md p-2">
                        Packet loss rate: 2.3%<br />
                        Affected: Non-critical traffic<br />
                        Location: Eastern sector nodes
                      </div>
                    </div>
                    <div className="text-xs">
                      <div className="font-medium mb-1">Impact Assessment</div>
                      <div className="bg-muted rounded-md p-2">
                        - Minor service degradation<br />
                        - No critical systems affected<br />
                        - Auto-recovery in progress
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="latency" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Latency Analysis</div>
                    <div className="text-xs font-medium text-yellow-400">Warning</div>
                  </div>
                  <div className="grid gap-2">
                    <div className="text-xs">
                      <div className="font-medium mb-1">Latency Metrics</div>
                      <div className="bg-muted rounded-md p-2">
                        Average increase: 45ms<br />
                        Peak latency: 180ms<br />
                        Affected routes: US-MX cross-border
                      </div>
                    </div>
                    <div className="text-xs">
                      <div className="font-medium mb-1">Route Analysis</div>
                      <div className="bg-muted rounded-md p-2">
                        - Texas node: 35ms increase<br />
                        - Mexico node: 55ms increase<br />
                        - Border hop: 90ms increase
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="auth" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Authentication Issues</div>
                    <div className="text-xs font-medium text-red-400">Critical</div>
                  </div>
                  <div className="grid gap-2">
                    <div className="text-xs">
                      <div className="font-medium mb-1">Failed Attempts</div>
                      <div className="bg-muted rounded-md p-2">
                        Total attempts: 12<br />
                        Pattern: Credential stuffing<br />
                        Time window: Last 30 minutes
                      </div>
                    </div>
                    <div className="text-xs">
                      <div className="font-medium mb-1">Source Analysis</div>
                      <div className="bg-muted rounded-md p-2">
                        - Multiple IPs detected<br />
                        - Automated attack pattern<br />
                        - Blacklist updated
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="protocol" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Protocol Violation Details</div>
                    <div className="text-xs font-medium text-red-400">Critical</div>
                  </div>
                  <div className="grid gap-2">
                    <div className="text-xs">
                      <div className="font-medium mb-1">Violation Summary</div>
                      <div className="bg-muted rounded-md p-2">
                        Type: CIP Protocol<br />
                        Matches: CVE-2022-20919<br />
                        Status: Active threat
                      </div>
                    </div>
                    <div className="text-xs">
                      <div className="font-medium mb-1">Mitigation Status</div>
                      <div className="bg-muted rounded-md p-2">
                        - IPS rules updated<br />
                        - Traffic filtering active<br />
                        - Patch deployment pending
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <ExpandableAnalysisCard
          title={
            <Link 
              href="/admin/ai-report" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              8 - CVE-2022-20919 Correlation Analysis
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </Link>
          }
          description="Analysis of vulnerability exploitation patterns and impact"
          className="col-span-2"
        >
          <div className="flex flex-col space-y-6 text-sm">
            <div className="prose prose-invert max-w-none">
              <p>
                It&apos;s early morning in the panhandle of Texas, where you&apos;re dispatched to a cell site in a remote area. Your task is to investigate a CVE-2022-20919 vulnerability that was flagged on a Cisco 1100 ISR router serving a gNodeB in this region. This particular vulnerability relates to the improper handling of malformed Common Industrial Protocol (CIP) packets, allowing attackers to trigger a denial-of-service (DoS) by forcing the device to reload unexpectedly. The implications of such an exploit are significant, especially as this router forms part of a cross-border communication network that connects AT&T&apos;s U.S. and Mexico operations.
              </p>
              <p>
                Your AI-equipped laptop is loaded with PostHog, linked to the National Vulnerability Database, and preconfigured with anomaly detection models. You are aware of recent issues in this area with unusual latency spikes between nodes operated by AT&T in the U.S. and recently acquired infrastructure in Mexico (formerly Iusacell). These anomalies have coincided with suspicious DoS attempts detected on both sides of the border, affecting network services spanning from Texas to El Paso and even into Northern Mexico.
              </p>
              <p>
                As you pull up to the site, you connect locally to the Cisco 1100 ISR using your secure interface, instantly pulling live diagnostics and log data from the router. The device logs reveal that the router has reloaded several times over the last 24 hours, each instance correlating with incoming CIP packets from an IP address associated with traffic originating from a Mexican mobile network, which has been integrated into AT&T&apos;s expanded cross-border service.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-2">Router Crash Logs Confirming Device Reloads</h3>
              <pre className="text-xs">
                [2024-11-14 06:20:04] Device Crash Detected
                  Device ID: cisco-1100-ISR
                  OS Version: IOS XE 17.9.1
                  Crash Reason: Unexpected reload due to malformed CIP packet
                  Source IP of Malformed Packet: 189.120.45.12 (Mexico AT&T network)
                  Protocol: CIP
                  Notes: Matches known CVE-2022-20919 exploit signature. Device reloaded.
              </pre>
            </div>
          </div>
        </ExpandableAnalysisCard>
      </div>
    </div>
  );
}
