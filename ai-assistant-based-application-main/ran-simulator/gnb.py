# Simplified gNodeB Simulator for RAN Agentic Workflow Demo
# Based on 3GPP TS 38.413 concepts, simplified for demo purposes

from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from typing import Dict, List
import logging
import random
import threading
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Global state storage
ue_contexts: Dict[int, Dict] = {}
cell_contexts: Dict[str, Dict] = {}
site_contexts: Dict[str, Dict] = {}
ran_ue_ngap_id_counter = 1

class GNodeBSimulator:
    def __init__(self):
        self.name = "gNB-Simulator"
        self.gnb_id = "gnb001"
        self.operational = True
        self._initialize_sites_and_cells()

    def _initialize_sites_and_cells(self):
        """Initialize sites and cells for simulation"""
        # Site 001 - Downtown Plaza (Healthy)
        site_contexts["SITE-001"] = {
            "siteId": "SITE-001",
            "siteName": "Downtown Plaza",
            "status": "OPERATIONAL",
            "gnbId": "gnb001",
            "cells": ["CELL-1A", "CELL-1B", "CELL-1C"]
        }

        # Initialize cells for SITE-001
        for cell_id in ["CELL-1A", "CELL-1B", "CELL-1C"]:
            cell_contexts[cell_id] = {
                "cellId": cell_id,
                "siteId": "SITE-001",
                "sector": f"Sector {cell_id[-1]}",
                "cellState": "ACTIVE",
                "connectedUes": [],
                "load": random.randint(60, 80),
                "averageSINR_dB": random.uniform(15.0, 22.0),
                "averageRSRP_dBm": random.uniform(-85.0, -75.0),
                "averageRSRQ_dB": random.uniform(-10.0, -8.0),
                "pci": random.randint(0, 503),
                "bandwidth_MHz": 100,
                "frequency_MHz": 3500
            }

        # Site 002 - Industrial Park Beta (Degraded - matches our alarm data)
        site_contexts["SITE-002"] = {
            "siteId": "SITE-002",
            "siteName": "Industrial Park Beta",
            "status": "DEGRADED",
            "gnbId": "gnb002",
            "cells": ["CELL-2A", "CELL-2B", "CELL-2C"]
        }

        # CELL-2B is DOWN (transport link failure)
        cell_contexts["CELL-2B"] = {
            "cellId": "CELL-2B",
            "siteId": "SITE-002",
            "sector": "Sector B",
            "cellState": "DOWN",
            "connectedUes": [],
            "load": 0,
            "averageSINR_dB": -2.1,
            "averageRSRP_dBm": -115.8,
            "averageRSRQ_dB": -18.5,
            "pci": 150,
            "bandwidth_MHz": 100,
            "frequency_MHz": 3500
        }

        # CELL-2A and 2C are operational but stressed
        for cell_id in ["CELL-2A", "CELL-2C"]:
            cell_contexts[cell_id] = {
                "cellId": cell_id,
                "siteId": "SITE-002",
                "sector": f"Sector {cell_id[-1]}",
                "cellState": "ACTIVE",
                "connectedUes": [],
                "load": random.randint(85, 95),  # High load due to CELL-2B failure
                "averageSINR_dB": random.uniform(8.0, 12.0),  # Lower SINR
                "averageRSRP_dBm": random.uniform(-95.0, -88.0),  # Weaker signal
                "averageRSRQ_dB": random.uniform(-14.0, -11.0),
                "pci": 150 + (1 if cell_id == "CELL-2A" else 2),
                "bandwidth_MHz": 100,
                "frequency_MHz": 3500
            }

        # Site 003 - University Campus (Healthy)
        site_contexts["SITE-003"] = {
            "siteId": "SITE-003",
            "siteName": "University Campus",
            "status": "OPERATIONAL",
            "gnbId": "gnb003",
            "cells": ["CELL-3A", "CELL-3B"]
        }

        for cell_id in ["CELL-3A", "CELL-3B"]:
            cell_contexts[cell_id] = {
                "cellId": cell_id,
                "siteId": "SITE-003",
                "sector": f"Sector {cell_id[-1]}",
                "cellState": "ACTIVE",
                "connectedUes": [],
                "load": random.randint(40, 60),
                "averageSINR_dB": random.uniform(16.0, 24.0),
                "averageRSRP_dBm": random.uniform(-82.0, -72.0),
                "averageRSRQ_dB": random.uniform(-9.0, -7.0),
                "pci": 200 + (0 if cell_id == "CELL-3A" else 1),
                "bandwidth_MHz": 100,
                "frequency_MHz": 3500
            }

        # Site 004 - Residential Complex (Warning - High VSWR)
        site_contexts["SITE-004"] = {
            "siteId": "SITE-004",
            "siteName": "Residential Complex",
            "status": "WARNING",
            "gnbId": "gnb004",
            "cells": ["CELL-4A", "CELL-4B", "CELL-4C"]
        }

        for cell_id in ["CELL-4A", "CELL-4B", "CELL-4C"]:
            cell_contexts[cell_id] = {
                "cellId": cell_id,
                "siteId": "SITE-004",
                "sector": f"Sector {cell_id[-1]}",
                "cellState": "ACTIVE",
                "connectedUes": [],
                "load": random.randint(50, 70),
                "averageSINR_dB": random.uniform(12.0, 18.0),
                "averageRSRP_dBm": random.uniform(-90.0, -80.0),
                "averageRSRQ_dB": random.uniform(-12.0, -9.0),
                "pci": 300 + (0 if cell_id == "CELL-4A" else (1 if cell_id == "CELL-4B" else 2)),
                "bandwidth_MHz": 100,
                "frequency_MHz": 3500
            }

        logger.info(f"Initialized {len(site_contexts)} sites and {len(cell_contexts)} cells")

        # Start UE simulation
        self._populate_initial_ues()

    def _populate_initial_ues(self):
        """Populate initial UE connections"""
        global ran_ue_ngap_id_counter

        # Add UEs to healthy cells
        for cell_id, cell in cell_contexts.items():
            if cell["cellState"] == "ACTIVE" and cell["siteId"] != "SITE-002":
                # Normal sites get normal UE count
                num_ues = random.randint(40, 60)
            elif cell["cellState"] == "ACTIVE" and cell["siteId"] == "SITE-002":
                # SITE-002 cells are overloaded (taking load from CELL-2B)
                num_ues = random.randint(70, 90)
            else:
                # DOWN cells have no UEs
                num_ues = 0

            for _ in range(num_ues):
                ue_id = ran_ue_ngap_id_counter
                ran_ue_ngap_id_counter += 1

                ue_contexts[ue_id] = {
                    "ranUeNgapId": ue_id,
                    "ueState": "CONNECTED",
                    "cellId": cell_id,
                    "siteId": cell["siteId"],
                    "pduSessions": 1,
                    "lastActivity": datetime.utcnow().isoformat(),
                    "throughput_Mbps": random.uniform(10.0, 50.0),
                    "sinr_dB": cell["averageSINR_dB"] + random.uniform(-3.0, 3.0)
                }

                cell["connectedUes"].append(ue_id)

        logger.info(f"Initialized {len(ue_contexts)} UEs across all cells")

    def generate_ran_ue_ngap_id(self) -> int:
        """Generate unique RAN UE NGAP ID"""
        global ran_ue_ngap_id_counter
        ran_ue_ngap_id = ran_ue_ngap_id_counter
        ran_ue_ngap_id_counter += 1
        return ran_ue_ngap_id

