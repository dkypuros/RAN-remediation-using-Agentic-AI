# Pre-Deployment Assessment for AI Assistant Application

**Cluster**: lp5sl (apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com)
**Namespace**: ai-assistant
**Assessment Date**: 2025-10-17

## Executive Summary

✅ **Cluster is ready** for deployment with some required modifications
⚠️ **Critical gaps identified** that must be addressed before deployment
📋 **Preliminary work required** to ensure successful deployment

---

## ✅ What's Working

### 1. Cluster Infrastructure
- ✅ **vLLM Service**: Running and accessible (HTTP 200)
  - URL: `https://vllm-composer-ai-apps.apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com`
  - Pod Status: Running (vllm-predictor-00001-deployment)
  - Location: composer-ai-apps namespace

### 2. Namespace Setup
- ✅ **Namespace Created**: `ai-assistant` project is ready
- ✅ **Service Account**: `builder` exists with default secrets
- ✅ **Image Pull Secret**: `builder-dockercfg-sfkmz` is available
- ✅ **No Conflicting Resources**: Namespace is clean (no existing deployments)

### 3. Storage
- ✅ **Storage Classes Available**:
  - `gp3-csi` (default) - AWS EBS CSI driver
  - `gp2-csi` - AWS EBS CSI driver
- ✅ **PVC Support**: Both support dynamic provisioning with WaitForFirstConsumer binding

### 4. Permissions
- ✅ **Build Permissions**: Admin user can create builds
- ✅ **Service Account Permissions**: builder SA has necessary privileges
- ✅ **Image Registry**: Internal OpenShift registry is accessible

### 5. Application Code
- ✅ **Source Code Available**: All code is locally available
- ✅ **Dockerfiles Present**: Both main app and RAG service Dockerfiles exist
- ✅ **Application Type**: Next.js + NestJS (Node.js 20)
- ✅ **RAG Service**: Python 3.10 with Flask

---

## ⚠️ Critical Gaps Requiring Action

### GAP 1: GitLab Repository Access ⛔ BLOCKER
**Status**: CRITICAL - Will prevent builds from starting

**Issue**:
Both BuildConfigs reference a private GitLab repository that we cannot access:
```yaml
git:
  uri: https://gitlab.consulting.redhat.com/coe-telco-ai-demos/repeatable-demo/ai-assistant-based-application.git
sourceSecret:
  name: gitlab-pat
```

**Files Affected**:
- `buildconfig.yaml` (line 10)
- `rag-buildconfig.yaml` (line 9)

**Impact**:
- Builds will fail immediately with authentication errors
- No images will be created
- Deployment cannot proceed

**Solution Required**:
Option 1: **Use Binary Builds** (RECOMMENDED - code is local)
```bash
# Change source type from Git to Binary
# Then upload local code to build
oc start-build ai-assistant-app-build --from-dir=. --follow
```

Option 2: **Create GitLab PAT Secret**
```bash
# If you have access to the GitLab repo
oc create secret generic gitlab-pat \
  --from-literal=username=YOUR_USERNAME \
  --from-literal=password=YOUR_TOKEN \
  -n ai-assistant
```

Option 3: **Use Local GitHub/Git Repo**
- Fork/clone to accessible repository
- Update git URI in buildconfigs

**Recommendation**: Use Option 1 (Binary Builds) since the code is already local.

---

### GAP 2: Hardcoded Cluster-Specific Values ⚠️ HIGH
**Status**: HIGH - Will cause runtime failures

**Issue**: Multiple files contain hardcoded values from different clusters

#### 2a. ConfigMap - Wrong Cluster URL
**File**: `configmap.yaml` (line 9)
```yaml
VLLM_API_URL: "https://vllm-composer-ai-apps.apps.cluster-sptk8.sptk8.sandbox305.opentlc.com/v1/completions"
```
**Should be**:
```yaml
VLLM_API_URL: "https://vllm-composer-ai-apps.apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com/v1/completions"
```

