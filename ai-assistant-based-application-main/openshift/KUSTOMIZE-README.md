# Kustomize Deployment Guide

This guide explains how to gather cluster-specific parameters and deploy the AI Ticket Assistant application using Kustomize.

## Prerequisites

- Access to an OpenShift cluster
- `oc` CLI tool installed
- `kubectl` CLI tool installed (for kustomize)
- Logged into your OpenShift cluster

## Step 1: Gather Cluster-Specific Parameters

Before deploying, you need to collect several cluster-specific values:

### 1.1 Find the Cluster Domain

Your cluster domain is the base URL for routes in your cluster.

```bash
# Method 1: Check existing routes
oc get routes --all-namespaces | head -5

# The domain will be in the HOST/PORT column, e.g.:
# vllm-composer-ai-apps.apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com
# Extract: apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com
```

**Result**: `apps.cluster-XXXXX.XXXXX.sandboxXXXX.opentlc.com`

### 1.2 Find the vLLM API Endpoint

The vLLM service should already be deployed in your Composer AI environment.

```bash
# Find the vLLM route
oc get routes --all-namespaces | grep -i vllm

# Look for a route named something like: vllm-composer-ai-apps
# Full URL format: https://vllm-composer-ai-apps.apps.cluster-XXXXX.XXXXX.sandboxXXXX.opentlc.com/v1/completions
```

**Result**: `https://vllm-composer-ai-apps.apps.cluster-XXXXX.XXXXX.sandboxXXXX.opentlc.com/v1/completions`

### 1.3 Get the Image Pull Secret Name

Each OpenShift project has an automatically generated secret for the builder service account.

```bash
# First, create your project if it doesn't exist
oc new-project ai-assistant

# Get the builder service account's image pull secret
oc describe serviceaccount builder -n ai-assistant | grep "Image pull secrets"

# Output will look like:
# Image pull secrets:  builder-dockercfg-sfkmz
```

**Result**: `builder-dockercfg-XXXXX` (unique per project)

### 1.4 Summary of Parameters

After gathering the above information, you should have:

| Parameter | Example Value | Your Value |
|-----------|--------------|------------|
| CLUSTER_DOMAIN | apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com | __________ |
| VLLM_API_URL | https://vllm-composer-ai-apps.apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com/v1/completions | __________ |
| IMAGE_PULL_SECRET | builder-dockercfg-sfkmz | __________ |
| NAMESPACE | ai-assistant | __________ |

## Step 2: Update Kustomization Configuration

Open the `kustomization.yaml` file and update the values in two places:

### 2.1 Update the Patches Section

Replace the cluster-specific values in the patches:

```yaml
patches:
  # Update VLLM_API_URL in main deployment
  - target:
      kind: Deployment
      name: ai-assistant-app
    patch: |-
      - op: replace
        path: /spec/template/spec/containers/0/env/0/value
        value: YOUR_VLLM_API_URL_HERE

  # Update image pull secret in main deployment
  - target:
      kind: Deployment
      name: ai-assistant-app
    patch: |-
      - op: replace
        path: /spec/template/spec/imagePullSecrets/0/name
        value: YOUR_IMAGE_PULL_SECRET_HERE

  # Update push secret in buildconfig
  - target:
      kind: BuildConfig
      name: ai-assistant-app-build
    patch: |-
      - op: replace
        path: /spec/output/pushSecret/name
        value: YOUR_IMAGE_PULL_SECRET_HERE

  # Update image pull secret in RAG deployment
  - target:
      kind: Deployment
      name: rag-service
    patch: |-
      - op: replace
        path: /spec/template/spec/imagePullSecrets/0/name
        value: YOUR_IMAGE_PULL_SECRET_HERE
```

### 2.2 Update the ConfigMap Generator

Update the literals in the configMapGenerator section:

```yaml
configMapGenerator:
  - name: cluster-config
    literals:
      - CLUSTER_DOMAIN=YOUR_CLUSTER_DOMAIN_HERE
      - IMAGE_PULL_SECRET=YOUR_IMAGE_PULL_SECRET_HERE
      - VLLM_API_URL=YOUR_VLLM_API_URL_HERE
```

