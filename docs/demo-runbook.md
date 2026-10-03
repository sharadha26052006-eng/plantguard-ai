# PlantGuard AI Demo Runbook

## Objective

Show that PlantGuard converts a machine-health prediction into a reasoned, observable, and verifiable operational response.

## Setup

1. Open the Operations Dashboard.
2. Confirm the screen shows **DEMO DATA ACTIVE** and the research/hackathon disclosure.
3. Use the default selected machine, **M-204 / CNC Machine**.
4. Keep the browser at desktop width for the full command-center layout when presenting.

## Recommended 2–3 minute path

### 1. Establish the operating picture

Point to the KPI strip:

- 48 total machines
- 32 healthy
- 9 at risk
- 7 critical
- 4 active incidents
- 8 open maintenance actions
- 21 automated actions
- 13 resolved today

Call out that these are clearly labeled demonstration values derived from public predictive-maintenance dataset structure.

### 2. Explain the risk signal

Use the M-204 focus card:

- Health score: **31 / 100**
- Risk: **HIGH**
- Trend: **DEGRADING**
- Current status: **AT RISK**
- Recommended action: **Maintenance Inspection**

Open Health Analytics or Risk Analysis if the audience wants the sensor trace, health decline, risk trajectory, or threshold evidence.

### 3. Trigger the autonomous response

Press **SIMULATE HIGH-RISK EVENT**.

The application should show:

- Controlled hackathon demonstration banner
- Open incident state
- Maintenance task `TASK-1048`
- Notification requesting acknowledgement
- Workflow state `WAITING FOR ACKNOWLEDGEMENT`

### 4. Show explainable reasoning

Open AI Decision Center and emphasize the two columns:

- **Predictive Model Output:** health, risk, trend, and threshold evidence.
- **AI Reasoning:** schedule maintenance inspection, with three reasons and operational impact.

Emphasize that the predictive layer provides machine-risk information while the reasoning layer proposes an operational workflow.

### 5. Trace the n8n-style workflow

Open Workflow Monitor and walk down the execution trace:

```text
DATA EVENT → VALIDATE → GET MACHINE CONTEXT → HEALTH / RISK ANALYSIS
→ AI REASONING → IMPACT ANALYSIS → DECISION → CREATE MAINTENANCE TASK
→ NOTIFY → WAIT FOR ACKNOWLEDGEMENT → VERIFY → RESOLVE / ESCALATE
```

The current demo completes the upstream nodes and pauses at the acknowledgement gate.

### 6. Demonstrate resolution

Press **SIMULATE ACKNOWLEDGEMENT**.

Point out:

- Task becomes `RESOLVED`
- Verification completes
- Incident becomes `RESOLVED`
- Timeline includes acknowledgement, verification, and resolution

### 7. Demonstrate escalation

Press **RESET DEMO**, then **SIMULATE HIGH-RISK EVENT** again. Press **SIMULATE NO RESPONSE**.

Point out:

- Acknowledgement timeout
- Escalation notification to the duty manager
- Task becomes `ESCALATED`
- Incident becomes `ESCALATED`

## Suggested narration

> “PlantGuard does not stop at a health score. It makes the evidence legible, separates prediction from reasoning, routes a decision through an explicit human gate, creates an observable workflow, and proves what happened when the operator responds—or does not respond.”

## Data-honesty line

If asked whether the dashboard is connected to a real factory, answer:

> “No. This is a research/hackathon prototype. The machine values are demo data derived from public predictive-maintenance dataset structure, and the workflow events are controlled local simulations. The UI is designed to connect a real dataset, model, and n8n workflow later.”

## Recovery

- If the demo is in a terminal state, use **RESET DEMO**.
- If the browser is on a secondary route, use the left rail to return to Operations Dashboard.
- If the preview is unavailable, start the app with `npm run dev` on port `3000`.

## What not to claim

Do not claim:

- Live telemetry
- Factory deployment
- NASA or company partnership
- Model accuracy or evaluation metrics
- Live n8n execution
- Certified industrial maintenance decisions
