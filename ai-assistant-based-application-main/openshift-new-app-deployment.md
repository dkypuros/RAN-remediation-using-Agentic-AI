# Build and Deploy Application from Source to OpenShift Internal Registry

Follow these steps to generate a GitLab Access Token for OpenShift integration:

### 1. Log into GitLab
- Log in with your credentials.

### 2. Navigate to Your Profile Settings
- In the top-right corner of the GitLab dashboard, click on your avatar (profile icon).
- Select **Preferences** or **Settings** from the dropdown menu.

### 3. Go to Access Tokens
- On the left sidebar, find and click **Access Tokens** under the **User Settings** section.

### 4. Create a New Token
- **Name:** Give your token a meaningful name (e.g., _"OpenShift Integration"_ or _"CI/CD Token"_).
- **Scopes:** Select the required scopes. For example:
  - `read_user`
  - `read_repository`

### 5. Copy the token and keep it somewhere safe


## Create a Secret using below command:
        oc create secret generic <secret-name> \
            --from-literal=password=<gitlab-token> \
            --type=kubernetes.io/basic-auth 


## Deploy the application using OpenShift configuration files


1. Apply the BuildConfig to create the build pipeline:

```bash
oc apply -f openshift/buildconfig.yaml
```

2. Apply the Deployment configuration:

```bash
oc apply -f openshift/deployment.yaml
```

3. Apply the Service configuration:

```bash
oc apply -f openshift/service.yaml
```

4. Apply the Route configuration:

```bash
oc apply -f openshift/route.yaml
```

5. Start the build process:

```bash
oc start-build ai-assistant-app-build
```


6. Monitor the build and deployment status:

```bash
oc get builds
oc get pods
```