### 2.3 Alternative: Use params.env File

You can also update the `params.env` file with your values:

```bash
# Edit params.env
cat > params.env <<EOF
# Cluster-specific parameters
CLUSTER_DOMAIN=apps.cluster-XXXXX.XXXXX.sandboxXXXX.opentlc.com
IMAGE_PULL_SECRET=builder-dockercfg-XXXXX
VLLM_API_URL=https://vllm-composer-ai-apps.apps.cluster-XXXXX.XXXXX.sandboxXXXX.opentlc.com/v1/completions
NAMESPACE=ai-assistant
EOF
```

## Step 3: Validate Kustomize Configuration

Before deploying, validate that your kustomization builds correctly:

```bash
# Change to the openshift directory
cd openshift/

# Build and view the generated manifests
kubectl kustomize . | less

# Check specific values were updated
kubectl kustomize . | grep -A5 "VLLM_API_URL"
kubectl kustomize . | grep "imagePullSecrets" -A1
```

Look for:
- ✅ VLLM_API_URL matches your cluster
- ✅ imagePullSecrets show your correct secret name
- ✅ namespace is set to `ai-assistant`

## Step 4: Deploy to OpenShift

Once validated, deploy using kustomize:

```bash
# Make sure you're in the correct project
oc project ai-assistant

# Option 1: Apply directly with kubectl
kubectl apply -k .

# Option 2: Build and pipe to oc
kubectl kustomize . | oc apply -f -
```

### 4.1 Create GitLab Secret (if using private repo)

If your buildconfig uses a private GitLab repository:

```bash
oc create secret generic gitlab-pat \
  --from-literal=username=YOUR_GITLAB_USERNAME \
  --from-literal=password=YOUR_GITLAB_TOKEN \
  -n ai-assistant
```

### 4.2 Start Builds

```bash
# Start the main application build
oc start-build ai-assistant-app-build -n ai-assistant

# Start the RAG service build
oc start-build rag-service -n ai-assistant
```

## Step 5: Monitor Deployment

```bash
# Watch build progress
oc get builds -n ai-assistant -w

# Check pod status
oc get pods -n ai-assistant

# View logs
oc logs deployment/ai-assistant-app -n ai-assistant
oc logs deployment/rag-service -n ai-assistant

# Get the application route
oc get route -n ai-assistant
```

## Troubleshooting

### Build Fails with Image Pull Error

If you see "imagepullbackoff" errors:

```bash
# Verify the secret name is correct
oc get secrets -n ai-assistant | grep builder-dockercfg

# Update kustomization.yaml with the correct secret name
# Then reapply: kubectl apply -k .
```

### Cannot Find vLLM Route

```bash
# Check all namespaces for vLLM
oc get routes --all-namespaces | grep -i vllm

# Check if vLLM is running
oc get pods --all-namespaces | grep -i vllm
```

### Deployment Not Using Updated Values

```bash
# Rebuild the kustomization
kubectl kustomize . > /tmp/manifest.yaml

# Inspect the manifest
cat /tmp/manifest.yaml | grep VLLM_API_URL

# Apply the built manifest
oc apply -f /tmp/manifest.yaml
```

## Quick Reference Commands

```bash
# Gather all parameters in one go
echo "=== Cluster Parameters ==="
echo "Cluster Domain:"
oc get routes --all-namespaces | head -2 | tail -1 | awk '{print $3}' | cut -d'.' -f2-

echo "vLLM API URL:"
oc get routes --all-namespaces | grep vllm | head -1 | awk '{print "https://"$3"/v1/completions"}'

echo "Image Pull Secret:"
oc describe serviceaccount builder -n ai-assistant | grep "Image pull secrets" | awk '{print $4}'
```

## Benefits of Kustomize

✅ **Simple parameterization** - Update values in one place
✅ **No template engine needed** - Pure Kubernetes YAML
✅ **Easy validation** - Preview changes before applying
✅ **Version controlled** - Track parameter changes in git
✅ **Reusable** - Easy to deploy to new clusters

## Next Steps

- Review the `quickstart.md` for detailed deployment steps
- Check `environment-vars.md` for additional configuration options
- Monitor your application logs after deployment
