#!/bin/bash
# Deploy all RAN components (simulator + services) to OpenShift

set -e

NAMESPACE=${NAMESPACE:-ai-assistant}
SCRIPT_DIR=$(dirname $(realpath $0))

echo "🚀 Deploying all RAN components to OpenShift namespace: $NAMESPACE"
echo ""

# Deploy RAN Simulator first
echo "======================================"
echo "1️⃣  Deploying RAN Simulator"
echo "======================================"
bash ${SCRIPT_DIR}/deploy-ran-simulator.sh

echo ""
echo "Waiting for RAN Simulator to be ready..."
sleep 10

# Deploy RAN Services
echo ""
echo "======================================"
echo "2️⃣  Deploying RAN Services"
echo "======================================"
bash ${SCRIPT_DIR}/deploy-ran-services.sh

echo ""
echo "✅ All RAN components deployed successfully!"
echo ""
echo "📊 Check overall status:"
echo "  oc get pods -l component=backend"
echo ""
echo "🔍 Test connectivity:"
echo "  oc port-forward svc/ran-simulator 5001:5001 &"
echo "  oc port-forward svc/ran-services 5000:5000 &"
echo "  curl http://localhost:5001/health"
echo "  curl http://localhost:5000/health"
