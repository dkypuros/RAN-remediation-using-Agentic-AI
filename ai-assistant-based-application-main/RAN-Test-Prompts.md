# RAN Agentic Workflow - Comprehensive Test Questions

This document contains test questions designed to validate that the RAG system correctly retrieves data from all available sources.

## Data Sources Available

1. **Live Simulator Data** (ran-simulator via ran-services)
   - Real-time site status
   - Cell states (ACTIVE/DOWN)
   - UE connection counts
   - RF metrics (SINR, RSRP, RSRQ, load)

2. **Alarms Database** (ran-services/data/alarms.json)
   - Active alarms by severity
   - Alarm descriptions and timestamps
   - Impact assessments

3. **KPI Reports** (ran-services/data/kpis.json)
   - Site-level KPIs
   - Accessibility metrics
   - Retainability metrics
   - Mobility metrics

4. **Cell Details** (ran-services/data/cell_details.json)
   - Detailed RF measurements per cell
   - Cell-specific metrics

5. **Remediation Playbooks** (ran-services/data/remediation_playbooks.json)
   - 4 comprehensive playbooks (RMD-001 through RMD-004)
   - Diagnostic steps
   - Remediation procedures
   - Expected outcomes

---

## Test Question Categories

### Category 1: Site Status & Overview Questions
**Data Source:** Live Simulator + Alarms

1. **"What's wrong with SITE-002?"**
   - Expected: Full analysis with alarms, KPIs, live cell states, and remediation recommendation
   - Tests: Combined data retrieval, alarm correlation, playbook matching

2. **"Show me the status of all sites"**
   - Expected: List of all 4 sites with their operational status
   - Tests: Live simulator data retrieval

3. **"Which sites are operational?"**
   - Expected: SITE-001, SITE-003 (SITE-002 is DEGRADED, SITE-004 is WARNING)
   - Tests: Status filtering logic

4. **"What sites have issues?"**
   - Expected: SITE-002 (DEGRADED), SITE-004 (WARNING)
   - Tests: Problem detection

---

### Category 2: Alarm-Specific Questions
**Data Source:** Alarms Database

5. **"Show me all critical alarms"**
   - Expected: 1 critical alarm - ALM-983451 (Transport Link Failure at SITE-002)
   - Tests: Severity-based filtering

6. **"What alarms are active at SITE-002?"**
   - Expected: 2 alarms (ALM-983451 CRITICAL, ALM-983452 MAJOR)
   - Tests: Site-specific alarm retrieval

7. **"Are there any temperature warnings?"**
   - Expected: Yes - ALM-983453 at SITE-004
   - Tests: Alarm type filtering

8. **"When did the S1 link failure start?"**
   - Expected: 2025-10-17T15:55:10Z
   - Tests: Timestamp retrieval from alarms

---

### Category 3: Cell-Level Questions
**Data Source:** Live Simulator + Cell Details

9. **"Which cells are down?"**
   - Expected: CELL-2B is DOWN
   - Tests: Cell state filtering from live data

10. **"How many users are connected to SITE-002?"**
    - Expected: ~140-180 users (varies due to simulator)
    - Tests: Live UE count aggregation

11. **"What is the SINR on CELL-2B?"**
    - Expected: -2.1 dB (severely degraded)
    - Tests: Cell-specific RF metric retrieval

12. **"What is the load on CELL-2A?"**
    - Expected: 85-95% (high due to CELL-2B failure)
    - Tests: Live cell load metric

---

### Category 4: KPI Questions
**Data Source:** KPI Reports

13. **"What is the call drop rate at SITE-002?"**
    - Expected: 45.7% (threshold: 2%)
    - Tests: KPI metric retrieval

14. **"Show me the E-RAB setup success rate for SITE-002"**
    - Expected: 88.4% (threshold: 98%)
    - Tests: Accessibility KPI retrieval

15. **"What KPIs are degraded at SITE-002?"**
    - Expected: Call drop rate, E-RAB setup success, handover success
    - Tests: KPI threshold comparison

16. **"Is SITE-001 meeting its KPI targets?"**
    - Expected: Yes (status: HEALTHY)
    - Tests: KPI status check for healthy site

---

### Category 5: Remediation & Action Questions
**Data Source:** Remediation Playbooks

17. **"What are the recommended actions?"** (after asking about SITE-002)
    - Expected: Full RMD-001 playbook with diagnostic + remediation steps
    - Tests: Implicit context detection, remediation-focused response

18. **"What should I do about the S1 link failure?"**
    - Expected: RMD-001 playbook steps
    - Tests: Alarm type to playbook matching

