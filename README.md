# Marinka

**A portable personal AI assistant runtime.**

**Public beta: v0.1**

Marinka is the assistant, not the house.

She owns conversation/session behavior, provider abstraction, interpretation and presentation. The connected environment owns identity, policy, resource truth and final execution authority.

That separation is the point: move Marinka to another machine or connect her to another environment and she remains Marinka.

> **Marinka asks. The Nest decides.**

## What the public beta demonstrates

The default path is deterministic and keyless:

```text
text input
 -> fixture interpretation
 -> assistant runtime
 -> optional Nest request
 -> outcome-aware response
```

Run it with Node.js 22+:

```sh
npm test
npm run demo
```

No paid provider, microphone or hardware is required for the public beta.

## What the architecture achieved

The assistant is prevented from turning confident language into fake execution truth.

If no environment authority is connected, Marinka does not invent `Done`.

If [The Nest](https://github.com/EvgenVLG/the-nest-runtime) returns `DENIED`, `FAILED` or `UNCERTAIN`, Marinka preserves that result in the response.

That boundary makes it possible to evolve:
- personality;
- provider selection;
- voice UX;
- session behavior;
- model/tool integrations;

without giving the assistant direct ownership of physical permissions or state.

## Private R&D beyond the public beta

The larger private system extends this reference architecture into active R&D around:

- multi-provider speech/semantic evaluation;
- latency, cost and reliability tradeoffs;
- streaming and realtime voice;
- ESP32-S3 audio endpoints;
- wake-word experimentation;
- session concurrency;
- telemetry and failure classification;
- portable endpoint provisioning.

The public repository intentionally proves the runtime boundary without exposing private audio, conversations, credentials or household bindings.

## How the R&D is run

New providers, frameworks, MCP-compatible integrations, plugins/skills and voice components are treated as engineering options, not automatically as improvements.

They are compared against the properties that matter:
- latency;
- quality;
- reliability;
- cost;
- portability;
- observability;
- failure behavior;
- integration complexity.

A tool is kept when it improves the system, not because it is new.

## Human technical ownership

The human owner defines:
- the assistant/environment boundary;
- provider and architecture experiments;
- what each benchmark is supposed to measure;
- acceptance criteria for latency/quality/reliability;
- when simulator/fixture evidence is insufficient;
- integration priorities and release decisions.

The implementation is AI-assisted. Product and engineering ownership are not delegated.

## Verification lesson

One private provider evaluation exposed an important failure mode: the evaluator itself passed the wrong data type into the production parser and made every row look schema-invalid.

The fix was not "trust the benchmark harder." It was to calibrate the evaluator against known-valid/invalid controls and separate transport success, parse success, schema validity and semantic quality.

That case is documented publicly in [Production Zoo](https://github.com/EvgenVLG/production-zoo/blob/main/docs/case-studies/evaluator-contract-bug.md).

## Shared contract

The versioned Nest client contract is in `contracts/nest-assistant-v1.json`.

## Status

This repository is a **working public beta v0.1 reference implementation**.

It is intentionally smaller than the private R&D system, but the included text/session path is runnable and verified by CI.

## Related projects

- [The Nest](https://github.com/EvgenVLG/the-nest-runtime) - environment authority Marinka can optionally connect to.
- [Production Zoo](https://github.com/EvgenVLG/production-zoo) - controlled AI engineering production workflow and failure-driven case studies.
