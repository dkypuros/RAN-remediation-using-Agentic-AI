"""
RAN Services API
Provides endpoints for RAN data, alarms, KPIs, and remediation playbooks
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

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
    return jsonify({
        'status': 'healthy',
        'service': 'ran-services',
        'endpoints': [
            '/api/ran/alarms',
            '/api/ran/kpis',
            '/api/ran/kpis/<site_id>',
            '/api/ran/cell-details',
            '/api/ran/cell-details/<site_id>',
            '/api/ran/remediation',
            '/api/ran/remediation/<playbook_id>'
        ]
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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