**Impact**: Application will try to connect to wrong cluster, API calls will fail

#### 2b. Deployment - Wrong Cluster URL
**File**: `deployment.yaml` (line 24)
```yaml
value: "https://vllm-composer-ai-apps.apps.cluster-7hvk4.7hvk4.sandbox2112.opentlc.com/v1/completions"
```

**Note**: This is already fixed by Kustomize patches, but the base file is still wrong.

#### 2c. Image Pull Secret - Wrong Secret Name
**Files**:
- `buildconfig.yaml` (line 22): `builder-dockercfg-qpsp8`
- `deployment.yaml` (line 29): `builder-dockercfg-qpsp8`
- `rag-deployment.yaml` (line 37): `builder-dockercfg-qpsp8`

**Should be**: `builder-dockercfg-sfkmz` (current cluster)

**Note**: This is already fixed by Kustomize patches.

**Solution**:
✅ Already addressed via Kustomize configuration
⚠️ Still need to manually update `configmap.yaml`

---

### GAP 3: Missing Secrets/Configuration 📋 MEDIUM
**Status**: MEDIUM - May cause runtime issues

**Issue**: Application may require additional secrets not yet configured

**Potential Requirements** (need verification):
1. **Database Credentials** (if using external DB)
   - Application uses Drizzle ORM with Neon serverless
   - May need DATABASE_URL environment variable

2. **Firebase Configuration** (if using auth)
   - Application has firebase dependencies
   - May need firebase service account

3. **OpenAI API Keys** (if needed)
   - Application uses openai package
   - May be optional if only using vLLM

**Action Required**:
- Review application environment requirements
- Check if any .env.example or documentation exists
- Test deployment and monitor for missing config errors

---

## 📋 Pre-Deployment Checklist

### Must Do (Before Any Deployment):

- [ ] **Fix BuildConfig Source Strategy**
  - [ ] Update `buildconfig.yaml` to use Binary source OR
  - [ ] Create GitLab PAT secret if using Git source
  - [ ] Update `rag-buildconfig.yaml` similarly

- [ ] **Update ConfigMap**
  - [ ] Edit `configmap.yaml` line 9 with correct vLLM URL
  - [ ] Verify URL: `https://vllm-composer-ai-apps.apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com/v1/completions`

- [ ] **Verify Kustomize Patches**
  - [ ] Run `kubectl kustomize openshift/` to preview
  - [ ] Confirm VLLM_API_URL is correct
  - [ ] Confirm imagePullSecrets show `builder-dockercfg-sfkmz`

### Should Do (For Smooth Deployment):

- [ ] **Review Application Environment Variables**
  - [ ] Check if DATABASE_URL is required
  - [ ] Check if Firebase config is needed
  - [ ] Identify any other required secrets

- [ ] **Test vLLM Connectivity**
  ```bash
  curl -k https://vllm-composer-ai-apps.apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com/v1/models
  ```

- [ ] **Review Resource Limits**
  - RAG service: 2Gi memory, 500m CPU (may need adjustment)
  - Main app: No limits set (should consider adding)

### Nice to Have:

- [ ] **Set up Monitoring**
  - [ ] Configure log aggregation
  - [ ] Set up resource monitoring

- [ ] **Configure Auto-scaling** (if needed)
  - [ ] Add HPA for main application
  - [ ] Consider replica count adjustments

---

## 🔧 Recommended Deployment Approach

### Phase 1: Fix Critical Issues
1. **Update BuildConfigs for Binary Builds**
   ```bash
   # Will create updated buildconfigs that use Binary source
   # This allows us to build from local code
   ```

2. **Update ConfigMap**
   ```bash
   # Manual edit required
   vi openshift/configmap.yaml
   # Change cluster-sptk8 to cluster-lp5sl
   ```

### Phase 2: Deploy Infrastructure
```bash
# Apply services, PVCs, configmaps, secrets first
kubectl apply -k openshift/ --dry-run=client
kubectl apply -k openshift/
```

