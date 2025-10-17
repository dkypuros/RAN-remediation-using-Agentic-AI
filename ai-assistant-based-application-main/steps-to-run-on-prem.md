# Steps to Run on On-Prem OpenShift Cluster

This guide provides step-by-step instructions for deploying the AI Ticket Assistant application on an on-premises OpenShift cluster.

## Prerequisites

- OpenShift CLI (`oc`) installed and configured
- Access to an OpenShift cluster with sufficient permissions
- Git client installed

## Clone the Repository

```bash
git clone https://gitlab.consulting.redhat.com/coe-telco-ai-demos/repeatable-demo/ai-assistant-based-application.git
cd ai-assistant-based-application
```

## Deploy AI Ticket Assistant on OpenShift

### 1. Create a New OpenShift Project

Create a dedicated project (namespace) for the AI Ticket Assistant:

```bash
oc new-project ai-ticket-assistant
```

### 2. Set Up Required Operators

Ensure the following operators are installed on your OpenShift cluster:

- Red Hat OpenShift AI (RHOAI) Operator
- OpenShift Serverless Operator (optional, for serverless deployment)
- OpenShift Service Mesh (optional, for advanced networking)

You can install these operators through the OpenShift web console under **Operators** > **OperatorHub**.

### 3. Create GitLab Access Token (if using GitLab)

If you're pulling the code from GitLab, follow these steps to create an access token:

1. Log into GitLab with your credentials
2. Navigate to your profile settings (click your avatar > Settings)
3. Go to Access Tokens in the left sidebar
4. Create a new token with appropriate scopes (`read_user`, `read_repository`)
5. Copy the token and keep it secure

### 4. Create Authentication Secret

Create a secret with your GitLab credentials:

```bash
oc create secret generic gitlab-auth \
    --from-literal=password=<your-gitlab-token> \
    --type=kubernetes.io/basic-auth
```

### 5. Deploy the Application

Apply the OpenShift configuration files in the following order:

```bash
# Apply ConfigMap (if needed)
oc apply -f openshift/configmap.yaml

# Apply Secret
oc apply -f openshift/secret.yaml

# Apply BuildConfig to create the build pipeline
oc apply -f openshift/buildconfig.yaml

# Apply Deployment configuration
oc apply -f openshift/deployment.yaml

# Apply Service configuration
oc apply -f openshift/service.yaml

# Apply Route configuration
oc apply -f openshift/route.yaml
```

### 6. Start the Build Process

Initiate the application build:

```bash
oc start-build ai-assistant-app-build
```

### 7. Monitor the Deployment

Check the status of your build and deployment:

```bash
# Monitor builds
oc get builds
oc logs -f buildconfig/ai-assistant-app-build

# Monitor deployment
oc get pods
oc get deployments
```

### 8. Access the Application

Once the deployment is complete, access the application using the route:

```bash
# Get the route URL
oc get route ai-assistant-app -o jsonpath='{.spec.host}'
```

Open the URL in your browser to access the AI Ticket Assistant application.

## Connecting to Red Hat OpenShift AI

The AI Ticket Assistant requires connection to a vLLM inference server. If you're using Red Hat OpenShift AI:

1. Access the RHOAI dashboard in your OpenShift cluster
2. Navigate to the Model Serving section
3. Deploy a vLLM serving runtime with your preferred LLM model
4. Configure the AI Ticket Assistant to use this endpoint by updating the environment variables in the deployment

## Troubleshooting

If you encounter issues during deployment:

- Check build logs: `oc logs -f buildconfig/ai-assistant-app-build`
- Check pod logs: `oc logs -f deployment/ai-assistant-app`
- Verify all resources are created correctly: `oc get all -l app=ai-assistant-app`
- Ensure the secret is properly mounted: `oc describe pod -l app=ai-assistant-app`

## Cleanup

To remove the application and all associated resources:

```bash
oc delete all -l app=ai-assistant-app
oc delete secret gitlab-auth
```

To delete the entire project:

```bash
oc delete project ai-ticket-assistant
```
