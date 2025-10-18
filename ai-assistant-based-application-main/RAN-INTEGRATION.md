# RAN Integration Documentation

This document describes the hybrid RAN integration that combines live 5G network simulation with synthetic data fixtures for the AI RAN Agentic Workflow Demo.

## Architecture Overview

The RAN integration consists of three main components:

### 1. **RAN Simulator** (`ran-simulator/`)
- **Purpose**: Provides live 5G network state simulation
- **Technology**: Python Flask application
- **Port**: 5001
- **Data**: Real-time cell contexts, UE connections, RF metrics

### 2. **RAN Services** (`ran-services/`)
- **Purpose**: API gateway that provides both fixture data and live simulator proxy
- **Technology**: Python Flask application
- **Port**: 5000
- **Data Sources**:
  - JSON fixtures (alarms, KPIs, remediation playbooks)
  - Live simulator data (cell/UE state, metrics)

### 3. **Frontend Integration** (`app/admin/agentic-workflows/`)
- **Purpose**: User interface for RAN agentic workflow demo
- **Technology**: Next.js 15 / React / TypeScript
- **Features**: Chat interface, agent activity tracking, data visualization

## Data Flow

```
┌─────────────────┐
│   Frontend      │
│  (Next.js)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  RAN Agent API  │      │   vLLM Service   │
│  (Next.js API)  │◄────►│  (Reasoning)     │
└────────┬────────┘      └──────────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  RAN Services   │      │  RAN Simulator   │
│  (Flask)        │◄────►│  (Flask)         │
│                 │      │                  │
│ • Fixture Data  │      │ • Live Cells     │
│ • Alarms        │      │ • Live UEs       │
│ • KPIs          │      │ • RF Metrics     │
│ • Playbooks     │      │ • Site Status    │
└─────────────────┘      └──────────────────┘
```

## Simulated Network Topology

### SITE-001 - Downtown Plaza (OPERATIONAL)
- **Cells**: CELL-1A, CELL-1B, CELL-1C
- **Status**: Healthy, normal operations
- **UEs**: ~40-60 per cell
- **SINR**: 15-22 dB
- **Load**: 60-80%

### SITE-002 - Industrial Park Beta (DEGRADED) ⚠️
- **Cells**: CELL-2A, CELL-2B (DOWN), CELL-2C
- **Status**: CELL-2B offline due to S1 link failure
- **Impact**: Remaining cells overloaded (85-95% load)
- **Alarms**:
  - ALM-983451 (CRITICAL): Transport Link Failure
  - ALM-983452 (MAJOR): Cell Down
- **KPIs**:
  - Call drop rate: 45.7% (threshold: 2%)
  - E-RAB setup: 88.4% (threshold: 98%)

### SITE-003 - University Campus (OPERATIONAL)
- **Cells**: CELL-3A, CELL-3B
- **Status**: Healthy
- **UEs**: ~40-60 per cell
- **SINR**: 16-24 dB
- **Load**: 40-60%

### SITE-004 - Residential Complex (WARNING)
- **Cells**: CELL-4A, CELL-4B, CELL-4C
- **Status**: High VSWR warning
- **Alarm**: ALM-983453 (MINOR): High VSWR on antenna
- **Impact**: Minor degradation

## API Endpoints

### RAN Services (Port 5000)

#### Fixture Data Endpoints
```bash
# Alarms
GET /api/ran/alarms
GET /api/ran/alarms?severity=CRITICAL
GET /api/ran/alarms?site_id=SITE-002

# KPIs
GET /api/ran/kpis
GET /api/ran/kpis/<site_id>

# Cell Details
GET /api/ran/cell-details
GET /api/ran/cell-details/<site_id>

# Remediation Playbooks
GET /api/ran/remediation
GET /api/ran/remediation/<playbook_id>
POST /api/ran/search-remediation
```

#### Live Simulator Proxy Endpoints
```bash
# Sites
GET /api/ran/live-sites
GET /api/ran/live-sites/<site_id>

# Cells
GET /api/ran/live-cells
GET /api/ran/live-cells?site_id=<site_id>
GET /api/ran/live-cells/<cell_id>

# UEs
GET /api/ran/live-ues
GET /api/ran/live-ues?site_id=<site_id>
GET /api/ran/live-ues?cell_id=<cell_id>

# Metrics
GET /api/ran/live-metrics
GET /api/ran/live-status
```

#### Combined Analysis Endpoint
```bash
# Merges live data + fixtures for comprehensive site analysis
GET /api/ran/combined-site-analysis/<site_id>
```

### RAN Simulator (Port 5001)

```bash
# Health
GET /health

# Sites
GET /gnb/sites
GET /gnb/sites/<site_id>

# Cells
GET /gnb/cells
GET /gnb/cells?site_id=<site_id>
GET /gnb/cells/<cell_id>

# UEs
GET /gnb/ues
GET /gnb/ues?site_id=<site_id>
GET /gnb/ues?cell_id=<cell_id>

# Metrics
GET /gnb/metrics
GET /gnb/status
```

## Deployment

### Prerequisites
- OpenShift cluster access
- `oc` CLI installed and logged in
- Namespace created (default: `ai-assistant`)

### Deploy All RAN Components

```bash
# Deploy both simulator and services
cd ai-assistant-based-application-main
./scripts/deploy-all-ran.sh
```

### Deploy Individual Components

```bash
# Deploy RAN Simulator only
./scripts/deploy-ran-simulator.sh

# Deploy RAN Services only
./scripts/deploy-ran-services.sh
```

### Manual Deployment

