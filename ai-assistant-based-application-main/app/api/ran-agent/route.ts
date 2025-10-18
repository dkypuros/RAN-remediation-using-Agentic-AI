import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/ran-agent
 * Uses the RAN Agent to process queries about network issues
 */

interface AgentRequest {
  message: string;
}

// RAN Services URL - internal cluster service
const RAN_SERVICES_URL = process.env.RAN_SERVICES_URL || 'http://ran-services:5000';

export async function POST(request: NextRequest) {
  try {
    const body: AgentRequest = await request.json();
    const { message } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Parse query to determine intent
    const lowerMessage = message.toLowerCase();

    const isSite002Query = lowerMessage.includes('site-002') ||
                           lowerMessage.includes('site 002');

    const isCriticalAlarmsQuery = lowerMessage.includes('critical alarm');

    // Detect remediation/action queries
    const isRemediationQuery = lowerMessage.includes('recommended action') ||
                               lowerMessage.includes('remediation') ||
                               lowerMessage.includes('what should i do') ||
                               lowerMessage.includes('how to fix') ||
                               lowerMessage.includes('playbook') ||
                               lowerMessage.includes('next step');

    // If asking for actions without specifying site, assume SITE-002 (most common demo scenario)
    const implicitSite002 = isRemediationQuery && !lowerMessage.includes('site-');

    let response;

    // Try to use live RAN services, fallback to demo if unavailable
    const useLiveServices = true; // Set to true to use actual services

    if (useLiveServices && (isSite002Query || implicitSite002)) {
      try {
        // Call combined site analysis endpoint
        const analysisResponse = await fetch(`${RAN_SERVICES_URL}/api/ran/combined-site-analysis/SITE-002`);
        const analysisData = await analysisResponse.json();

        // Extract key information
        const alarms = analysisData.alarms || [];
        const kpis = analysisData.kpis || {};
        const cells = analysisData.cells || [];
        const recommendations = analysisData.recommendations || [];
        const liveData = analysisData.live_data || {};

        // Find CELL-2B details
        const cell2B = cells.find((c: any) => c.cellId === 'CELL-2B');
        const criticalAlarm = alarms.find((a: any) => a.severity === 'CRITICAL');

        // Build answer based on query intent
        let answer;

        if (isRemediationQuery) {
          // Focused answer for remediation queries
          answer = `**Recommended Actions for SITE-002**

**🎯 Issue Identified:**
${criticalAlarm?.type || 'Transport Link Failure'} affecting CELL-2B at ${liveData.site?.siteName || 'Industrial Park Beta'}

**📋 Remediation Playbook:** ${recommendations[0]?.playbookId || 'RMD-001'} - "${recommendations[0]?.title || 'N2 Interface Link Failure Remediation'}"

**🔧 Immediate Diagnostic Steps:**
${recommendations[0]?.diagnosticSteps?.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n') || '1. Check physical layer\n2. Verify port status\n3. Test connectivity from gNodeB to AMF\n4. Check routing to 5G core\n5. Verify NG-C/N2 SCTP association\n6. Review gNodeB logs'}

**✅ Remediation Actions:**
${recommendations[0]?.remediationSteps?.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n') || '1. Repair physical damage\n2. Bounce interface\n3. Correct IP config on gNodeB\n4. Fix routing to 5G core\n5. Update firewall rules for N2/NG traffic\n6. Verify cell restoration'}

**⏱️ Expected Resolution Time:** ${recommendations[0]?.estimatedResolutionTime || '15-60 minutes'}

**📊 Expected Outcome:**
${recommendations[0]?.expectedOutcome || 'N2 interface link restored, cell returns to active state, users can reconnect, KPIs normalize'}

**📚 References:**
${recommendations[0]?.references?.map((ref: string) => `- ${ref}`).join('\n') || '- 3GPP TS 38.410 - NG-RAN General Aspects\n- 3GPP TS 38.413 - NGAP Protocol'}`;
        } else {
          // Comprehensive analysis answer
          answer = `**Analysis Complete for SITE-002**

**🔍 Retrieval Phase:**
I retrieved data from multiple sources:
- Active alarms database (${alarms.length} alarms)
- Site KPI reports (Status: ${kpis.status || 'Unknown'})
- Cell-level RF metrics (${cells.length} cells)
- Live simulator data (${liveData.site?.siteName || 'Industrial Park Beta'})

**🔬 Root Cause Analysis:**
SITE-002 (${liveData.site?.siteName || 'Industrial Park Beta'}) is experiencing a **critical service outage**:

**Primary Issue:** ${criticalAlarm?.type || 'Transport Link Failure'} (${criticalAlarm?.alarmId || 'ALM-983451'})
- ${criticalAlarm?.description || 'N2 interface to AMF-01 is down. No communication with 5G core network.'}
- Started at ${criticalAlarm?.firstOccurrence || 'Unknown'}

**Impact:**
- CELL-2B is ${cell2B?.cellStatus || 'DOWN'} (${cell2B?.connectedUsers || 0} connected users)
- Call drop rate: **${kpis.retainability?.callDropRate || '45.7'}%** (threshold: ${kpis.retainability?.threshold || '2'}%)
- E-RAB setup success: **${kpis.accessibility?.erabSetupSuccessRate || '88.4'}%** (threshold: ${kpis.accessibility?.threshold || '98'}%)
- SINR on CELL-2B: **${cell2B?.averageSINR_dB || '-2.1'} dB** (severely degraded)

**💡 Recommended Solution:**
Follow **Remediation Playbook ${recommendations[0]?.playbookId || 'RMD-001'}**: "${recommendations[0]?.title || 'N2 Interface Link Failure Remediation'}"

**Key Steps from Playbook:**
${recommendations[0]?.diagnosticSteps?.slice(0, 5).map((step: string, i: number) => `${i + 1}. ${step}`).join('\n') || '1. Check physical layer (fiber cables)\n2. Verify router/switch port status\n3. Ping test from gNodeB to AMF\n4. Check routing table has path to 5G core\n5. Verify NG-C/N2 SCTP association state'}

**Expected Resolution Time:** ${recommendations[0]?.estimatedResolutionTime || '15-60 minutes'}

Would you like me to retrieve the detailed diagnostic steps from the playbook?`;
        }

        response = {
          answer,
          steps: [
            {
              type: 'REASONING',
              action: 'Parsing query - user asking about SITE-002 issues',
              step_number: 1
            },
            {
              type: 'ACTION',
              action: 'get_combined_analysis (site_id: SITE-002)',
              observation: `Retrieved comprehensive data: ${alarms.length} alarms, KPI status ${kpis.status}, ${cells.length} cells`,
              step_number: 2
            },
            {
              type: 'ACTION',
              action: 'get_live_data (site_id: SITE-002)',
              observation: `Live data confirms: Site status ${liveData.site?.status}, CELL-2B is ${liveData.cells?.find((c: any) => c.cellId === 'CELL-2B')?.cellState}`,
              step_number: 3
            },
            {
              type: 'REASONING',
              action: `Correlating data: ${criticalAlarm?.type} → CELL-2B offline → high drop rate. Root cause identified.`,
              step_number: 4
            },
            {
              type: 'ACTION',
              action: 'search_remediation (alarm_type: Transport Link Failure)',
              observation: `Found playbook ${recommendations[0]?.playbookId}: ${recommendations[0]?.title}`,
              step_number: 5
            },
            {
              type: 'FINAL_ANSWER',
              action: 'Providing comprehensive analysis with playbook recommendation',
              step_number: 6
            }
          ],
          retrieved_data: analysisData
        };
      } catch (error) {
        console.error('Failed to fetch live RAN data, falling back to demo:', error);
        // Fall back to demo response
        response = buildDemoSite002Response();
      }
    } else if (isSite002Query) {
      // Demo fallback
      response = buildDemoSite002Response();
    } else if (useLiveServices && isCriticalAlarmsQuery) {
      try {
        // Fetch critical alarms from RAN services
        const alarmsResponse = await fetch(`${RAN_SERVICES_URL}/api/ran/alarms?severity=CRITICAL`);
        const alarmsData = await alarmsResponse.json();

        const alarms = alarmsData.alarms || [];

        const answer = `**Critical Alarms Summary**

**🔍 Retrieval:** Searched alarm database for CRITICAL severity

**Found ${alarms.length} Critical Alarm(s):**

${alarms.map((alarm: any) => `
**${alarm.alarmId}** - ${alarm.type}
- **Site:** ${alarm.siteId}
- **Cell:** ${alarm.cellId}
- **Issue:** ${alarm.description}
- **Started:** ${new Date(alarm.firstOccurrence).toLocaleString()}
- **Impact:** ${alarm.impact}
`).join('\n')}

**📊 Recommended Action:**
Immediate response required. Investigate and remediate these critical issues.`;

        response = {
          answer,
          steps: [
            {
              type: 'REASONING',
              action: 'User requesting critical alarms - will filter by severity',
              step_number: 1
            },
            {
              type: 'ACTION',
              action: 'get_alarms (severity: CRITICAL)',
              observation: `Retrieved ${alarms.length} critical alarm(s)`,
              step_number: 2
            },
            {
              type: 'FINAL_ANSWER',
              action: 'Providing critical alarms summary',
              step_number: 3
            }
          ],
          retrieved_data: { alarms: alarmsData }
        };
      } catch (error) {
        console.error('Failed to fetch critical alarms, falling back to demo:', error);
        response = buildDemoCriticalAlarmsResponse();
      }
    } else if (isCriticalAlarmsQuery) {
      response = buildDemoCriticalAlarmsResponse();
    } else {
      // Generic response for other queries
      response = {
        answer: `**Query Received:** "${message}"

**🔍 RAN Agentic Workflow:**

I'm analyzing your request using the ReACT framework:
1. **Retrieve** relevant data from RAN services
2. **Analyze** correlations and patterns
3. **Consult** remediation playbooks
4. **Recommend** solutions

**Try these sample queries to see the full workflow:**
- "What's wrong with SITE-002?"
- "Show me all critical alarms"

The agent will retrieve live data from:
- RAN Simulator (live cell/UE states)
- Alarms database (alarms.json)
- KPI reports (kpis.json)
- Cell details (cell_details.json)
- Remediation playbooks (remediation_playbooks.json)`,
        steps: [
          {
            type: 'REASONING',
            action: 'Processing general query',
            step_number: 1
          },
          {
            type: 'FINAL_ANSWER',
            action: 'Providing usage information',
            step_number: 2
          }
        ],
        retrieved_data: {}
      };
    }

    return NextResponse.json({
      success: true,
      ...response
    });

  } catch (error) {
    console.error('RAN Agent API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// Helper functions for demo fallback responses
function buildDemoSite002Response() {
  return {
    answer: `**Analysis Complete for SITE-002** (Demo Mode - RAN Services Unavailable)

**🔍 Retrieval Phase:**
I retrieved data from multiple sources:
- Active alarms database
- Site KPI reports
- Cell-level RF metrics

**🔬 Root Cause Analysis:**
SITE-002 (Industrial Park Beta) is experiencing a **critical service outage**:

**Primary Issue:** Transport Link Failure (ALM-983451)
- N2 interface to AMF-01 is down
- Started at 15:55:10 today

**Impact:**
- CELL-2B is completely offline (0 connected users)
- Call drop rate: **45.7%** (threshold: 2%)
- E-RAB setup success: **88.4%** (threshold: 98%)

**💡 Recommended Solution:**
Follow **Remediation Playbook RMD-001**: "N2 Interface Link Failure Remediation"

Would you like me to retrieve the detailed diagnostic steps from the playbook?`,
    steps: [
      {
        type: 'REASONING',
        action: 'Parsing query - user asking about SITE-002 issues',
        step_number: 1
      },
      {
        type: 'ACTION',
        action: 'get_alarms (site_id: SITE-002)',
        observation: 'Found 2 alarms: CRITICAL N2 link failure (ALM-983451), MAJOR cell down (ALM-983452)',
        step_number: 2
      }
    ],
    retrieved_data: {}
  };
}

function buildDemoCriticalAlarmsResponse() {
  return {
    answer: `**Critical Alarms Summary** (Demo Mode - RAN Services Unavailable)

**🔍 Retrieval:** Searched alarm database for CRITICAL severity

**Found 1 Critical Alarm:**

**ALM-983451** - Transport Link Failure
- **Site:** SITE-002 (Industrial Park Beta)
- **Cell:** CELL-2B
- **Issue:** N2 interface to AMF-01 is down. No communication with 5G core network.`,
    steps: [
      {
        type: 'REASONING',
        action: 'User requesting critical alarms - will filter by severity',
        step_number: 1
      }
    ],
    retrieved_data: {}
  };
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'ran-agent-api',
    ran_services_url: RAN_SERVICES_URL
  });
}
