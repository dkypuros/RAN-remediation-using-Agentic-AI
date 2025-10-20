# Preliminary Work Completed - 2025-10-17

## Summary
Completed preliminary work to prepare the AI Assistant application for deployment to OpenShift cluster lp5sl. All critical blockers have been addressed.

---

## ✅ Tasks Completed

### 1. Updated ConfigMap with Correct Cluster URL
**File**: `openshift/configmap.yaml`

**Changed**:
```yaml
# Before
VLLM_API_URL: "https://vllm-composer-ai-apps.apps.cluster-sptk8.sptk8.sandbox305.opentlc.com/v1/completions"

# After
VLLM_API_URL: "https://vllm-composer-ai-apps.apps.cluster-lp5sl.lp5sl.sandbox803.opentlc.com/v1/completions"
```

**Impact**: Application will now connect to the correct vLLM endpoint on the current cluster.

---

### 2. Fixed Main App BuildConfig to Use Binary Source
**File**: `openshift/buildconfig.yaml`

**Changed**:
```yaml
# Before
source:
  type: Git
  git:
    uri: https://gitlab.consulting.redhat.com/coe-telco-ai-demos/repeatable-demo/ai-assistant-based-application.git
  sourceSecret:
    name: gitlab-pat

# After
source:
  type: Binary
```

**Also Removed**:
- GitHub webhook trigger
- Generic webhook trigger
- (Kept ConfigChange and ImageChange triggers)

**Impact**:
- Build will no longer require GitLab access
- Can build from local source code using: `oc start-build ai-assistant-app-build --from-dir=. --follow`

---

### 3. Fixed RAG BuildConfig to Use Binary Source
**File**: `openshift/rag-buildconfig.yaml`

**Changed**:
```yaml
# Before
source:
  git:
    uri: https://gitlab.consulting.redhat.com/coe-telco-ai-demos/repeatable-demo/ai-assistant-based-application.git
    ref: main
  sourceSecret:
    name: gitlab-pat
  contextDir: .

# After
source:
  type: Binary
```

**Impact**:
- RAG service build will no longer require GitLab access
- Can build from local source code using: `oc start-build rag-service --from-dir=. --follow`

---

### 4. Investigated Application Secret Requirements

**Environment Variables Found**:

#### Required:
1. **VLLM_API_URL** ✅ Already configured
   - Used by: `vllm-client.ts`, `ipex.service.ts`
   - Value: Set in deployment.yaml via Kustomize patches
   - Also in: configmap.yaml (now updated)

2. **RAG_SERVICE_URL** ✅ Already configured
   - Used by: `ipex.module.ts`
   - Default: `localhost:50052`
   - Value: Set in deployment.yaml as `rag-service:50052`

#### Optional:
3. **IPEX_SERVICE_URL** ⚠️ Optional
   - Used by: `ipex.module.ts`
   - Default: `localhost:50051`
   - Not currently configured (may not be needed)

4. **NEON_DATABASE_URL** ⚠️ May be needed
   - Used by: `drizzle.config.ts`
   - Purpose: PostgreSQL database connection
   - **Status**: NOT YET CONFIGURED
   - **Action Required**: Determine if database is needed for deployment

5. **VLLM_API_KEY** ⚠️ Optional
   - Mentioned in: README.md
   - Purpose: API authentication (if vLLM requires it)
   - **Status**: vLLM on this cluster appears to not require auth (HTTP 200 test succeeded)

---

## 🎯 Current Status

### Ready to Deploy:
- ✅ ConfigMap updated with correct cluster URL
- ✅ BuildConfigs converted to Binary source
- ✅ Image pull secrets handled by Kustomize
- ✅ vLLM endpoint verified working
- ✅ Storage classes available
- ✅ Namespace created (`ai-assistant`)

### Potential Issues:
- ⚠️ Database URL not configured (NEON_DATABASE_URL)
  - May cause runtime errors if database features are used
  - Need to determine if database is required or if app can run without it

### Next Steps for Deployment:
1. **Optional**: Set up database (if needed)
   - Deploy PostgreSQL to OpenShift, OR
   - Use external Neon database, OR
   - Check if app can run without database

2. **Build Images**:
   ```bash
   # From the application root directory
   cd /Users/davidkypuros/Documents/GitHub_Projects/RAN-remediation-using-Agentic-AI/ai-assistant-based-application-main

   # Build main app
   oc start-build ai-assistant-app-build --from-dir=. --follow

   # Build RAG service
   oc start-build rag-service --from-dir=. --follow
   ```

3. **Deploy Resources**:
   ```bash
   cd openshift/
   kubectl apply -k .
   ```

4. **Monitor Deployment**:
   ```bash
   oc get pods -n ai-assistant -w
   oc logs deployment/ai-assistant-app -n ai-assistant
   oc logs deployment/rag-service -n ai-assistant
   ```

---

## 📊 Files Modified

| File | Changes Made | Purpose |
|------|-------------|---------|
| `openshift/configmap.yaml` | Updated VLLM_API_URL cluster domain | Fix API endpoint |
| `openshift/buildconfig.yaml` | Changed to Binary source, removed Git config | Enable local builds |
| `openshift/rag-buildconfig.yaml` | Changed to Binary source, removed Git config | Enable local builds |

**Note**: Kustomize patches already handle:
- deployment.yaml VLLM_API_URL update
- deployment.yaml imagePullSecrets update
- buildconfig.yaml pushSecret update
- rag-deployment.yaml imagePullSecrets update

---

## 🔍 Application Architecture Insights

Based on code analysis:

**Frontend**:
- Next.js 15 with React 19
- Runs on port 3001

**Backend**:
- NestJS 11 (Node.js 20)
- Concurrent process with frontend
- Handles API calls to vLLM

**RAG Service**:
- Python 3.10 Flask app
- gRPC service on port 50052
- Uses sentence-transformers for embeddings
- Requires persistent storage for model cache

**Database** (optional?):
- Drizzle ORM with PostgreSQL
- Connected via NEON_DATABASE_URL
- Used for ticket storage (likely)

---

## ⚠️ Open Questions

1. **Is the database required for basic functionality?**
   - Can the app run in a demo mode without persistent storage?
   - Or is NEON_DATABASE_URL mandatory?

2. **Firebase authentication**
   - Package.json includes firebase and firebase-admin
   - No environment variables found for Firebase config
   - May be optional or configured differently

3. **IPEX Service**
   - Environment variable exists but default to localhost
   - May not be used in this deployment

---

## 🚀 Confidence Level

**High** - Ready to proceed with deployment

The critical blockers (GitLab access, wrong cluster URLs) have been resolved. The remaining question about database configuration can be determined during deployment testing.

If the database is required, it can be added as a follow-up step.

---

## 📝 Recommendations

1. **Try deployment without database first**
   - See if app starts successfully
   - Check logs for database connection errors
   - Add database only if needed

2. **Monitor first build carefully**
   - RAG service build will be large (PyTorch + models)
   - May take 10-15 minutes
   - Watch for resource issues

3. **Test incrementally**
   - Deploy infrastructure first
   - Build images one at a time
   - Verify each component before moving to next

---

**Completed by**: Claude
**Date**: 2025-10-17
**Session**: Preliminary work phase
