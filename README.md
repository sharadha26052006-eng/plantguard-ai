# PlantGuard AI

**AI-Powered Predictive Maintenance & Autonomous Industrial Response**

PlantGuard AI is a research/hackathon prototype that demonstrates how machine-health signals can become an explainable, automated, and verifiable operational response.

> PlantGuard does not stop when it predicts a machine problem. It converts predictive intelligence into an explainable, automated and verifiable operational response.

## Problem

Industrial maintenance teams often have to connect machine-risk signals, degradation context, operational impact, human approvals, maintenance actions, notifications, verification, and escalation across fragmented systems. A prediction alone does not close that loop.

## Solution

PlantGuard presents a professional operations control center for the chain:

**Predict → Understand → Reason → Decide → Automate → Verify → Escalate**

The demo lets a judge open a high-risk machine, inspect the evidence, review the distinction between predictive-model output and AI reasoning, trigger a controlled n8n-style workflow, create a maintenance task, wait for acknowledgement, then resolve or escalate the incident.

## Key innovation

The prototype makes the operational handoff visible. Predictive output is separated from AI reasoning; the human approval gate is explicit; n8n-style automation is observable node by node; and acknowledgement, verification, and escalation are represented as first-class states.

## Data source and data honesty

### REAL / PUBLIC DATA

The machine records and traces in this prototype are **demo data derived from public predictive-maintenance dataset structure**. The interface is designed so a real public dataset and model can be connected later.

### DEMO / SIMULATED WORKFLOW EVENTS

The high-risk event, n8n execution trace, maintenance task, notification, acknowledgement, verification, and escalation are deterministic frontend simulation states for a controlled hackathon demonstration. They are not live factory telemetry, a real factory deployment, a live n8n account, or a production work-order system.

This project does not claim NASA or company partnerships, live industrial deployment, or fabricated model accuracy.

## Architecture

```text
PUBLIC DATA
    ↓
DATA PROCESSING
    ↓
ML / RISK MODEL
    ↓
AI REASONING
    ↓
IMPACT ANALYSIS
    ↓
DECISION ENGINE
    ↓
n8n WORKFLOW BOUNDARY
    ├── Maintenance task
    ├── Notification
    └── Escalation
    ↓
VERIFICATION
    ↓
RESOLVE / ESCALATE
```

The current application is a React/TypeScript browser prototype with SVG/CSS visualizations and deterministic local state. Python, Pandas, Scikit-learn/PyTorch, FastAPI, PostgreSQL/Supabase, n8n, and an LLM API are shown as integration-ready boundaries, not claimed as connected services in this build.

## ML layer

The interface represents machine health, risk level, degradation trend, sensor traces, and threshold evidence. A real predictive model can later populate these values. The current project intentionally does **not** invent accuracy, RMSE, MAE, R², precision, or recall.

## AI reasoning layer

For M-204, the reasoning panel interprets the predictive signal:

- Machine health has deteriorated across the current trace.
- Recent trend indicates increasing operational risk.
- The intervention threshold has been reached.

The proposed action is **Schedule Maintenance Inspection**. Operational impact and human approval are shown beside the recommendation.

## n8n automation

The Workflow Monitor visualizes:

`DATA EVENT → VALIDATE → GET MACHINE CONTEXT → HEALTH / RISK ANALYSIS → AI REASONING → IMPACT ANALYSIS → DECISION → CREATE MAINTENANCE TASK → NOTIFY → WAIT FOR ACKNOWLEDGEMENT → VERIFY → RESOLVE / ESCALATE`

Each node includes status, timestamp, execution state, and a short description. In this prototype the workflow is simulated locally; a real n8n webhook/execution can be connected later.

## Database

No managed database is enabled for this prototype. Demo state is local and deterministic. A future connected version can persist machines, signals, incidents, tasks, acknowledgements, workflow executions, and verification events.

## Demo workflow

1. Open the Operations Dashboard.
2. Press **SIMULATE HIGH-RISK EVENT**.
3. Follow M-204 from health score 31 and HIGH / DEGRADING risk through the AI Decision Center and Workflow Monitor.
4. Press **SIMULATE ACKNOWLEDGEMENT** to run verification and resolve the incident.
5. Reset and replay, then press **SIMULATE NO RESPONSE** to show escalation.
6. Review Maintenance Actions and Incident Reports to see the final state and timeline.

## Limitations

- No live telemetry or industrial control is connected.
- No external n8n instance is connected.
- Dataset upload is an interface affordance only; analytical values remain empty until a real dataset is connected.
- No ML model is trained in this repository.
- The output is not a certified industrial maintenance decision.

> Prototype decision-support output — not a certified industrial maintenance decision.

## Future scope

- Connect a public predictive-maintenance dataset through an ingestion service.
- Add a Python/Pandas feature pipeline and a trained risk or remaining-useful-life model.
- Add FastAPI endpoints for model inference and explanation records.
- Connect n8n webhooks and execution history.
- Persist incidents, task ownership, acknowledgements, verification, and escalation in PostgreSQL/Supabase.
- Add a real LLM reasoning layer with structured, auditable decision proposals.

## References

- NASA Ames Prognostics Center of Excellence, public predictive-maintenance dataset structures.
- Publicly available turbofan, bearing, motor, and industrial equipment predictive-maintenance datasets.
- n8n documentation: https://docs.n8n.io/
- React documentation: https://react.dev/
- Vite documentation: https://vite.dev/

## Local development

```bash
npm install
npm run dev
```

The app listens on port 3000 
