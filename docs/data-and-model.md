# PlantGuard AI Data and Model Contract

## Purpose

This document defines what the prototype currently represents, what a connected dataset must provide, and which metrics are intentionally withheld until they are calculated from a real model run.

## Current data status

The current UI uses **demo data derived from public predictive-maintenance dataset structure**. It is not a live factory feed and is not presented as a real industrial asset register.

The Data Explorer intentionally displays:

> Connect public dataset to populate live analytical values.

Until a dataset is connected, it must not show fabricated row counts, column counts, machine counts, sensor counts, missing-value totals, or summary statistics.

## Dataset contract

A connected tabular dataset should provide, at minimum:

| Field | Requirement |
| --- | --- |
| Machine/unit identifier | Stable identifier for grouping time series |
| Cycle or timestamp | Ordered operating context |
| Sensor features | Numeric or explicitly typed measurements |
| Source metadata | Dataset name, version, license, and provenance |
| Missing-value policy | Explicit handling and reported counts |
| Target definition | Risk, failure horizon, or remaining useful life |

A production ingestion layer should validate schema, units, time ordering, duplicate records, missing values, and out-of-range measurements before model inference.

## Feature and target examples

Potential feature families include:

- Vibration RMS and frequency-domain features
- Temperature and thermal deltas
- Current draw, load, pressure, and flow
- Rolling mean, variance, slope, and threshold-crossing counts
- Time since maintenance or operating-cycle context

Potential targets include:

- Binary or multiclass risk tier
- Failure within a defined horizon
- Remaining useful life
- Health index regression

The actual target must be defined by the connected dataset and model configuration. The prototype does not assume a single universal target.

## Model metadata contract

A connected model should report:

```json
{
  "modelType": "classification_or_regression",
  "modelVersion": "model-2026-01",
  "inputFeatures": ["..."],
  "predictionTarget": "...",
  "trainingData": "dataset-name/version",
  "trainedAt": "2026-10-03T00:00:00Z",
  "evaluationProtocol": "time-aware holdout or documented alternative"
}
```

The frontend should display model metadata only when it is supplied by the connected model registry or inference service.

## Evaluation policy

Do not invent or hard-code:

- Accuracy
- RMSE
- MAE
- R²
- Precision
- Recall
- F1
- AUROC
- Calibration
- Confidence intervals

Metrics should be shown only with their calculation context: dataset split, time period, target definition, class balance, model version, and evaluation date.

For predictive maintenance, time-aware evaluation and leakage prevention matter. Random row-level splits can make results appear stronger than they are when adjacent cycles from the same machine are split across train and test sets.

## Explainability contract

Every reasoning proposal should be traceable to the predictive evidence that produced it:

- Machine ID and prediction timestamp
- Health/risk value and model version
- Trend window and selected sensor evidence
- Threshold or policy rule that was reached
- Recommendation and operational impact
- Human approval requirement

An AI reasoning layer must not generate measurements, model metrics, partnerships, or deployment claims that are absent from the source evidence.

## Public-data references

The prototype references public predictive-maintenance dataset structures broadly, including turbofan, bearing, motor, and industrial equipment examples. A connected implementation should add the exact dataset citation, license, version, preprocessing steps, and target definition to the project documentation before displaying live analytical values.

## Safety boundary

PlantGuard is decision support. It is not a certified industrial maintenance decision, a safety instrumented system, or a replacement for qualified engineering review.