# Initialize simulator instance
gnb_simulator = GNodeBSimulator()

# REST API Endpoints

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "RAN-Simulator",
        "operational": gnb_simulator.operational,
        "active_sites": len(site_contexts),
        "active_cells": len(cell_contexts),
        "connected_ues": len(ue_contexts)
    })

@app.route('/gnb/status', methods=['GET'])
def get_gnb_status():
    """Get overall gNodeB status"""
    return jsonify({
        "status": "operational",
        "gnbId": gnb_simulator.gnb_id,
        "connected_ues": len(ue_contexts),
        "served_cells": len(cell_contexts),
        "served_sites": len(site_contexts)
    })

@app.route('/gnb/sites', methods=['GET'])
def get_sites():
    """Get all site contexts"""
    return jsonify({
        "total_sites": len(site_contexts),
        "sites": list(site_contexts.values())
    })

@app.route('/gnb/sites/<site_id>', methods=['GET'])
def get_site(site_id):
    """Get specific site context"""
    site = site_contexts.get(site_id)
    if not site:
        return jsonify({"error": f"Site {site_id} not found"}), 404

    # Include cell details for the site
    site_cells = [cell for cell in cell_contexts.values() if cell["siteId"] == site_id]

    # Calculate site-level metrics
    total_ues = sum(len(cell["connectedUes"]) for cell in site_cells)
    avg_load = sum(cell["load"] for cell in site_cells) / len(site_cells) if site_cells else 0

    return jsonify({
        "site": site,
        "cells": site_cells,
        "metrics": {
            "total_connected_ues": total_ues,
            "average_cell_load": round(avg_load, 2),
            "active_cells": len([c for c in site_cells if c["cellState"] == "ACTIVE"]),
            "total_cells": len(site_cells)
        }
    })

@app.route('/gnb/cells', methods=['GET'])
def get_cells():
    """Get all cell contexts"""
    site_id = request.args.get('site_id')

    if site_id:
        filtered_cells = {
            cell_id: cell for cell_id, cell in cell_contexts.items()
            if cell["siteId"] == site_id
        }
        return jsonify({
            "total_cells": len(filtered_cells),
            "site_id": site_id,
            "cells": list(filtered_cells.values())
        })

    return jsonify({
        "total_cells": len(cell_contexts),
        "cells": list(cell_contexts.values())
    })

