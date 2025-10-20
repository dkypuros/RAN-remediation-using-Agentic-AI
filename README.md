# AI-Powered RAN Troubleshooting and Remediation 
- Specific implementation demo of GitLab Center of Excellence repository

[![OpenShift](https://img.shields.io/badge/Platform-OpenShift-EE0000?logo=redhat)](https://www.redhat.com/en/technologies/cloud-computing/openshift)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Language-Python%203.10-3776AB?logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/API-Flask-000000?logo=flask)](https://flask.palletsprojects.com/)
[![vLLM](https://img.shields.io/badge/LLM-vLLM-blue)](https://vllm.ai/)
[![5G](https://img.shields.io/badge/Network-5G%20RAN-orange)](https://www.3gpp.org/)

An autonomous AI agent system for 5G Radio Access Network troubleshooting and remediation. Demonstrates ReAct framework implementation with live network simulation, Retrieval-Augmented Generation, and vLLM inference for operational intelligence.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Next.js Application (Port 3001)                            │
│  ├─ Agentic Workflows UI                                    │
│  ├─ Context-Aware AI Assistant (Zustand state)             │
│  └─ Real-time Network Visualization                         │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────────┐
│  API Layer                                                   │
│  ├─ /api/ran-agent    → Agent orchestration                │
│  ├─ /api/chat-vllm    → vLLM + RAG integration            │
│  └─ /api/ran-health   → Service health checks             │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
┌────────▼────────┐    ┌────────▼────────┐
│  RAN Services   │    │   RAG Service   │
│  (Flask:5000)   │    │  (Flask:50052)  │
│  ├─ Alarms      │    │  ├─ Embeddings  │
│  ├─ KPIs        │    │  ├─ Vector DB   │
│  ├─ Playbooks   │    │  └─ Similarity  │
│  └─ Live Proxy  │    └─────────────────┘
└────────┬────────┘
         │
┌────────▼────────┐    ┌─────────────────┐
│  RAN Simulator  │───▶│  vLLM Service   │
│  (Flask:5001)   │    │  (External)     │
│  ├─ 4 Sites     │    │  ├─ Granite 3.0 │
│  ├─ 11 Cells    │    │  └─ Inference   │
│  └─ Live UEs    │    └─────────────────┘
└─────────────────┘
```

## Components

### Frontend Application
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **State Management**: Zustand context store
- **UI Components**: Custom component library with Tailwind CSS
- **Features**:
  - Agentic workflow visualization with step-by-step reasoning display
  - Context-aware AI assistant with page and ticket tracking
  - Real-time RAN metrics and site status monitoring
  - Interactive service health testing

### RAN Simulator
- **Technology**: Python Flask
- **Purpose**: Simulates 5G gNodeB network operations
- **Network Topology**:
  - 4 sites (SITE-001 to SITE-004)
  - 11 cells with dynamic RF metrics
  - Simulated UE connections
  - SITE-002 configured with critical alarm scenario
- **Endpoints**:
  - `/gnb/sites` - Site information
  - `/gnb/cells` - Cell status and RF metrics
  - `/gnb/ues` - User equipment contexts
  - `/gnb/metrics` - Network performance metrics

### RAN Services
- **Technology**: Python Flask
- **Purpose**: API gateway for RAN data and agent tools
- **Data Sources**:
  - JSON fixtures (alarms, KPIs, remediation playbooks)
  - Live simulator proxy endpoints
  - Combined analysis with correlation
- **Agent Tools**:
  - `get_alarms` - Query alarm database
  - `get_kpis` - Retrieve KPI reports
  - `get_cell_details` - Cell-level RF metrics
  - `search_remediation` - Find applicable playbooks

### RAG Service
- **Technology**: Python Flask
- **Model**: sentence-transformers (all-MiniLM-L6-v2) for embeddings
- **Storage**: In-memory vector store with cosine similarity search
- **Data**: JIRA tickets, knowledge base articles, ticket templates
- **Function**: Retrieves contextually relevant historical data for LLM prompts

### AI Agent
- **Framework**: ReAct (Reasoning + Acting)
- **LLM**: vLLM serving IBM Granite 3.0 8B Instruct
- **Workflow**:
  1. Receive user query with page context
  2. Reason about required information
  3. Execute tool calls (get_alarms, get_kpis, etc.)
  4. Observe results and iterate
  5. Synthesize final response with remediation steps
- **Modes**:
  - **Demo Mode**: Pre-programmed responses for reliable demonstrations
  - **Live Agent Mode**: vLLM-powered autonomous reasoning

## Network Scenario

### SITE-002: Industrial Park Beta (Critical Alarm)
```
Status: DEGRADED
Alarms:
  - ALM-983451 (CRITICAL): Transport Link Failure
    Description: N2 interface to AMF-01 is down
  - ALM-983452 (MAJOR): Cell Down
    Affected: CELL-2B

Cells:
  - CELL-2A: ACTIVE (85% load, overloaded)
  - CELL-2B: DOWN (0 users, N2 link failure)
  - CELL-2C: ACTIVE (95% load, overloaded)

KPIs:
  - Call drop rate: 45.7% (threshold: 2%)
  - E-RAB setup success: 88.4% (threshold: 98%)
  - Handover success: 91.2% (threshold: 95%)

Remediation: RMD-001 - N2 Interface Link Failure
  - Check physical layer (fiber cables)
  - Verify router/switch port status
  - Test gNodeB to AMF connectivity
  - Verify routing to 5G core
  - Check NG-C/N2 SCTP association
  - Review gNodeB logs for errors
```

## Deployment

### Prerequisites
- OpenShift cluster with admin access
- OpenShift CLI (`oc`) installed
- vLLM service endpoint (Red Hat OpenShift AI or external)
- 2GB+ memory per pod recommended

### Quick Start

1. **Clone repository**
```bash
git clone <repository-url>
cd RAN-remediation-using-Agentic-AI/ai-assistant-based-application-main
```

2. **Login to OpenShift**
```bash
oc login --token=<your-token> --server=<your-server>
oc project ai-assistant
```

3. **Update cluster configuration**
```bash
cd openshift
# Edit params.env with your cluster domain and vLLM endpoint
vim params.env
```

4. **Deploy services**
```bash
# Apply Kustomize configuration
kubectl apply -k .

# Build main application
cd ..
oc start-build ai-assistant-app-build --from-dir=. --follow

# Build RAG service
oc start-build rag-service --from-dir=. --follow

# Build RAN services
cd ran-services
oc start-build ran-services --from-dir=. --follow

# Build RAN simulator
cd ../ran-simulator
oc start-build ran-simulator --from-dir=. --follow
```

5. **Verify deployment**
```bash
oc get pods -n ai-assistant
oc get route ai-assistant-app-route -n ai-assistant
```

### Configuration

**Environment Variables (Deployment)**:
- `VLLM_API_URL` - vLLM inference endpoint
- `RAG_SERVICE_URL` - RAG service address (default: `rag-service:50052`)
- `RAN_SERVICES_URL` - RAN services address (default: `ran-services:5000`)
- `RAN_SIMULATOR_URL` - RAN simulator address (default: `ran-simulator:5001`)

**Build Configuration**:
- All BuildConfigs use Binary source strategy
- Images pushed to internal OpenShift registry
- Resource limits defined in deployment YAML

### Accessing the Application

Once deployed, access the application at:
```
https://<route-host>/admin/agentic-workflows
```

Navigate to Settings to toggle between Demo Mode and Live Agent Mode.

## Local Development

### Prerequisites
- Node.js 20+ and npm
- Python 3.10+

### Setup

**Frontend**:
```bash
cd ai-assistant-based-application-main
npm install
npm run dev
# Application at http://localhost:3001
```

**RAN Services**:
```bash
cd ai-assistant-based-application-main/ran-services
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
# Service at http://localhost:5000
```

**RAN Simulator**:
```bash
cd ai-assistant-based-application-main/ran-simulator
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python gnb.py
# Simulator at http://localhost:5001
```

**RAG Service**:
```bash
cd ai-assistant-based-application-main/server/nest/src/ipex-inference/python
python -m venv venv
source venv/bin/activate
pip install -r rag_requirements.txt
python rag_service.py
# HTTP server at localhost:50052
```

## Usage

### Agentic Workflow Demo

1. Navigate to **Agentic Workflows** page
2. Click example questions or type custom query:
   - "Show me all critical alarms"
   - "What's wrong with SITE-002?"
   - "What are the recommended actions?"
3. Observe agent reasoning in **Agent Activity** tab
4. Review retrieved data in **Retrieval** tab
5. Test live services in **RAN Services** tab

### Settings Configuration

Navigate to **Settings** → **RAN Agentic Workflow**:

- **Demo Mode (Default)**: Fast, consistent responses for demonstrations
- **Live Agent Mode**: vLLM-powered autonomous reasoning (requires vLLM service)

## Technical Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend Framework | Next.js | 15.1.3 |
| UI Library | React | 19 |
| Language | TypeScript | 5.x |
| State Management | Zustand | 5.0.3 |
| Backend API | NestJS | 11.x |
| RAN Services | Flask | 3.0.0 |
| RAG Service | Flask | - |
| Embeddings | sentence-transformers | - |
| LLM | IBM Granite 3.0 8B Instruct | - |
| Inference | vLLM | - |
| Container Platform | OpenShift | 4.x |

## Documentation

- [Deployment Quickstart](./ai-assistant-based-application-main/DEPLOYMENT-QUICKSTART.md)
- [RAN Integration Details](./ai-assistant-based-application-main/RAN-INTEGRATION.md)
- [Session Notes](./AI_Session_Notes/) - Implementation history

## 5G Simulator Based on 3GPP TS 38.xxx Specifications

This application uses 5G NR terminology:
- gNodeB
- N2 interface
- AMF
- NG-RAN architecture
- NGAP protocol

## Project Structure

```
.
├── ai-assistant-based-application-main/
│   ├── app/                          # Next.js application
│   │   ├── admin/                    # Admin pages (Kanban, Tickets, Workflows)
│   │   ├── api/                      # API routes
│   │   │   ├── chat-vllm/           # vLLM + RAG integration
│   │   │   ├── ran-agent/           # Agent orchestration
│   │   │   └── ran-health/          # Health checks
│   │   └── services/                 # Frontend API client
│   ├── components/                   # React components
│   │   └── right-sidebar.tsx        # Context-aware AI assistant
│   ├── lib/
│   │   └── stores/                   # Zustand state management
│   ├── ran-services/                 # RAN services API
│   │   ├── app.py                    # Flask application
│   │   ├── agent.py                  # ReAct agent implementation
│   │   └── data/                     # JSON fixtures (alarms, KPIs, playbooks)
│   ├── ran-simulator/                # 5G gNodeB simulator
│   │   └── gnb.py                    # Simulator implementation
│   ├── server/
│   │   ├── nest/                     # NestJS backend
│   │   └── python/                   # RAG service
│   └── openshift/                    # Deployment configurations
│       ├── kustomization.yaml
│       ├── deployment.yaml
│       ├── buildconfig.yaml
│       ├── service.yaml
│       ├── ran-services/
│       └── ran-simulator/
└── AI_Session_Notes/                 # Implementation documentation

```

## License

Apache License 2.0
