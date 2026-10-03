# PlantGuard AI

**AI-Powered Predictive Maintenance & Autonomous Industrial Response**

[![Status](https://img.shields.io/badge/status-research%20prototype-b8f34a?style=flat-square&labelColor=111820)](https://github.com/sharadha26052006-eng/plantguard-ai)
[![Runtime](https://img.shields.io/badge/runtime-React%20%2B%20TypeScript-8fd3ff?style=flat-square&labelColor=111820)](https://react.dev/)
[![Automation](https://img.shields.io/badge/automation-n8n%20style%20simulation-f0b35b?style=flat-square&labelColor=111820)](https://n8n.io/)

PlantGuard AI is a serious research/hackathon prototype for demonstrating how predictive machine-health analysis can become an explainable, automated, and verifiable operational response.

> **PlantGuard does not stop when it predicts a machine problem. It converts predictive intelligence into an explainable, automated and verifiable operational response.**

## Table of contents

- [At a glance](#at-a-glance)
- [Problem](#problem)
- [Solution](#solution)
- [Key innovation](#key-innovation)
- [Demo workflow](#demo-workflow)
- [Product surface](#product-surface)
- [Architecture](#architecture)
- [Data honesty and scope](#data-honesty-and-scope)
- [ML and AI reasoning layers](#ml-and-ai-reasoning-layers)
- [n8n automation boundary](#n8n-automation-boundary)
- [Repository structure](#repository-structure)
- [Local development](#local-development)
- [Validation](#validation)
- [Deployment configuration](#deployment-configuration)
- [Limitations](#limitations)
- [Future scope](#future-scope)
- [Contributing](#contributing)
- [References](#references)

## At a glance

| Area | Current prototype behavior |
| --- | --- |
| Primary experience | Industrial operations control center |
| Core story | Predict → Understand → Reason → Decide → Automate → Verify → Escalate |
| Demo machine | M-204 CNC Machine |
| Demo risk | Health 31/100, HIGH risk, DEGRADING trend |
| Workflow | Local deterministic n8n-style execution trace |
| Data | Demo data derived from public predictive-maintenance dataset structure |
| Backend | None connected; browser-only prototype |
| Database | None connected; local deterministic state |
| Model metrics | Intentionally not shown until actually calculated |
| Output status | Prototype decision-support output, not a certified industrial maintenance decision |

## Problem

Industrial organizations monitor machines with sensor and operational data. When a machine begins degrading, teams must identify the risk, understand the trend, determine the operational impact, prioritize the response, assign an action, notify the responsible person, verify completion, and escalate when nobody responds.

Those steps are often spread across disconnected tools. A predictive model can identify risk, but a risk score alone does not create accountability or close the operational loop.

## Solution

PlantGuard presents one engineering-oriented control surface for the complete response chain:

```text
Machine data
    → Health analysis
    → Risk detection
    → AI reasoning
    → Impact analysis
    → Decision
    → n8n-style automation
    → Verification
    → Escalation or resolution
```

The interface deliberately separates four layers that are often conflated:

1. **Predictive model output** — health, risk, trend, and threshold evidence.
2. **AI reasoning** — an interpretable recommendation and its rationale.
3. **Decision and human gate** — the action that is ready to execute and whether approval is required.
4. **Automation and verification** — task creation, notification, acknowledgement, verification, resolution, or escalation.

## Key innovation

The prototype makes the operational handoff visible. Predictive output is separated from AI reasoning; human approval is explicit; the n8n-style workflow is observable node by node; and acknowledgement, verification, and escalation are first-class states rather than hidden implementation details.

## Demo workflow

The intended judge-facing path takes approximately 2–3 minutes:

1. Open the Operations Dashboard.
2. Press **SIMULATE HIGH-RISK EVENT**.
3. Follow M-204 from health score 31 and HIGH / DEGRADING risk through the decision and workflow views.
4. Observe the maintenance task and notification enter **WAITING FOR ACKNOWLEDGEMENT**.
5. Press **SIMULATE ACKNOWLEDGEMENT** to run verification and mark the incident **RESOLVED**.
6. Reset and replay the event.
7. Press **SIMULATE NO RESPONSE** to show timeout, escalation notification, and **ESCALATED** incident state.
8. Review Maintenance Actions and Incident Reports for the final state and audit trail.

See the detailed [demo runbook](docs/demo-runbook.md).

## Product surface

The app includes ten page routes:

| Route | Purpose |
| --- | --- |
| `/` | Operations Dashboard and primary command center |
| `/fleet` | Machine Fleet table and machine selection |
| `/health` | Machine Health Analytics and trend views |
| `/risk` | Risk Analysis, threshold evidence, and operational impact |
| `/decision` | AI Decision Center with model/reasoning separation |
| `/workflow` | n8n-style Workflow Monitor and execution log |
| `/actions` | Maintenance Action Center and task status |
| `/incidents` | Incident Reports and timeline |
| `/data` | Data Explorer and model-readiness state |
| `/architecture` | System Architecture and integration boundary |

The complete route manifest is available at [`public/manus-routes.json`](public/manus-routes.json).

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

### Current implementation boundary

The current application is a React/TypeScript browser prototype with SVG/CSS visualizations and deterministic local state. The following are shown as integration-ready boundaries, not as connected services:

- Python / Pandas feature engineering
- Scikit-learn or PyTorch predictive model
- FastAPI inference service
- PostgreSQL or Supabase persistence
- n8n webhooks and execution history
- LLM API reasoning service

See [architecture.md](docs/architecture.md) for the boundary contract and a proposed production integration shape.

## Data honesty and scope

### REAL / PUBLIC DATA

The interface uses **demo data derived from public predictive-maintenance dataset structure**. The design is intended to accept a real public dataset and trained model later.

### DEMO / SIMULATED WORKFLOW EVENTS

The high-risk event, n8n execution trace, maintenance task, notification, acknowledgement, verification, and escalation are deterministic frontend simulation states for a **controlled hackathon demonstration**. They are not live factory telemetry, a real factory deployment, a live n8n account, or a production work-order system.

This project does not claim NASA or company partnerships, live industrial deployment, or fabricated model accuracy. Dataset statistics remain unavailable until a real dataset is connected.

## ML and AI reasoning layers

### Predictive model output

The predictive layer is represented by:

- Machine health score
- Risk level
- Degradation trend
- Sensor traces
- Threshold and trajectory evidence
- Remaining-useful-life placeholder state

The current repository does not train a model and does not claim accuracy, RMSE, MAE, R², precision, recall, or any other uncalculated metric.

### AI reasoning

For M-204, the reasoning layer interprets the predictive signal:

- Machine health has deteriorated across the current trace.
- Recent trend indicates increasing operational risk.
- The intervention threshold has been reached.

The proposed action is **Schedule Maintenance Inspection**. Operational impact and human approval are shown beside the recommendation.

## n8n automation boundary

The Workflow Monitor visualizes this ordered execution trace:

```text
DATA EVENT
  → VALIDATE
  → GET MACHINE CONTEXT
  → HEALTH / RISK ANALYSIS
  → AI REASONING
  → IMPACT ANALYSIS
  → DECISION
  → CREATE MAINTENANCE TASK
  → NOTIFY
  → WAIT FOR ACKNOWLEDGEMENT
  → VERIFY
  → RESOLVE / ESCALATE
```

Each node includes a status, timestamp, execution state, and short description. The current implementation simulates this locally. A future n8n integration should preserve the same event contract and state transitions; see [workflow-contract.md](docs/workflow-contract.md).

## Repository structure

```text
plantguard-ai/
├── public/
│   ├── favicon.svg
│   └── manus-routes.json
├── src/
│   ├── components/              # Reusable control-center UI
│   ├── data/                    # Demo machines, workflow, and report events
│   ├── pages/                   # Ten route-level experiences
│   ├── state/                   # Shared deterministic demo state machine
│   ├── styles/                  # Industrial control-room visual system
│   ├── App.tsx                  # Route registry and shell composition
│   └── main.tsx                 # React entry point
├── docs/                        # Project, architecture, data, and demo docs
├── app.config.ts                # Webdev project logo metadata
├── package.json                 # Scripts and dependency manifest
├── vite.config.ts               # Vite runtime configuration
├── TODO.md                      # Product acceptance criteria
└── README.md                    # This document
```

## Local development

### Prerequisites

- Node.js 20+ recommended
- npm 10+ recommended
- A modern browser

### Install and run

```bash
npm install
npm run dev
```

The development server listens on port `3000` and binds to `0.0.0.0` in the managed Webdev runtime.

### Production build

```bash
npm run build
```

The build runs TypeScript project checks and Vite production compilation. The static output is written to `dist/`.

### Preview the production build

```bash
npm run build
npm run preview
```

### Route manifest

The route manifest is served at `/manus-routes.json`. If a page route is added or removed, update the manifest in the same change.

## Validation

The current validation baseline includes:

```bash
npx tsc -b
npm run build
```

The controlled browser demo has been verified for:

- High-risk event → acknowledgement → verification → resolution
- High-risk event → no response → escalation
- Desktop command-center layout
- Mobile dashboard and workflow layout
- Route manifest response

## Deployment configuration

The managed Webdev project uses a static build contract:

```json
{
  "build": {
    "command": "npm install && npm run build",
    "outputDirectory": "dist"
  }
}
```

The project is connected to the private GitHub repository [`sharadha26052006-eng/plantguard-ai`](https://github.com/sharadha26052006-eng/plantguard-ai). Publication remains a separate operation from GitHub synchronization.

## Limitations

- No live telemetry or industrial control is connected.
- No external n8n instance is connected.
- Dataset upload is currently an interface affordance; analytical values remain empty until a real dataset is connected.
- No ML model is trained in this repository.
- Demo state is local and deterministic; it is not persisted across sessions.
- The output is not a certified industrial maintenance decision.
- No autonomous physical actuation is performed.

> **Prototype decision-support output — not a certified industrial maintenance decision.**

## Future scope

1. Connect a public predictive-maintenance dataset through an ingestion service.
2. Add Python/Pandas feature engineering and a trained risk or remaining-useful-life model.
3. Add FastAPI endpoints for inference, model metadata, and explanation records.
4. Connect n8n webhooks and execution history.
5. Persist machines, incidents, task ownership, acknowledgements, verification, and escalation in PostgreSQL/Supabase.
6. Add a structured LLM reasoning layer with auditable decision proposals.
7. Add authentication, role-based approvals, notification providers, and production observability.
8. Add model drift monitoring, threshold calibration, and offline evaluation reports.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a change. Contributions should preserve the prototype’s engineering credibility and data-honesty rules.

## References

- [NASA Ames Prognostics Center of Excellence](https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/)
- [n8n documentation](https://docs.n8n.io/)
- [React documentation](https://react.dev/)
- [Vite documentation](https://vite.dev/)
- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- Publicly available turbofan, bearing, motor, and industrial-equipment predictive-maintenance dataset structures

## License

No license has been declared yet. Treat this repository as a private hackathon project unless the maintainers add an explicit license.
