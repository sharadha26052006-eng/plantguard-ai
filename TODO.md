# PlantGuard AI — Implementation TODO

## Command center and demo flow

- Build a professional industrial operations control center at `/` with the PlantGuard AI wordmark, subtitle, demo/environment disclosure, and a high-density command-center layout.
- Show KPI cards with the requested demonstration values: 48 total machines, 32 healthy, 9 at risk, 7 critical, 4 active incidents, 8 open maintenance actions, 21 automated actions, and 13 resolved today; label them as demonstration data.
- Implement a shared deterministic demo state machine with idle, event detected, workflow running, awaiting acknowledgement, acknowledged, resolved, and escalated states.
- Make SIMULATE HIGH-RISK EVENT select demonstration machine M-204, show machine health/degradation/risk context, open an incident, show AI reasoning, run the workflow, create a maintenance task, show notification, and enter WAITING FOR ACKNOWLEDGEMENT.
- Make SIMULATE ACKNOWLEDGEMENT mark the task acknowledged, continue the workflow, run verification, and mark the incident resolved.
- Make SIMULATE NO RESPONSE timeout acknowledgement, mark the workflow and incident escalated, and show the escalation notification.
- Provide a deterministic reset/replay control and clearly label the flow as a controlled hackathon demonstration.

## Fleet and analytics

- Build Machine Fleet with Machine ID, Machine Type, Health Score, Risk Level, Degradation Trend, Current Status, Recommended Action, and Workflow Status columns.
- Include the requested demonstration records for M-204 CNC Machine, M-117 Industrial Motor, and M-302 Production Unit without presenting them as real factory machines.
- Build machine detail and health analytics views showing ID, type, health, risk, status, current cycle/operating time, latest analysis, recommended action, machine/time/sensor selectors, sensor trend, degradation trend, health score over time, risk trajectory, and remaining useful life placeholder.

## Decision and workflow

- Build AI Decision Center with separate PREDICTIVE MODEL OUTPUT and AI REASONING areas for M-204, including risk HIGH, health 31/100, trend DEGRADING, recommendation, reasons, operational impact, human approval REQUIRED, and workflow READY TO EXECUTE.
- Build n8n-centered Workflow Monitor with DATA EVENT → VALIDATE → GET MACHINE CONTEXT → HEALTH/RISK ANALYSIS → AI REASONING → IMPACT ANALYSIS → DECISION → CREATE MAINTENANCE TASK → NOTIFY → WAIT FOR ACKNOWLEDGEMENT → VERIFY → RESOLVE/ESCALATE.
- Show node status, timestamp, execution state, and short description, using COMPLETED, RUNNING, WAITING, FAILED, and ESCALATED states.

## Actions, incidents, data, architecture

- Build Maintenance Actions with TASK-1048 for M-204, HIGH risk and priority, Maintenance Inspection, Maintenance Engineer, created time, acknowledgement state, and ACKNOWLEDGE/ESCALATE/RESOLVE actions.
- Build Incident Reports with the requested incident details, AI assessment, executed actions, acknowledgement, verification, final status, timeline, and the non-certified decision-support disclaimer.
- Build Data Explorer affordances for CSV upload, dataset/machine/cycle/sensor selection, raw records, statistics, and trend; when no dataset is connected show “Connect public dataset to populate live analytical values.” and do not fabricate dataset statistics.
- Build model analytics with model type, input features, prediction target, training status, evaluation status, and “MODEL STATUS: Prototype / Awaiting Training”; do not invent metrics.
- Build System Architecture diagram with public data, processing, ML/risk, reasoning, impact, decision, n8n, maintenance/notification/escalation, verification, and resolve/escalate stages.
- Distinguish implemented frontend capabilities from integration-ready Python/Pandas/Scikit-learn/PyTorch/FastAPI/PostgreSQL/Supabase/n8n/LLM components.

## Quality and delivery

- Use a professional industrial engineering visual system with technical typography, responsive layout, controlled motion, clear status indicators, and no generic chatbot/marketing decoration.
- Add and keep synchronized a valid `public/manus-routes.json` route manifest for all ten page routes.
- Add a professional README that distinguishes REAL/PUBLIC DATA from DEMO/SIMULATED WORKFLOW EVENTS and covers architecture, ML layer, AI reasoning, n8n automation, database status, demo workflow, limitations, future scope, and references.
- Configure project logo metadata with a local PlantGuard mark if the project config supports it.
- Run TypeScript diagnostics and the production build, verify the Preview and route manifest, correct confirmed issues, and checkpoint the completed project to managed canonical `main`.
