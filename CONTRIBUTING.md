# Contributing to PlantGuard AI

Thank you for contributing to PlantGuard AI. This repository is a research/hackathon prototype, so contributions should improve technical credibility and the end-to-end operational story rather than add decorative complexity.

## Before opening a change

- Read the [README](README.md), [architecture](docs/architecture.md), [data/model contract](docs/data-and-model.md), and [workflow contract](docs/workflow-contract.md).
- Keep the repository’s data-honesty rules intact.
- Do not present demo data as live factory telemetry.
- Do not add fabricated model metrics, partnerships, certifications, or deployment claims.
- Preserve the distinction between predictive model output and AI reasoning.

## Development workflow

```bash
npm install
npm run dev
```

Before submitting a change, run:

```bash
npx tsc -b
npm run build
```

If you add or remove a page route, update `public/manus-routes.json` in the same change.

## UI and interaction guidance

PlantGuard uses an industrial control-room visual language:

- Evidence before decoration
- Strong operational hierarchy
- Explicit status, timestamps, and ownership
- Restrained motion that communicates state change
- Responsive layouts that preserve the demo narrative

Avoid generic chatbot patterns, excessive gradients, fake logos, decorative robot imagery, and claims that imply production deployment.

## Data and model changes

When adding a dataset, model, or metric:

1. Record its exact provenance and license.
2. Define the target and evaluation protocol.
3. Document preprocessing and missing-value handling.
4. Show metrics only when they are calculated from the connected model.
5. Add model version and timestamp metadata to the reasoning path.

## Workflow changes

When changing the demo state machine or adding an automation node:

- Update `docs/workflow-contract.md`.
- Keep transitions deterministic and reproducible.
- Preserve idempotency and correlation-ID expectations.
- Make acknowledgement, verification, resolution, and escalation visible in the UI.

## Pull requests

A useful pull request description should include:

- What changed and why
- Which routes or workflow states are affected
- Validation commands run
- Any new data source or model assumptions
- Screenshots or a short demo path for visible UI changes
- Confirmation that data-honesty copy remains accurate

## Scope boundary

PlantGuard is decision support. It is not a certified industrial maintenance decision, a safety instrumented system, or a physical control system.
