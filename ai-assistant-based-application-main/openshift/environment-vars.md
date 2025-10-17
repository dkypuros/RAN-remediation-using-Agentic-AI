# OpenShift Deployment Configuration Variables

This document outlines the configuration elements that need to be updated when deploying the AI Ticket Assistant application to a new OpenShift cluster.

## Critical Configuration Items

### 1. VLLM API URL (deployment.yaml)

The `VLLM_API_URL` environment variable in `deployment.yaml` needs to be updated to point to the vLLM API endpoint in the new cluster:

```yaml
env:
- name: VLLM_API_URL
  value: "https://vllm-composer-ai-apps.apps.cluster-<CLUSTER_ID>.<CLUSTER_ID>.sandbox<SANDBOX_ID>.opentlc.com/v1/completions"
```

Example:
```yaml
value: "https://vllm-composer-ai-apps.apps.cluster-7hvk4.7hvk4.sandbox2112.opentlc.com/v1/completions"
```

### 2. Build Configuration Push Secret (buildconfig.yaml)

The `pushSecret` in `buildconfig.yaml` needs to be updated to match the automatically generated secret name for the builder service account in the new cluster:

```yaml
pushSecret:
  name: builder-dockercfg-<UNIQUE_ID>
```

You can find the correct secret name by running:
```bash
oc describe serviceaccount builder -n ai-assistant
```

Look for the `Image pull secrets:` value in the output.

### 3. Image Pull Secret (deployment.yaml)

The `imagePullSecrets` in `deployment.yaml` needs to be updated to match the same automatically generated secret name for the builder service account in the new cluster:

```yaml
imagePullSecrets:
- name: builder-dockercfg-<UNIQUE_ID>
```

This should be the same secret name identified in step 2. This is essential for the deployment to be able to pull the image from the internal registry after the build process completes.

Example:
```yaml
imagePullSecrets:
- name: builder-dockercfg-qpsp8
```

## Deployment Process

1. Update the `VLLM_API_URL` in deployment.yaml
2. Check and update the `pushSecret` name in buildconfig.yaml
3. Update the `imagePullSecrets` name in deployment.yaml
4. Apply the updated configuration files
5. Start the build process

These configuration updates are necessary for each new cluster deployment to ensure proper connectivity to the vLLM API and correct image registry authentication.
