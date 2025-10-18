"""
RAN Services API
Provides endpoints for RAN data, alarms, KPIs, and remediation playbooks
Also provides proxy endpoints to live RAN simulator
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
RAN_SIMULATOR_URL = os.environ.get('RAN_SIMULATOR_URL', 'http://ran-simulator:5001')

# Load data from JSON files
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

def load_json(filename):
    """Load JSON data from file"""
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r') as f:
        return json.load(f)

# Cache data in memory
alarms_data = load_json('alarms.json')
kpis_data = load_json('kpis.json')
cell_details_data = load_json('cell_details.json')
remediation_data = load_json('remediation_playbooks.json')

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    # Check simulator connectivity
    simulator_status = 'unknown'
    try:
        sim_response = requests.get(f'{RAN_SIMULATOR_URL}/health', timeout=2)
        if sim_response.status_code == 200:
            simulator_status = 'connected'
        else:
            simulator_status = 'unreachable'
    except:
        simulator_status = 'unreachable'

    return jsonify({
        'status': 'healthy',
        'service': 'ran-services',
        'simulator_status': simulator_status,
        'simulator_url': RAN_SIMULATOR_URL,
        'endpoints': {
            'fixtures': [
                '/api/ran/alarms',
                '/api/ran/kpis',
                '/api/ran/kpis/<site_id>',
                '/api/ran/cell-details',
                '/api/ran/cell-details/<site_id>',
                '/api/ran/remediation',
                '/api/ran/remediation/<playbook_id>',
                '/api/ran/search-remediation'
            ],
            'live_simulator': [
                '/api/ran/live-sites',
                '/api/ran/live-sites/<site_id>',
                '/api/ran/live-cells',
                '/api/ran/live-cells/<cell_id>',
                '/api/ran/live-ues',
                '/api/ran/live-metrics',
                '/api/ran/live-status'
            ],
            'combined': [
                '/api/ran/combined-site-analysis/<site_id>'
            ]
        }
    })

@app.route('/api/ran/alarms', methods=['GET'])
def get_alarms():
    """Get all active alarms"""
    severity = request.args.get('severity')
    site_id = request.args.get('site_id')

    filtered_alarms = alarms_data['alarms']

    if severity:
        filtered_alarms = [a for a in filtered_alarms if a['severity'] == severity.upper()]

    if site_id:
        filtered_alarms = [a for a in filtered_alarms if a['siteId'] == site_id]

    return jsonify({
        'timestamp': alarms_data['timestamp'],
        'count': len(filtered_alarms),
        'alarms': filtered_alarms
    })

@app.route('/api/ran/kpis', methods=['GET'])
def get_kpis():
    """Get KPI reports for all sites"""
    status = request.args.get('status')

    filtered_kpis = kpis_data['kpiReport']

    if status:
        filtered_kpis = [k for k in filtered_kpis if k['status'] == status.upper()]

    return jsonify({
        'timestamp': kpis_data['timestamp'],
        'count': len(filtered_kpis),
        'kpiReport': filtered_kpis
    })

@app.route('/api/ran/kpis/<site_id>', methods=['GET'])
def get_kpis_by_site(site_id):
    """Get KPI report for specific site"""
    site_kpis = next((k for k in kpis_data['kpiReport'] if k['siteId'] == site_id), None)

    if not site_kpis:
        return jsonify({'error': f'Site {site_id} not found'}), 404

    return jsonify({
        'timestamp': kpis_data['timestamp'],
        'siteKpis': site_kpis
    })

@app.route('/api/ran/cell-details', methods=['GET'])
def get_all_cell_details():
    """Get cell details for all sites"""
    return jsonify(cell_details_data)

@app.route('/api/ran/cell-details/<site_id>', methods=['GET'])
def get_cell_details(site_id):
    """Get cell details for specific site"""
    site_data = cell_details_data['sites'].get(site_id)

    if not site_data:
        return jsonify({'error': f'Site {site_id} not found'}), 404

    return jsonify({
        'timestamp': cell_details_data['timestamp'],
        'siteId': site_id,
        'siteData': site_data
    })

@app.route('/api/ran/remediation', methods=['GET'])
def get_remediation_playbooks():
    """Get all remediation playbooks"""
    category = request.args.get('category')
    severity = request.args.get('severity')

    filtered_playbooks = remediation_data['playbooks']

    if category:
        filtered_playbooks = [p for p in filtered_playbooks if p['category'] == category]

    if severity:
        filtered_playbooks = [p for p in filtered_playbooks if p['severity'] == severity.upper()]

    return jsonify({
        'count': len(filtered_playbooks),
        'playbooks': filtered_playbooks
    })

@app.route('/api/ran/remediation/<playbook_id>', methods=['GET'])
def get_remediation_playbook(playbook_id):
    """Get specific remediation playbook"""
    playbook = next((p for p in remediation_data['playbooks'] if p['playbookId'] == playbook_id), None)

    if not playbook:
        return jsonify({'error': f'Playbook {playbook_id} not found'}), 404

    return jsonify({'playbook': playbook})

@app.route('/api/ran/search-remediation', methods=['POST'])
def search_remediation():
    """Search for relevant remediation playbooks based on symptoms"""
    data = request.json
    alarm_type = data.get('alarm_type', '')
    symptoms = data.get('symptoms', [])

    # Simple matching logic
    matching_playbooks = []

    for playbook in remediation_data['playbooks']:
        score = 0

        # Check if alarm type matches
        if alarm_type and alarm_type in playbook.get('applicableAlarms', []):
            score += 10

        # Check if alarm type matches category
        if alarm_type and alarm_type == playbook.get('category'):
            score += 10

        # Check for symptom matches
        playbook_symptoms = [s.lower() for s in playbook.get('symptoms', [])]
        for symptom in symptoms:
            symptom_lower = symptom.lower()
            if any(symptom_lower in ps for ps in playbook_symptoms):
                score += 5

        if score > 0:
            matching_playbooks.append({
                'playbook': playbook,
                'relevance_score': score
            })

    # Sort by relevance score
    matching_playbooks.sort(key=lambda x: x['relevance_score'], reverse=True)

    return jsonify({
        'count': len(matching_playbooks),
        'results': matching_playbooks[:3]  # Top 3 matches
    })

# ============================================================================
# Live RAN Simulator Proxy Endpoints
# ============================================================================

@app.route('/api/ran/live-sites', methods=['GET'])
def get_live_sites():
    """Proxy to RAN simulator - get live site data"""
    try:
        response = requests.get(f'{RAN_SIMULATOR_URL}/gnb/sites', timeout=5)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({
            'error': 'Failed to connect to RAN simulator',
            'details': str(e)
        }), 503

@app.route('/api/ran/live-sites/<site_id>', methods=['GET'])
def get_live_site(site_id):
    """Proxy to RAN simulator - get live site data for specific site"""
    try:
        response = requests.get(f'{RAN_SIMULATOR_URL}/gnb/sites/{site_id}', timeout=5)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({
            'error': f'Failed to get site {site_id} from RAN simulator',
            'details': str(e)
        }), 503

@app.route('/api/ran/live-cells', methods=['GET'])
def get_live_cells():
    """Proxy to RAN simulator - get live cell data"""
    try:
        site_id = request.args.get('site_id')
        url = f'{RAN_SIMULATOR_URL}/gnb/cells'
        if site_id:
            url += f'?site_id={site_id}'

        response = requests.get(url, timeout=5)
        response.raise_for_status()

        # Transform simulator data to match our data model
        simulator_data = response.json()
        cells = simulator_data.get('cells', [])

        # Enrich with calculated metrics
        enriched_cells = []
        for cell in cells:
            enriched_cell = cell.copy()
            # Add calculated fields if needed
            enriched_cell['quality'] = 'GOOD' if cell.get('averageSINR_dB', 0) > 15 else 'DEGRADED'
            enriched_cells.append(enriched_cell)

        return jsonify({
            'timestamp': datetime.utcnow().isoformat(),
            'source': 'ran-simulator',
            'total_cells': len(enriched_cells),
            'cells': enriched_cells
        })
    except requests.RequestException as e:
        return jsonify({
            'error': 'Failed to get cells from RAN simulator',
            'details': str(e)
        }), 503

@app.route('/api/ran/live-cells/<cell_id>', methods=['GET'])
def get_live_cell(cell_id):
    """Proxy to RAN simulator - get live cell data for specific cell"""
    try:
        response = requests.get(f'{RAN_SIMULATOR_URL}/gnb/cells/{cell_id}', timeout=5)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({
            'error': f'Failed to get cell {cell_id} from RAN simulator',
            'details': str(e)
        }), 503

@app.route('/api/ran/live-ues', methods=['GET'])
def get_live_ues():
    """Proxy to RAN simulator - get live UE data"""
    try:
        site_id = request.args.get('site_id')
        cell_id = request.args.get('cell_id')

        params = {}
        if site_id:
            params['site_id'] = site_id
        if cell_id:
            params['cell_id'] = cell_id

        response = requests.get(f'{RAN_SIMULATOR_URL}/gnb/ues', params=params, timeout=5)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({
            'error': 'Failed to get UEs from RAN simulator',
            'details': str(e)
        }), 503

@app.route('/api/ran/live-metrics', methods=['GET'])
def get_live_metrics():
    """Proxy to RAN simulator - get live metrics"""
    try:
        response = requests.get(f'{RAN_SIMULATOR_URL}/gnb/metrics', timeout=5)
        response.raise_for_status()

        metrics = response.json()

        # Enhance with additional metadata
        enhanced_metrics = {
            'timestamp': datetime.utcnow().isoformat(),
            'source': 'ran-simulator',
            'metrics': metrics
        }

        return jsonify(enhanced_metrics)
    except requests.RequestException as e:
        return jsonify({
            'error': 'Failed to get metrics from RAN simulator',
            'details': str(e)
        }), 503

@app.route('/api/ran/live-status', methods=['GET'])
def get_live_status():
    """Proxy to RAN simulator - get overall status"""
    try:
        response = requests.get(f'{RAN_SIMULATOR_URL}/gnb/status', timeout=5)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({
            'error': 'Failed to get status from RAN simulator',
            'details': str(e)
        }), 503

@app.route('/api/ran/combined-site-analysis/<site_id>', methods=['GET'])
def get_combined_site_analysis(site_id):
    """
    Combined endpoint that merges live simulator data with fixture data
    Provides comprehensive site analysis including:
    - Live cell/UE state from simulator
    - Alarms from fixtures
    - KPIs from fixtures
    - Remediation recommendations
    """
    analysis = {
        'siteId': site_id,
        'timestamp': datetime.utcnow().isoformat(),
        'live_data': {},
        'alarms': [],
        'kpis': {},
        'cells': [],
        'recommendations': []
    }

    # Get live data from simulator
    try:
        site_response = requests.get(f'{RAN_SIMULATOR_URL}/gnb/sites/{site_id}', timeout=5)
        if site_response.status_code == 200:
            analysis['live_data'] = site_response.json()
    except:
        pass

    # Get alarms from fixtures
    site_alarms = [a for a in alarms_data['alarms'] if a['siteId'] == site_id]
    analysis['alarms'] = site_alarms

    # Get KPIs from fixtures
    site_kpis = next((k for k in kpis_data['kpiReport'] if k['siteId'] == site_id), None)
    if site_kpis:
        analysis['kpis'] = site_kpis

    # Get cell details from fixtures
    site_cell_data = cell_details_data['sites'].get(site_id)
    if site_cell_data:
        analysis['cells'] = site_cell_data.get('cells', [])

    # Find relevant remediation playbooks based on alarms
    for alarm in site_alarms:
        matching = [p for p in remediation_data['playbooks']
                   if alarm['type'] in p.get('applicableAlarms', []) or
                      alarm['type'] == p.get('category')]
        analysis['recommendations'].extend(matching)

    # Deduplicate recommendations
    seen = set()
    unique_recommendations = []
    for rec in analysis['recommendations']:
        if rec['playbookId'] not in seen:
            seen.add(rec['playbookId'])
            unique_recommendations.append(rec)
    analysis['recommendations'] = unique_recommendations

    return jsonify(analysis)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