#### RAN Simulator
```bash
cd ai-assistant-based-application-main

# Create resources
oc apply -f openshift/ran-simulator/imagestream.yaml
oc apply -f openshift/ran-simulator/buildconfig.yaml

# Build image
cd ran-simulator
oc start-build ran-simulator --from-dir=. --follow

# Deploy
oc apply -f ../openshift/ran-simulator/deployment.yaml
oc apply -f ../openshift/ran-simulator/service.yaml
```

#### RAN Services
```bash
cd ai-assistant-based-application-main

# Create resources
oc apply -f openshift/ran-services/imagestream.yaml
oc apply -f openshift/ran-services/buildconfig.yaml

# Build image
cd ran-services
oc start-build ran-services --from-dir=. --follow

# Deploy
oc apply -f ../openshift/ran-services/deployment.yaml
oc apply -f ../openshift/ran-services/service.yaml
```

## Local Development

### RAN Simulator
```bash
cd ran-simulator
pip install -r requirements.txt
python gnb.py
# Runs on http://localhost:5001
```

### RAN Services
```bash
cd ran-services
pip install -r requirements.txt
export RAN_SIMULATOR_URL=http://localhost:5001
python app.py
# Runs on http://localhost:5000
```

### Testing
```bash
# Test simulator
curl http://localhost:5001/health
curl http://localhost:5001/gnb/sites

# Test services
curl http://localhost:5000/health
curl http://localhost:5000/api/ran/alarms
curl http://localhost:5000/api/ran/live-sites

# Test combined analysis
curl http://localhost:5000/api/ran/combined-site-analysis/SITE-002
```

## Agent Integration

The AI RAN agent can use both data sources:

### Example Agent Query Flow

**User Query**: "What's wrong with SITE-002?"

1. **Agent Reasoning**: Parse query, identify site SITE-002
2. **Action**: `get_alarms(site_id: SITE-002)`
   - Retrieves fixture data: CRITICAL S1 link failure
3. **Action**: `get_live_site(site_id: SITE-002)`
   - Retrieves live data: CELL-2B down, other cells overloaded
4. **Action**: `get_kpis(site_id: SITE-002)`
   - Retrieves fixture data: Call drop rate 45.7%
5. **Action**: `search_remediation(alarm_type: Transport Link Failure)`
   - Retrieves playbook: RMD-001 - S1 Link Failure Remediation
6. **Final Answer**: Comprehensive analysis with root cause and remediation steps

## Data Fixtures

### Alarms (`ran-services/data/alarms.json`)
- 4 alarms across sites
- Severities: CRITICAL, MAJOR, MINOR
- Types: Transport Link Failure, Cell Down, High VSWR, High Temperature

### KPIs (`ran-services/data/kpis.json`)
- Site-level metrics
- Categories: Accessibility, Retainability, Integrity, Throughput
- Thresholds and issue tracking

### Cell Details (`ran-services/data/cell_details.json`)
- Cell-level RF metrics
- Per-cell UE counts
- SINR, RSRP, RSRQ measurements

### Remediation Playbooks (`ran-services/data/remediation_playbooks.json`)
- 4 playbooks covering common issues
- Diagnostic steps
- Remediation procedures
- Estimated resolution times

## Environment Variables

### RAN Services
- `PORT`: Service port (default: 5000)
- `FLASK_ENV`: Environment (production/development)
- `RAN_SIMULATOR_URL`: Simulator URL (default: http://ran-simulator:5001)

### RAN Simulator
- `FLASK_ENV`: Environment (production/development)

## Monitoring

### Health Checks
```bash
# Check all components
oc get pods -l component=backend

# Check logs
oc logs -f deployment/ran-simulator
oc logs -f deployment/ran-services

# Port forward for testing
oc port-forward svc/ran-simulator 5001:5001
oc port-forward svc/ran-services 5000:5000
```

### Metrics
- RAN Simulator provides live UE counts, cell states, RF metrics
- RAN Services health endpoint shows simulator connectivity status

## Troubleshooting

### Simulator Not Reachable
```bash
# Check simulator status
oc get pods -l app=ran-simulator
oc logs deployment/ran-simulator

# Verify service exists
oc get svc ran-simulator

# Test from ran-services pod
oc exec deployment/ran-services -- curl http://ran-simulator:5001/health
```

### Data Not Loading
```bash
# Check ran-services logs
oc logs deployment/ran-services

# Verify data fixtures exist
oc exec deployment/ran-services -- ls -la /app/data/

# Test fixture endpoints
curl http://localhost:5000/api/ran/alarms
```

### Build Failures
```bash
# Check build logs
oc logs -f bc/ran-simulator
oc logs -f bc/ran-services

# Rebuild
oc start-build ran-simulator --from-dir=./ran-simulator --follow
oc start-build ran-services --from-dir=./ran-services --follow
```

## Future Enhancements

1. **Real 5G Core Integration**: Connect to actual AMF, SMF, UPF
2. **Time-Series Data**: Store historical metrics in Prometheus/Grafana
3. **Advanced Alarms**: Correlation and root cause analysis
4. **Automated Remediation**: Execute playbook steps automatically
5. **Multi-Site Orchestration**: Coordinate across multiple sites
6. **Performance Testing**: Load testing with realistic UE behavior
7. **AI-Driven Optimization**: Use ML models for predictive maintenance

## References

- [3GPP TS 38.413](https://www.3gpp.org/DynaReport/38413.htm) - NG-RAN; NG Application Protocol (NGAP)
- [Open Digital Platform 2.0](../5G-Sim/BF3-5G-Demo/open-digital-platform-2_0/README.md) - Original simulator source
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenShift Documentation](https://docs.openshift.com/)
