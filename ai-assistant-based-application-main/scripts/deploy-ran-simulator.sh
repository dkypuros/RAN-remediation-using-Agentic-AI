#!/bin/bash
# Deploy RAN Simulator to OpenShift

set -e

NAMESPACE=${NAMESPACE:-ai-assistant}
PROJECT_ROOT=$(dirname $(dirname $(realpath $0)))

echo "🚀 Deploying RAN Simulator to OpenShift namespace: $NAMESPACE"

# Switch to namespace
oc project $NAMESPACE

echo "📦 Creating ImageStream..."
oc apply -f ${PROJECT_ROOT}/openshift/ran-simulator/imagestream.yaml

echo "🔧 Creating BuildConfig..."
oc apply -f ${PROJECT_ROOT}/openshift/ran-simulator/buildconfig.yaml

echo "🏗️  Starting binary build..."
cd ${PROJECT_ROOT}/ran-simulator
oc start-build ran-simulator --from-dir=. --follow --wait

echo "🚀 Creating Deployment..."
oc apply -f ${PROJECT_ROOT}/openshift/ran-simulator/deployment.yaml

echo "🌐 Creating Service..."
oc apply -f ${PROJECT_ROOT}/openshift/ran-simulator/service.yaml

echo "✅ RAN Simulator deployment complete!"
echo ""
echo "📊 Check status with:"
echo "  oc get pods -l app=ran-simulator"
echo "  oc logs -f deployment/ran-simulator"
echo ""
echo "🔍 Test with:"
echo "  oc port-forward svc/ran-simulator 5001:5001"
echo "  curl http://localhost:5001/health"
