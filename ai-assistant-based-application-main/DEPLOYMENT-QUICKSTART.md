# RAN Agentic Workflow - Deployment Quickstart

This guide will help you quickly deploy the complete RAN Agentic Workflow demo to OpenShift.

## Prerequisites

- OpenShift cluster with admin access
- `oc` CLI installed and logged in
- Namespace created (default: `ai-assistant`)

## Quick Deploy - All Components

Deploy everything with a single command:

```bash
cd ai-assistant-based-application-main

# Deploy RAN Simulator + RAN Services
./scripts/deploy-all-ran.sh

# Deploy main application (if not already deployed)
./scripts/deploy.sh
```

## Step-by-Step Deployment

### 1. Deploy RAN Simulator

The simulator provides live 5G network state (cells, UEs, RF metrics).

```bash
./scripts/deploy-ran-simulator.sh
```

**Expected Output:**
```
🚀 Deploying RAN Simulator to OpenShift namespace: ai-assistant
📦 Creating ImageStream...
🔧 Creating BuildConfig...
🏗️  Starting binary build...
✅ RAN Simulator deployment complete!
```

**Verify:**
```bash
oc get pods -l app=ran-simulator
oc logs -f deployment/ran-simulator
```

### 2. Deploy RAN Services

RAN Services provides the API gateway for both live simulator data and fixtures.

```bash
./scripts/deploy-ran-services.sh
```

**Expected Output:**
```
🚀 Deploying RAN Services to OpenShift namespace: ai-assistant
📦 Creating ImageStream...
🔧 Creating BuildConfig...
🏗️  Starting binary build...
✅ RAN Services deployment complete!
```

**Verify:**
```bash
oc get pods -l app=ran-services
oc logs -f deployment/ran-services
```

### 3. Test Connectivity

#### Port Forward (for testing)
```bash
# Terminal 1: Simulator
oc port-forward svc/ran-simulator 5001:5001

# Terminal 2: Services
oc port-forward svc/ran-services 5000:5000
```

#### Test Endpoints
```bash
# Test simulator
curl http://localhost:5001/health
curl http://localhost:5001/gnb/sites

# Test services (fixtures)
curl http://localhost:5000/health
curl http://localhost:5000/api/ran/alarms

# Test services (live proxy)
curl http://localhost:5000/api/ran/live-sites

# Test combined analysis
curl http://localhost:5000/api/ran/combined-site-analysis/SITE-002
```

## Architecture Verification

After deployment, verify the complete architecture:

```bash
# Check all backend services
oc get pods -l component=backend

# Expected pods:
# - ran-simulator-xxxxx
# - ran-services-xxxxx
# - rag-service-xxxxx (if deployed)
# - vllm-xxxxx (if deployed)
```

## Access the Application

### Get Application Route
```bash
oc get route ai-assistant-app -o jsonpath='{.spec.host}'
```

### Navigate to Agentic Workflows
1. Open browser to application URL
2. Navigate to **Agentic Workflows** in sidebar
3. Try sample queries:
   - "What's wrong with SITE-002?"
   - "Show me all critical alarms"

## Sample Demo Flow

### Query: "What's wrong with SITE-002?"

**Expected Agent Response:**

```
🔍 Retrieval Phase:
- Active alarms database
- Site KPI reports
- Cell-level RF metrics

🔬 Root Cause Analysis:
SITE-002 (Industrial Park Beta) - CRITICAL service outage

Primary Issue: Transport Link Failure (ALM-983451)
- S1 link to MME-01 is DOWN
- Started at 15:55:10 today

Impact:
- CELL-2B completely offline (0 users)
- Call drop rate: 45.7% (threshold: 2%)
- E-RAB setup: 88.4% (threshold: 98%)

💡 Recommended Solution:
Follow Remediation Playbook RMD-001: "S1 Link Failure Remediation"

Key Steps:
1. Check physical layer (fiber cables)
2. Verify router/switch port status
3. Ping test from eNodeB to MME
...
```