19. **"Show me the remediation playbook for SITE-002"**
    - Expected: RMD-001 (S1 Link Failure Remediation)
    - Tests: Site to playbook mapping

20. **"How long will it take to fix?"**
    - Expected: 15-60 minutes (from RMD-001)
    - Tests: Resolution time retrieval

21. **"What are the diagnostic steps for the transport link issue?"**
    - Expected: 6 diagnostic steps from RMD-001
    - Tests: Diagnostic procedure retrieval

22. **"What causes high VSWR?"**
    - Expected: Root causes from RMD-002 playbook
    - Tests: Playbook category search

---

### Category 6: Cross-Source Correlation Questions
**Data Source:** Multiple sources combined

23. **"Why is CELL-2B offline?"**
    - Expected: Correlation of alarm (S1 link failure) with cell state (DOWN)
    - Tests: Alarm-to-cell correlation

24. **"What is the impact of the transport link failure?"**
    - Expected: CELL-2B down, 0 users, degraded KPIs, overloaded neighbor cells
    - Tests: Impact analysis across alarms, cells, KPIs

25. **"Are the remaining cells at SITE-002 handling the extra load?"**
    - Expected: Yes but stressed - CELL-2A and 2C at 85-95% load
    - Tests: Load redistribution analysis

26. **"What evidence confirms SITE-002 has a critical issue?"**
    - Expected: Critical alarm + DOWN cell + degraded KPIs + poor SINR
    - Tests: Multi-source evidence gathering

---

### Category 7: Comparison & Analytics Questions
**Data Source:** Multiple sites comparison

27. **"Compare SITE-001 and SITE-002"**
    - Expected: SITE-001 healthy vs SITE-002 degraded comparison
    - Tests: Multi-site analysis

28. **"Which site has the most users?"**
    - Expected: Likely SITE-001 or SITE-002 (varies with simulator)
    - Tests: Live UE count aggregation and comparison

29. **"What is the average SINR across all sites?"**
    - Expected: Calculation across all cells
    - Tests: RF metric aggregation

---

### Category 8: Specific Playbook Questions
**Data Source:** Remediation Playbooks

30. **"How do I fix high VSWR?"**
    - Expected: RMD-002 steps
    - Tests: Problem-to-playbook matching

31. **"What are the symptoms of poor RF performance?"**
    - Expected: Symptoms from RMD-003 (low SINR, high drop rate, etc.)
    - Tests: Symptom retrieval

32. **"What references should I consult for S1 link issues?"**
    - Expected: 3GPP TS 36.410, Vendor Transport Configuration Guide
    - Tests: Reference material retrieval

---

## How to Test

### Option 1: Manual Testing via UI
1. Navigate to **Agentic Workflows** page
2. Ask each question in the chat interface
3. Verify the response contains the expected data
4. Check the **Retrieval** tab to see the raw retrieved data

### Option 2: API Testing via curl
```bash
# Test Site-002 analysis
curl -X POST http://localhost:3001/api/ran-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "What'\''s wrong with SITE-002?"}'

# Test remediation query
curl -X POST http://localhost:3001/api/ran-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the recommended actions?"}'

# Test critical alarms
curl -X POST http://localhost:3001/api/ran-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me all critical alarms"}'
```

---

## Expected RAG Behavior

### For Each Question, Verify:

1. **Retrieval Phase**
   - Correct data sources are accessed
   - All relevant documents/data are retrieved
   - Check the `retrieved_data` field in the response

2. **Agent Steps**
   - Proper reasoning steps shown
   - Correct ACTION types (get_alarms, get_kpis, search_remediation, etc.)
   - Observations match retrieved data

3. **Answer Quality**
   - Contains data from the correct source files
   - Accurate numbers (KPIs, counts, metrics)
   - Appropriate remediation recommendations when applicable

4. **Context Awareness**
   - Follow-up questions understand prior context
   - "What are the recommended actions?" after "What's wrong with SITE-002?" should work

---

## Success Criteria

✅ **All 32 questions** should return relevant, accurate answers
✅ **No generic fallback responses** for specific data queries
✅ **Remediation queries** should return full playbook details
✅ **Live data queries** should show current simulator values
✅ **Cross-source queries** should correlate data correctly

---

## Known Limitations

- Generic questions without specific intent may get fallback responses
- Questions about sites other than SITE-002 may have limited analysis (focus site is SITE-002)
- Real-time UE counts and load percentages vary due to simulator dynamics
- Context is not persisted across sessions (stateless API)

---

## Version
- **Created:** October 18, 2025
- **Build:** #22
- **Data Sources:** ran-simulator (v3), ran-services (fixtures v1.2)
