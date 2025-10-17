# Quickstart Guide for AI Ticket Assistant with RAG

This guide provides steps to deploy the AI Ticket Assistant application with Retrieval Augmented Generation (RAG) on OpenShift.

## Prerequisites

- Access to an OpenShift cluster
- `oc` CLI tool installed
- Proper permissions to create resources in a namespace
- GitLab access token (for accessing private repositories)

## Deployment Steps

### 1. Create a new project (if needed)

```bash
oc new-project ai-assistant
```

### 2. Create GitLab access token secret

```bash
oc create secret generic gitlab-pat --from-literal=username=<your-username> --from-literal=password=<your-token> -n ai-assistant
```

### 3. Deploy the AI Ticket Assistant application

```bash
# Apply the configuration files
oc apply -f openshift/service.yaml -n ai-assistant
oc apply -f openshift/buildconfig.yaml -n ai-assistant
oc apply -f openshift/deployment.yaml -n ai-assistant
oc apply -f openshift/route.yaml -n ai-assistant

# Start the build process
oc start-build ai-assistant-app-build -n ai-assistant
```

### 4. Deploy the RAG service

```bash
# Create the service and image stream
oc apply -f openshift/rag-service.yaml -n ai-assistant
oc apply -f openshift/rag-imagestream.yaml -n ai-assistant

# Create persistent volume claim for RAG service model cache
oc apply -f openshift/rag-pvc.yaml -n ai-assistant

# Create and start the RAG build
oc apply -f openshift/rag-buildconfig.yaml -n ai-assistant
oc start-build rag-service -n ai-assistant

# Deploy the RAG service once the build completes
oc apply -f openshift/rag-deployment.yaml -n ai-assistant
```

### 5. Monitor deployment status

```bash
# Check the build status
oc get builds -n ai-assistant

# Check running pods
oc get pods -n ai-assistant

# Check the application route
oc get route -n ai-assistant
```

## Environment Variables

- `VLLM_API_URL`: URL of the vLLM API endpoint
- `RAG_SERVICE_URL`: Internal URL of the RAG service (default: rag-service:50052)

## Troubleshooting

### View logs

```bash
# View AI application logs
oc logs deployment/ai-assistant-app -n ai-assistant

# View RAG service logs
oc logs deployment/rag-service -n ai-assistant

# View build logs
oc logs build/rag-service-<build-number> -n ai-assistant
```

### Restart deployments

```bash
oc rollout restart deployment/ai-assistant-app -n ai-assistant
oc rollout restart deployment/rag-service -n ai-assistant
```

### Common Issues

#### RAG Service Build Failures

If the RAG service build fails with protobuf version conflicts:

```bash
# Check the build logs to identify the specific error
oc logs build/rag-service-<build-number> -n ai-assistant

# Restart the build process after fixes
oc start-build rag-service -n ai-assistant
```

#### ImagePullBackOff Errors

If pods are stuck in ImagePullBackOff state:

```bash
# Ensure the build completed successfully
oc get builds -n ai-assistant

# Restart the deployment to pick up the latest image
oc rollout restart deployment/rag-service -n ai-assistant
```

## Cleanup

To remove the application and all associated resources:

```bash
oc delete project ai-assistant
```
