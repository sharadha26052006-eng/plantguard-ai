# PlantGuard AI Workflow Contract

## Purpose

The current Workflow Monitor simulates an n8n-style orchestration. This contract defines the event sequence and state transitions that a future n8n integration should preserve.

## Node sequence

| Order | Node | Responsibility |
| ---: | --- | --- |
| 1 | DATA EVENT | Receive a machine-health event |
| 2 | VALIDATE | Check payload, source, and schema boundary |
| 3 | GET MACHINE CONTEXT | Attach machine metadata and operating context |
| 4 | HEALTH / RISK ANALYSIS | Produce health, trend, and risk evidence |
| 5 | AI REASONING | Interpret evidence and propose an action |
| 6 | IMPACT ANALYSIS | Summarize operational implications |
| 7 | DECISION | Apply approval and policy rules |
| 8 | CREATE MAINTENANCE TASK | Create an owned action with correlation ID |
| 9 | NOTIFY | Request acknowledgement from the responsible role |
| 10 | WAIT FOR ACKNOWLEDGEMENT | Pause until response or timeout |
| 11 | VERIFY | Confirm acknowledgement and completion evidence |
| 12 | RESOLVE / ESCALATE | Close the incident or notify the escalation role |

## State machine

```text
IDLE
  └─ high-risk event → AWAITING_ACKNOWLEDGEMENT
       ├─ acknowledgement → RESOLVED
       └─ timeout/no response → ESCALATED
```

The frontend also exposes intermediate conceptual states (`event_detected`, `workflow_running`, and `acknowledged`) so a connected implementation can animate or persist the full trace rather than jumping directly from idle to outcome.

## Event envelope

A future webhook or internal event should carry a stable envelope:

```json
{
  "eventId": "evt-unique",
  "incidentId": "INC-204-103",
  "machineId": "M-204",
  "source": "public_dataset_or_connector",
  "simulation": false,
  "occurredAt": "2026-10-03T14:32:10Z",
  "prediction": {
    "healthScore": 31,
    "riskLevel": "HIGH",
    "trend": "DEGRADING",
    "modelVersion": "model-version"
  },
  "reasoning": {
    "recommendedAction": "Maintenance Inspection",
    "approvalRequired": true
  }
}
```

The `simulation` flag must remain explicit in demos and staging. The browser prototype should never be mistaken for a live integration.

## Required idempotency

Task creation, notifications, acknowledgement callbacks, verification, and escalation should be idempotent by `incidentId` and `workflowExecutionId`. A retry must not create duplicate tasks or send an unbounded number of notifications.

## Status vocabulary

The UI supports these statuses:

- `COMPLETED`
- `RUNNING`
- `WAITING`
- `FAILED`
- `ESCALATED`

A connected service may add internal statuses, but the user-facing mapping should remain understandable and consistent.

## Human approval

The decision node must preserve whether human approval is required. In this prototype, M-204 is shown with **HUMAN APPROVAL: REQUIRED**. A real integration must not silently convert a recommendation into physical actuation.

## Verification and escalation

Resolution requires a verification result. If acknowledgement is not received within the configured window, the workflow should record the timeout, notify the escalation role, and leave the incident in `ESCALATED` state until a qualified human closes it.