## Data Sources Explained

### Live Simulator Data (ran-simulator)
- Real-time cell states
- Dynamic UE connections
- RF metrics (SINR, RSRP, RSRQ)
- Site operational status

**Sites:**
- SITE-001: Downtown Plaza (OPERATIONAL)
- SITE-002: Industrial Park Beta (DEGRADED - CELL-2B DOWN)
- SITE-003: University Campus (OPERATIONAL)
- SITE-004: Residential Complex (WARNING)

### Fixture Data (ran-services/data/)
- **alarms.json**: Active network alarms
- **kpis.json**: Site-level KPI metrics
- **cell_details.json**: Cell RF measurements
- **remediation_playbooks.json**: Troubleshooting procedures

## Troubleshooting

### Simulator Not Reachable

```bash
# Check simulator pod
oc get pods -l app=ran-simulator
oc logs deployment/ran-simulator

# Restart if needed
oc rollout restart deployment/ran-simulator
```

### Services Can't Connect to Simulator

```bash
# Verify service exists
oc get svc ran-simulator

# Test from services pod
oc exec deployment/ran-services -- curl http://ran-simulator:5001/health

# Check environment variable
oc set env deployment/ran-services --list | grep RAN_SIMULATOR_URL
```

### Build Failures

```bash
# Check build logs
oc logs -f bc/ran-simulator
oc logs -f bc/ran-services

# Retry build
cd ran-simulator
oc start-build ran-simulator --from-dir=. --follow

cd ../ran-services
oc start-build ran-services --from-dir=. --follow
```

### Data Not Loading

```bash
# Verify data files exist
oc exec deployment/ran-services -- ls -la /app/data/

# Should see:
# alarms.json
# kpis.json
# cell_details.json
# remediation_playbooks.json
```

## API Endpoints Reference

### Fixture Endpoints (port 5000)
```
GET  /api/ran/alarms
GET  /api/ran/kpis
GET  /api/ran/cell-details
GET  /api/ran/remediation
POST /api/ran/search-remediation
```

### Live Simulator Endpoints (port 5000)
```
GET /api/ran/live-sites
GET /api/ran/live-cells
GET /api/ran/live-ues
GET /api/ran/live-metrics
GET /api/ran/live-status
```

### Combined Analysis (port 5000)
```
GET /api/ran/combined-site-analysis/<site_id>
```

### Direct Simulator Endpoints (port 5001)
```
GET /gnb/sites
GET /gnb/cells
GET /gnb/ues
GET /gnb/metrics
GET /health
```

## Monitoring

### View Logs
```bash
# Simulator logs
oc logs -f deployment/ran-simulator

# Services logs
oc logs -f deployment/ran-services

# All backend logs
oc logs -f -l component=backend
```

### Resource Usage
```bash
# Check pod resources
oc top pods -l component=backend

# Describe pods
oc describe pod -l app=ran-simulator
oc describe pod -l app=ran-services
```

## Next Steps

1. **Integrate with vLLM Agent**: Connect the chat interface to a real vLLM-powered agent
2. **Add More Scenarios**: Extend data fixtures with additional failure scenarios
3. **Implement Automation**: Add automated remediation execution
4. **Performance Monitoring**: Set up Prometheus/Grafana dashboards
5. **Real Network Integration**: Connect to actual 5G core network functions

## Documentation

- [RAN-INTEGRATION.md](./RAN-INTEGRATION.md) - Complete integration documentation
- [ran-simulator/README.md](./ran-simulator/README.md) - Simulator details
- [changelog.md](./changelog.md) - Version history

## Support

For issues or questions:
1. Check logs: `oc logs deployment/<service-name>`
2. Verify connectivity: `oc get svc`
3. Review documentation: `RAN-INTEGRATION.md`
4. Check health endpoints: `curl http://localhost:5000/health`
