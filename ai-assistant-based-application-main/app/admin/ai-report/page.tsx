'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function AIReportPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-3xl font-bold tracking-tight">AI Generated Security Report</h2>
      </div>

      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-10 w-10 text-red-400/70" strokeWidth={1} />
            <div>
              <CardTitle>CVE-2022-20919 Vulnerability Analysis</CardTitle>
              <CardDescription>Detailed analysis of the vulnerability exploitation patterns and impact</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <div className="prose prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-4">Situation Overview</h3>
              <p>
                It&apos;s early morning in the panhandle of Texas, where you&apos;re dispatched to a cell site in a remote area. Your task is to investigate a CVE-2022-20919 vulnerability that was flagged on a Cisco 1100 ISR router serving a gNodeB in this region. This particular vulnerability relates to the improper handling of malformed Common Industrial Protocol (CIP) packets, allowing attackers to trigger a denial-of-service (DoS) by forcing the device to reload unexpectedly. The implications of such an exploit are significant, especially as this router forms part of a cross-border communication network that connects AT&T&apos;s U.S. and Mexico operations.
              </p>

              <h3 className="text-lg font-semibold mb-4 mt-6">Technical Analysis</h3>
              <p>
                Your AI-equipped laptop is loaded with PostHog, linked to the National Vulnerability Database, and preconfigured with anomaly detection models. You are aware of recent issues in this area with unusual latency spikes between nodes operated by AT&T in the U.S. and recently acquired infrastructure in Mexico (formerly Iusacell). These anomalies have coincided with suspicious DoS attempts detected on both sides of the border, affecting network services spanning from Texas to El Paso and even into Northern Mexico.
              </p>

              <h3 className="text-lg font-semibold mb-4 mt-6">Findings</h3>
              <p>
                As you pull up to the site, you connect locally to the Cisco 1100 ISR using your secure interface, instantly pulling live diagnostics and log data from the router. The device logs reveal that the router has reloaded several times over the last 24 hours, each instance correlating with incoming CIP packets from an IP address associated with traffic originating from a Mexican mobile network, which has been integrated into AT&T&apos;s expanded cross-border service.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4 mt-6">
              <h3 className="font-semibold mb-2">Evidence: Router Crash Logs</h3>
              <pre className="text-xs whitespace-pre-wrap">
                [2024-11-14 06:20:04] Device Crash Detected
                  Device ID: cisco-1100-ISR
                  OS Version: IOS XE 17.9.1
                  Crash Reason: Unexpected reload due to malformed CIP packet
                  Source IP of Malformed Packet: 189.120.45.12 (Mexico AT&T network)
                  Protocol: CIP
                  Notes: Matches known CVE-2022-20919 exploit signature. Device reloaded.
              </pre>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mt-6">
              <h3 className="font-semibold mb-2">AI Recommendations</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li>Immediately patch the Cisco 1100 ISR router to address CVE-2022-20919</li>
                <li>Implement CIP packet filtering at the border routers</li>
                <li>Monitor for similar patterns across other border-crossing network points</li>
                <li>Coordinate with AT&T Mexico to trace the source of malformed packets</li>
                <li>Consider implementing redundant routing paths for critical cross-border traffic</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