@app.route('/gnb/cells/<cell_id>', methods=['GET'])
def get_cell(cell_id):
    """Get specific cell context"""
    cell = cell_contexts.get(cell_id)
    if not cell:
        return jsonify({"error": f"Cell {cell_id} not found"}), 404

    # Include UE details for the cell
    cell_ues = [ue for ue in ue_contexts.values() if ue["cellId"] == cell_id]

    return jsonify({
        "cell": cell,
        "connected_ues": len(cell_ues),
        "ue_details": cell_ues[:10]  # Limit to first 10 UEs for performance
    })

@app.route('/gnb/ues', methods=['GET'])
def get_ues():
    """Get all UE contexts"""
    site_id = request.args.get('site_id')
    cell_id = request.args.get('cell_id')

    filtered_ues = ue_contexts

    if site_id:
        filtered_ues = {
            ue_id: ue for ue_id, ue in ue_contexts.items()
            if ue["siteId"] == site_id
        }

    if cell_id:
        filtered_ues = {
            ue_id: ue for ue_id, ue in filtered_ues.items()
            if ue["cellId"] == cell_id
        }

    return jsonify({
        "total_ues": len(filtered_ues),
        "ues": list(filtered_ues.values())[:100]  # Limit for performance
    })

@app.route('/gnb/metrics', methods=['GET'])
def get_metrics():
    """Get overall metrics"""
    connected_ues = len([ue for ue in ue_contexts.values() if ue["ueState"] == "CONNECTED"])
    active_cells = len([cell for cell in cell_contexts.values() if cell["cellState"] == "ACTIVE"])

    # Calculate average RF metrics across active cells
    active_cell_list = [cell for cell in cell_contexts.values() if cell["cellState"] == "ACTIVE"]
    avg_sinr = sum(cell["averageSINR_dB"] for cell in active_cell_list) / len(active_cell_list) if active_cell_list else 0
    avg_rsrp = sum(cell["averageRSRP_dBm"] for cell in active_cell_list) / len(active_cell_list) if active_cell_list else 0

    return jsonify({
        "total_ues": len(ue_contexts),
        "connected_ues": connected_ues,
        "active_cells": active_cells,
        "total_cells": len(cell_contexts),
        "active_sites": len([s for s in site_contexts.values() if s["status"] == "OPERATIONAL"]),
        "total_sites": len(site_contexts),
        "average_sinr_dB": round(avg_sinr, 2),
        "average_rsrp_dBm": round(avg_rsrp, 2)
    })

# Background task to simulate UE activity
def simulate_ue_activity():
    """Background task to simulate UE connections/disconnections"""
    while True:
        time.sleep(5)  # Run every 5 seconds for more dynamic demos

        # Simulate UE activity in active cells
        for cell_id, cell in cell_contexts.items():
            if cell["cellState"] == "ACTIVE":
                # 70% chance to modify UE count (more frequent changes)
                if random.random() < 0.7:
                    # Randomly add or remove UEs (1-5 UEs at a time for more visible changes)
                    num_changes = random.randint(1, 5)

                    if random.random() < 0.5 and len(cell["connectedUes"]) > 20:
                        # Remove UEs
                        for _ in range(min(num_changes, len(cell["connectedUes"]) - 20)):
                            if cell["connectedUes"]:
                                ue_id = cell["connectedUes"].pop()
                                if ue_id in ue_contexts:
                                    del ue_contexts[ue_id]
                    else:
                        # Add UEs (cap based on site health)
                        max_ues = 100 if cell["siteId"] != "SITE-002" else 95
                        for _ in range(num_changes):
                            if len(cell["connectedUes"]) < max_ues:
                                ue_id = gnb_simulator.generate_ran_ue_ngap_id()
                                ue_contexts[ue_id] = {
                                    "ranUeNgapId": ue_id,
                                    "ueState": "CONNECTED",
                                    "cellId": cell_id,
                                    "siteId": cell["siteId"],
                                    "pduSessions": 1,
                                    "lastActivity": datetime.utcnow().isoformat(),
                                    "throughput_Mbps": random.uniform(10.0, 50.0),
                                    "sinr_dB": cell["averageSINR_dB"] + random.uniform(-3.0, 3.0)
                                }
                                cell["connectedUes"].append(ue_id)

                # Update cell load and RF metrics dynamically
                ue_count = len(cell["connectedUes"])
                cell["load"] = min(100, int((ue_count / 100.0) * 100))

                # Slightly vary SINR/RSRP for realism (small fluctuations)
                if cell["siteId"] == "SITE-002" and cell_id in ["CELL-2A", "CELL-2C"]:
                    # SITE-002 cells fluctuate more due to stress
                    cell["averageSINR_dB"] = max(6.0, min(14.0, cell["averageSINR_dB"] + random.uniform(-1.5, 1.5)))
                    cell["load"] = min(100, max(80, cell["load"] + random.randint(-5, 5)))
                else:
                    # Normal fluctuations
                    base_sinr = 18.0
                    cell["averageSINR_dB"] = max(12.0, min(25.0, base_sinr + random.uniform(-3.0, 3.0)))

if __name__ == "__main__":
    # Start background simulation thread
    simulation_thread = threading.Thread(target=simulate_ue_activity, daemon=True)
    simulation_thread.start()

    app.run(host="0.0.0.0", port=5001, debug=False)
