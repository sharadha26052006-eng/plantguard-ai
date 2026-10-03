# PlantGuard AI Architecture

## Purpose

This document explains how the current browser prototype is structured, which boundaries are simulated, and how a production-connected version could evolve without changing the core operational story.

## Architectural principle

PlantGuard is designed around a traceable chain rather than a single opaque prediction:

```text
Signal → Analysis → Reasoning → Impact → Decision → Automation → Verification → Outcome
```

Every stage should produce a structured record that can be inspected by an operator and correlated to the resulting incident or maintenance action.

## Current prototype

The current application is a static React/TypeScript frontend running on Vite. It has no managed server and no database. All demonstration values are imported from local TypeScript modules, and the high-risk workflow is driven by a shared React context.

| Layer | Current implementation | Status |
| --- | --- | --- |
| UI shell | React components and CSS | Implemented |
| Routing | Lightweight pathname route registry | Implemented |
| Machine data | `src/data/demoMachines.ts` | Demo-derived |
| Trend visuals | SVG chart component | Implemented / simulated |
| Predictive output | Local machine health/risk fields | Demo-derived |
| AI reasoning | Static explainable recommendation panel | Demo reasoning |
| Workflow | `src/data/workflow.ts` + shared state | Simulated n8n-style trace |
| Task/incident state | React context | Local deterministic state |
| Dataset explorer | Empty-state UI and selectors | Integration-ready |
| Persistence | None | Not connected |
| External automation | None | Not connected |

## Logical flow

```text
┌──────────────────┐
│ Public dataset   │  Real future input; current values are structure-derived demo data
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Data processing   │  Validation, feature extraction, unit/time normalization
└────────┬─────────┘
         ↓
┌──────────────────┐
│ ML / risk model   │  Health, risk tier, trend, RUL, model metadata
└────────┬─────────┘
         ↓
┌──────────────────┐
│ AI reasoning      │  Explain evidence and propose an operational action
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Impact analysis   │  Summarize maintenance/production implications
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Decision engine   │  Approval, policy, priority, owner, due window
└────────┬─────────┘
         ↓
┌──────────────────┐
│ n8n orchestration │  Task, notification, wait, verify, escalation
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Operational state │  Resolved or escalated with an audit trail
└──────────────────┘
```

## Proposed connected architecture

A connected implementation could use the following boundaries:

- **Ingestion:** object storage or API upload for public CSV/parquet datasets.
- **Processing:** Python/Pandas pipeline with schema validation, unit normalization, missing-value reporting, and feature generation.
- **Model service:** Scikit-learn/PyTorch model exposed through FastAPI, returning versioned predictions and model metadata.
- **Reasoning service:** structured LLM call constrained by predictive evidence, operational policy, and allowed action catalog.
- **Decision service:** policy engine that applies thresholds, human approval rules, role assignment, and idempotency.
- **n8n:** webhook-triggered orchestration for maintenance task creation, notification, acknowledgement wait, verification, and escalation.
- **Persistence:** PostgreSQL/Supabase for machines, sensor windows, predictions, reasoning records, incidents, actions, acknowledgements, workflow executions, and verification events.
- **Frontend:** React/TypeScript control center that reads the event stream and renders the same evidence/decision/automation separation as the prototype.

## Trust boundaries

1. **Data boundary:** Every dataset must identify its source, schema, time basis, and whether it is real/public or demo-derived.
2. **Model boundary:** Predictions must include model version, input window, timestamp, and reproducibility metadata.
3. **Reasoning boundary:** AI reasoning must cite the predictive evidence it used and must not invent measurements or confidence values.
4. **Action boundary:** Recommendations are not physical actions. Approval and policy checks must precede any production work order or actuation.
5. **Automation boundary:** Workflow executions must be idempotent and have correlation IDs to prevent duplicate tasks or notifications.
6. **Verification boundary:** Resolution requires evidence of acknowledgement and completion; timeout routes to escalation.

## Correlation and idempotency

A connected event should carry:

```json
{
  "eventId": "evt_...",
  "incidentId": "inc_...",
  "machineId": "M-204",
  "predictionId": "pred_...",
  "workflowExecutionId": "exec_...",
  "occurredAt": "2026-10-03T14:32:10Z",
  "source": "public_dataset_or_connector",
  "simulation": true
}
```

The `simulation` field must remain explicit in hackathon and staging environments. Task creation, acknowledgement, verification, and escalation should be safe to retry using the incident and workflow correlation IDs.

## Security and safety considerations

- Do not place provider secrets in browser bundles.
- Treat uploaded files as untrusted input and validate schema/size/type before processing.
- Keep human approval visible for maintenance recommendations.
- Do not represent a prototype score as a certified industrial safety decision.
- Log model and reasoning versions with every operational decision.
- Use role-based access controls before enabling task resolution or escalation in a shared environment.

## Non-goals for the current prototype

- Live industrial telemetry
- Production work-order creation
- Physical machine control
- Real-time factory deployment
- Claims about model accuracy or partnerships
