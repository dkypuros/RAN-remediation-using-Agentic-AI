#!/bin/bash
# Deploy RAN Services to OpenShift

set -e

NAMESPACE=${NAMESPACE:-ai-assistant}
PROJECT_ROOT=$(dirname $(dirname $(realpath $0)))

echo "🚀 Deploying RAN Services to OpenShift namespace: $NAMESPACE"

# Switch to namespace
oc project $NAMESPACE

echo "📦 Creating ImageStream..."
oc apply -f ${PROJECT_ROOT}/openshift/ran-services/imagestream.yaml

echo "🔧 Creating BuildConfig..."
oc apply -f ${PROJECT_ROOT}/openshift/ran-services/buildconfig.yaml

echo "🏗️  Starting binary build..."
cd ${PROJECT_ROOT}/ran-services
oc start-build ran-services --from-dir=. --follow --wait

echo "🚀 Creating Deployment..."
oc apply -f ${PROJECT_ROOT}/openshift/ran-services/deployment.yaml

echo "🌐 Creating Service..."
oc apply -f ${PROJECT_ROOT}/openshift/ran-services/service.yaml

echo "✅ RAN Services deployment complete!"
echo ""
echo "📊 Check status with:"
echo "  oc get pods -l app=ran-services"
echo "  oc logs -f deployment/ran-services"
echo ""
echo "🔍 Test with:"
echo "  oc port-forward svc/ran-services 5000:5000"
echo "  curl http://localhost:5000/health"