### Phase 3: Build Images
```bash
# Start builds using local code
oc start-build ai-assistant-app-build --from-dir=/path/to/app --follow
oc start-build rag-service --from-dir=/path/to/app --follow
```

### Phase 4: Monitor Deployment
```bash
# Watch pods come up
oc get pods -n ai-assistant -w

# Check logs for errors
oc logs deployment/ai-assistant-app -n ai-assistant
oc logs deployment/rag-service -n ai-assistant
```

### Phase 5: Verify Application
```bash
# Get the route
oc get route -n ai-assistant

# Test the endpoint
curl -k https://$(oc get route ai-assistant-app-route -n ai-assistant -o jsonpath='{.spec.host}')
```

---

## 🎯 Quick Win Solution

**If you want to deploy quickly**, here's the minimal path:

1. **Update ConfigMap** (1 minute)
   ```bash
   cd openshift
   sed -i '' 's/cluster-sptk8.sptk8.sandbox305/cluster-lp5sl.lp5sl.sandbox803/g' configmap.yaml
   ```

2. **Create Binary BuildConfigs** (2 minutes)
   - Remove `source.git` section
   - Remove `sourceSecret` section
   - Set `source.type: Binary`

3. **Deploy with Kustomize** (30 seconds)
   ```bash
   kubectl apply -k openshift/
   ```

4. **Start Binary Builds** (5-10 minutes)
   ```bash
   cd /path/to/ai-assistant-based-application-main
   oc start-build ai-assistant-app-build --from-dir=. --follow
   oc start-build rag-service --from-dir=. --follow
   ```

Total time to deployment: **~15 minutes**

---

## 📊 Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Build fails due to GitLab access | **HIGH** | **CRITICAL** | Use binary builds |
| Wrong vLLM URL causes API failures | **HIGH** | **HIGH** | Update configmap + verify kustomize |
| Missing app secrets cause runtime errors | **MEDIUM** | **MEDIUM** | Monitor logs, add secrets as needed |
| Resource limits too low | **LOW** | **MEDIUM** | Monitor and adjust |
| Storage performance issues | **LOW** | **LOW** | gp3-csi is production-ready |

---

## 🔍 Additional Reconnaissance Findings

### Application Architecture
- **Frontend**: Next.js 15 (React 19)
- **Backend**: NestJS 11 (Node.js 20)
- **RAG Service**: Python Flask with Intel PyTorch extensions
- **Database**: Drizzle ORM (likely PostgreSQL or SQLite)
- **Vector Search**: Uses sentence-transformers

### Build Requirements
- **Main App**:
  - Node.js 20
  - npm ci with ~65 dependencies
  - Concurrent build of Next.js and NestJS
  - Multi-stage build (optimized)

- **RAG Service**:
  - Python 3.10
  - PyTorch + Intel extensions (HEAVY - 2GB+ download)
  - Transformers library (requires model downloads)
  - Needs persistent cache volume

### Runtime Characteristics
- **Port 3001**: Main application
- **Port 50052**: RAG gRPC service
- **External Route**: Only for main app (ai-assistant-app-route)
- **Internal Communication**: RAG service accessed via `rag-service:50052`

---

## ✅ Conclusion

The cluster is **ready for deployment** after addressing the critical gaps:

1. ✅ Infrastructure is solid
2. ⚠️ BuildConfigs need source strategy change (Git → Binary)
3. ⚠️ ConfigMap needs cluster URL update
4. ✅ Kustomize configuration already handles most cluster-specific values

**Estimated Time to Production-Ready**: 15-30 minutes

**Confidence Level**: **High** - All blockers have known solutions

---

## 📝 Next Steps

1. **Review this assessment** with the team
2. **Decide on build strategy** (Binary vs Git)
3. **Update ConfigMap** with correct cluster URL
4. **Create modified BuildConfigs** for chosen strategy
5. **Execute deployment** following phased approach
6. **Monitor and iterate** based on runtime behavior

**Questions? Check the KUSTOMIZE-README.md for detailed parameter gathering instructions.**
