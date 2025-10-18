# RAN Simulator

Simplified 5G RAN simulator providing live cell and UE state data for the AI RAN Agentic Workflow Demo.

## Features

- **Site Management**: Multiple sites with realistic operational states
- **Cell Contexts**: Per-cell RF metrics (SINR, RSRP, RSRQ), load, and status
- **UE Simulation**: Dynamic UE connections with realistic distribution
- **Live Metrics**: Real-time cell and UE state updates

## Architecture

Based on 3GPP TS 38.413 concepts, simplified for demo purposes. Provides:
- Site-level contexts (SITE-001, SITE-002, SITE-003, SITE-004)
- Cell-level contexts with RF metrics
- UE contexts with connection state

## Simulated Network

### SITE-001 - Downtown Plaza (OPERATIONAL)
- Cells: CELL-1A, CELL-1B, CELL-1C
- Status: Healthy, normal load

### SITE-002 - Industrial Park Beta (DEGRADED)
- Cells: CELL-2A, CELL-2B (DOWN), CELL-2C
- Status: CELL-2B offline due to transport link failure
- Impact: Remaining cells overloaded

### SITE-003 - University Campus (OPERATIONAL)
- Cells: CELL-3A, CELL-3B
- Status: Healthy

### SITE-004 - Residential Complex (WARNING)
- Cells: CELL-4A, CELL-4B, CELL-4C
- Status: High VSWR warning

## API Endpoints

### Health Check
```bash
GET /health
```

### Sites
```bash
GET /gnb/sites              # Get all sites
GET /gnb/sites/{site_id}    # Get specific site with cells
```

### Cells
```bash
GET /gnb/cells                    # Get all cells
GET /gnb/cells?site_id={site_id}  # Get cells for site
GET /gnb/cells/{cell_id}          # Get specific cell
```

### UEs
```bash
GET /gnb/ues                        # Get all UEs
GET /gnb/ues?site_id={site_id}      # Get UEs for site
GET /gnb/ues?cell_id={cell_id}      # Get UEs for cell
```

### Metrics
```bash
GET /gnb/metrics            # Get overall metrics
GET /gnb/status             # Get gNodeB status
```

## Running Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Run simulator
python gnb.py
```

Simulator runs on port 5001.

## Running with Docker

```bash
# Build image
docker build -t ran-simulator .

# Run container
docker run -p 5001:5001 ran-simulator
```

## OpenShift Deployment

See `openshift/ran-simulator/` for deployment configurations.

## Integration

This simulator is integrated with the RAN Services API (`ran-services/app.py`) which provides proxy endpoints for the AI agent to consume both live simulator data and synthetic fixture data.
